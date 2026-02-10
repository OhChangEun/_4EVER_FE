# Next.js SSR + MSW 구조 문제 분석 및 해결

## 📋 문제 발견

### 증상
- PageSpeed Insights에서 TTFB(Time To First Byte) **3~4초** 측정
- 프로덕션 빌드에서 모든 페이지 초기 로딩이 느림
- 개발 환경에서도 첫 페이지 렌더링 지연 발생

### 의문점
- MSW(Mock Service Worker)가 SSR 과정에 영향을 주는가?
- 백엔드가 없는 상태에서 SSR이 제대로 작동할 수 있는가?
- Next.js를 사용하는 것이 현 상황에서 적절한가?

---

## 🔍 원인 분석

### 1. 문제의 구조

```
┌─────────────────────────────────────────────────────┐
│ 사용자가 페이지 요청                                   │
└─────────────────┬───────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────┐
│ Next.js 서버 (Node.js 환경)                          │
│ - 서버 컴포넌트 실행                                  │
│ - await getDashboardStats() 호출                     │
└─────────────────┬───────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────┐
│ axios (src/lib/axiosInstance.ts)                    │
│ - API_BASE_URL로 HTTP 요청 시도                      │
│ - timeout: 4000ms 설정됨                             │
└─────────────────┬───────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────┐
│ 실제 API 서버 (https://api.everp.co.kr)             │
│ ❌ 백엔드가 아직 존재하지 않음                        │
│ ❌ 연결 실패                                         │
└─────────────────┬───────────────────────────────────┘
                  │
                  ▼ (4초 대기)
┌─────────────────────────────────────────────────────┐
│ axios interceptor의 error handler                   │
│ - buildFallbackData() 실행                          │
│ - 빈 데이터 또는 기본값 반환                          │
└─────────────────┬───────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────┐
│ HTML 생성 후 클라이언트로 전송                        │
│ ⏱️ TTFB: ~4초                                       │
└─────────────────────────────────────────────────────┘
```

### 2. MSW는 왜 작동하지 않았나?

```typescript
// src/mocks/browser.ts
import { setupWorker } from 'msw/browser';  // ← Service Worker API 사용
```

**핵심 문제:**
- MSW는 **브라우저의 Service Worker API**를 사용
- Service Worker는 **브라우저에만 존재**하는 API
- Next.js 서버 컴포넌트는 **Node.js 환경**에서 실행됨
- **결론**: 서버에서는 MSW가 절대 작동할 수 없음

```typescript
// src/mocks/index.ts
export async function setupMocks() {
  if (typeof window === 'undefined') return;  // ← 서버에서는 바로 리턴
  // ...
}
```

이 코드가 이미 서버 환경을 막고 있었지만, 문제는 **서버 컴포넌트에서 실제 API를 호출**한다는 것.

### 3. 타임아웃의 정확한 흐름

```typescript
// src/lib/axiosInstance.ts
axios.defaults.timeout = 4000;  // ← 4초 타임아웃
```

**실제 발생 순서:**
1. 서버 컴포넌트에서 `await getDashboardStats()` 실행
2. axios가 `https://api.everp.co.kr/dashboard/statistics` 호출 시도
3. 백엔드 서버 없음 → 연결 대기
4. **4초간 대기** (timeout)
5. error handler가 fallback 데이터 반환
6. 이때까지 사용자는 빈 화면만 봄

### 4. 현재 구조의 문제점

#### ❌ 잘못된 점

| 문제 | 설명 |
|------|------|
| **SSR 무의미** | 백엔드가 없어 서버에서 가져올 데이터가 없음 |
| **타임아웃 낭비** | 매 요청마다 4초씩 낭비 |
| **MSW 미작동** | 서버 환경에서는 Service Worker 사용 불가 |
| **성능 저하** | 클라이언트에서 hydration 후 다시 데이터 로드 필요 |

#### ✅ 제대로 작동하는 부분

| 항목 | 상태 |
|------|------|
| 파일 기반 라우팅 | ✅ 정상 작동 |
| 클라이언트 컴포넌트 | ✅ MSW와 함께 정상 작동 |
| 이미지 최적화 | ✅ 정상 작동 |
| 빌드 최적화 | ✅ 정상 작동 |

---

## 💡 해결 방법

### 옵션 1: 서버 타임아웃 최소화 (즉시 적용 가능) ⭐

**방법:**
```typescript
// src/lib/axiosInstance.ts
axios.defaults.timeout = typeof window === 'undefined' ? 1 : 4000;
```

**효과:**
- 서버: 1ms 후 즉시 fallback → TTFB **100~200ms**
- 클라이언트: 4초 유지 (MSW 동작 시간 확보)

**장점:**
- ✅ 1줄 수정으로 즉시 적용
- ✅ 기존 구조 유지
- ✅ 백엔드 생기면 그대로 사용 가능

**단점:**
- ⚠️ 근본적인 해결은 아님
- ⚠️ 여전히 서버에서 불필요한 호출 발생

---

### 옵션 2: 클라이언트 컴포넌트 전환 (근본 해결) ⭐⭐⭐

**방법:**
```tsx
// 변경 전: src/app/(private)/dashboard/page.tsx
export default async function DashboardPage() {
  const dashboardStats = await getDashboardStats();  // 서버에서 실행
  // ...
}

// 변경 후
'use client';

import { useQuery } from '@tanstack/react-query';

export default function DashboardPage() {
  const { data: dashboardStats, isLoading } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: getDashboardStats,  // 클라이언트에서 실행
  });

  if (isLoading) return <div>Loading...</div>;
  // ...
}
```

**효과:**
- TTFB: **50~100ms** (HTML만 전송)
- MSW 정상 작동 (브라우저에서 실행)
- React Query로 캐싱/리페칭 관리

**장점:**
- ✅ MSW 완전히 활용 가능
- ✅ 타임아웃 문제 완전 제거
- ✅ React Query 생태계 활용

**단점:**
- ⚠️ 모든 page.tsx 수정 필요 (15개 파일)
- ⚠️ 백엔드 생기면 다시 서버 컴포넌트로 전환 고려

**변경 필요 파일:**
- `src/app/(private)/dashboard/page.tsx`
- `src/app/(private)/finance/page.tsx`
- `src/app/(private)/inventory/page.tsx`
- `src/app/(private)/hrm/page.tsx`
- `src/app/(private)/low-stock/page.tsx`
- `src/app/(private)/production/page.tsx`
- `src/app/(private)/purchase/page.tsx`
- `src/app/(private)/sales/page.tsx`
- `src/app/(private)/warehouse/page.tsx`
- 기타 private 페이지들

---

### 옵션 3: 서버에서 조건부 처리 (임시 방편)

**방법:**
```typescript
// src/app/(private)/dashboard/page.tsx
export default async function DashboardPage() {
  const isMockMode = process.env.NEXT_PUBLIC_API_MOCKING === 'enabled';
  
  let dashboardStats;
  
  if (isMockMode) {
    // 서버에서 직접 fallback 반환
    dashboardStats = {
      data: {
        week: {
          total_sales: { value: 0, delta_rate: 0 },
          // ...
        }
      }
    };
  } else {
    dashboardStats = await getDashboardStats();
  }
  // ...
}
```

**장점:**
- ✅ SSR 구조 유지
- ✅ 타임아웃 없음

**단점:**
- ⚠️ 코드 중복 (fallback 로직 2곳에 존재)
- ⚠️ 유지보수 어려움
- ⚠️ 백엔드 생기면 조건문 제거 필요

---

## 📊 옵션별 비교

| 항목 | 옵션 1: 타임아웃 | 옵션 2: 클라이언트 | 옵션 3: 조건부 |
|------|----------------|-------------------|---------------|
| **TTFB** | 100~200ms | 50~100ms | 50~100ms |
| **코드 변경** | 1줄 | 많음 (15+ 파일) | 중간 (조건문 추가) |
| **MSW 작동** | 클라이언트만 | ✅ 완전 | 불필요 |
| **SSR 유지** | ✅ | ❌ | ✅ |
| **백엔드 대응** | 그대로 사용 | 재전환 고려 | 조건문 제거 |
| **장기 유지보수** | 보통 | 좋음 | 나쁨 |

---

## 🎯 권장 전략

### 단계별 접근

#### STEP 1: 지금 당장 (5분 소요)
**옵션 1 적용**
```bash
# src/lib/axiosInstance.ts 수정
axios.defaults.timeout = typeof window === 'undefined' ? 1 : 4000;
```
→ TTFB 즉시 개선, 급한 불 끄기

#### STEP 2: 이번 주 내 (백엔드 없는 동안)
**옵션 2 적용**
- 모든 private 페이지를 클라이언트 컴포넌트로 전환
- MSW와 React Query 제대로 활용
- 성능 테스트 및 최적화

#### STEP 3: 백엔드 API 준비되면
**선택지 A: 클라이언트 컴포넌트 유지**
- React Query로 API 호출
- 빠른 초기 로딩 + 캐싱 이점
- SPA와 유사한 UX

**선택지 B: 서버 컴포넌트로 전환**
- SSR의 진정한 이점 활용
- SEO 최적화 (필요한 경우)
- 서버에서 데이터 prefetch

---

## 🤔 왜 Next.js를 계속 사용해야 하는가?

### 백엔드 없는 현재
| 이점 | 설명 |
|------|------|
| **파일 기반 라우팅** | `app/dashboard/page.tsx` → `/dashboard` 자동 매핑 |
| **이미지 최적화** | `next/image`로 자동 최적화 및 lazy loading |
| **빌드 최적화** | Turbopack으로 빠른 빌드 및 번들링 |
| **TypeScript 통합** | 타입 안전성 + 높은 생산성 |
| **미들웨어** | 인증 가드 등 라우팅 제어 (`middleware.ts`) |
| **확장 가능성** | 백엔드 생기면 SSR/ISR 바로 적용 가능 |

### 백엔드 생긴 후
| 이점 | 설명 |
|------|------|
| **진정한 SSR** | 서버에서 데이터 fetch → 완성된 HTML 전송 |
| **SEO 최적화** | 검색 엔진이 완전한 콘텐츠 크롤링 가능 |
| **ISR** | Static Generation + 주기적 재생성 |
| **Streaming SSR** | 점진적으로 UI 스트리밍 (React 18) |
| **API Routes** | BFF 패턴으로 프론트-백 중간 레이어 구축 |

---

## 📝 결론

### 현재 상황 평가
- ❌ **SSR은 현재 무의미함** (백엔드 없음)
- ❌ **4초 타임아웃은 명백한 문제** (사용자 경험 저해)
- ⚠️ **구조는 틀리지 않았지만** 시기상조
- ✅ **Next.js 자체는 합리적 선택** (미래 대비)

### 즉시 조치
```typescript
// src/lib/axiosInstance.ts
axios.defaults.timeout = typeof window === 'undefined' ? 1 : 4000;
```

### 근본 해결
- 모든 데이터 로딩 페이지를 클라이언트 컴포넌트로 전환
- React Query로 데이터 관리
- MSW를 개발 환경에서 완전히 활용

### 백엔드 준비되면
- 서버 컴포넌트 전환 여부 재평가
- SSR이 실제로 필요한 페이지만 선택적 적용
- 나머지는 클라이언트 컴포넌트 유지 (더 나을 수도 있음)

---

## 📚 참고 자료

### 관련 파일
- [axiosInstance.ts](../src/lib/axiosInstance.ts) - 타임아웃 설정 및 fallback 로직
- [mocks/index.ts](../src/mocks/index.ts) - MSW 초기화 (클라이언트 전용)
- [mocks/browser.ts](../src/mocks/browser.ts) - Service Worker 설정
- [app/providers.tsx](../src/app/providers.tsx) - MSW 로딩 및 React Query 설정

### 환경 변수
- `NEXT_PUBLIC_API_MOCKING=enabled` - MSW 활성화
- `NEXT_PUBLIC_API_FALLBACK=disabled` - fallback 비활성화 (프로덕션)

### Next.js 공식 문서
- [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [Client Components](https://nextjs.org/docs/app/building-your-application/rendering/client-components)
- [Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)

### MSW 문서
- [MSW Browser Integration](https://mswjs.io/docs/integrations/browser)
- [MSW Node Integration](https://mswjs.io/docs/integrations/node) (테스트용)

---

**작성일**: 2026년 2월 11일  
**버전**: 1.0  
**상태**: 옵션 1 적용 대기
