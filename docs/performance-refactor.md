# 페이지 전환 컴파일 리팩터링

## 목표

- 개발 모드에서 라우트 이동 시 과도한 컴파일 시간과 느린 응답 개선
- RootLayout의 전역 결합 제거 및 Provider를 라우트 단위로 분리
- 무거운 번들 제거 및 불필요한 초기 로드 방지

## 적용된 변경 사항

### RootLayout 최소화

- RootLayout은 이제 `html`, `body`, 폰트만 렌더링
- 라우트 간 결합을 유발하던 전역 Provider 제거

### 라우트 단위 Provider 구성

- `(private)` 하위에 라우트 전용 layout을 추가하여 React Query, 모달 Provider를 해당 영역에만 적용
- `(public)/profile` 하위에 프로필 전용 layout 추가로 퍼블릭 라우트 경량화
- 필요한 라우트에서만 Provider가 초기화되도록 범위 제한

### React Query 스코프 축소

- private 페이지에서 서버 사이드 `prefetchQuery`, `dehydrate` 제거
- 클라이언트 탭에서 필요한 시점에만 데이터 fetch 수행
- 라우트 이동 시 서버 작업 감소 및 전역 리컴파일 방지

### Google Font 최적화

- Noto Sans KR 폰트 weight를 `400`, `500`, `700`만 사용하도록 축소
- 사용하지 않는 폰트 import 제거

### 무거운 컴포넌트 지연 로딩

- 3D 창고 뷰어를 `dynamic` + `ssr: false`로 분리하고 경량 로딩 UI 적용
- BOM 트리 차트는 모달 내부에서 lazy load 처리하여 초기 번들에서 D3 제외

## Fetch 캐싱 관련 참고 사항

- 대부분의 데이터 접근이 `axios` 기반이라 fetch 캐시 정책은 적용하지 않음
- 추후 `fetch`를 도입할 경우
  `cache: 'force-cache'` 또는 `next: { revalidate: 60 }` 옵션 추가 권장

## 기대 효과

- 개발 모드에서 라우트 전환 시 컴파일 속도 개선
- 서버 사이드 사전 패칭 비용 감소
- 무거운 Provider, 3D/D3 UI가 필요 없는 라우트의 초기 번들 축소

## 후속 개선 아이디어

- 클라이언트 전용 fetch 구간에 라우트별 Empty State 추가
- 차트 / 테이블 등 추가적인 무거운 UI 컴포넌트 동적 import 검토
- axios → fetch 전환 시 서버 컴포넌트 캐싱 전략 도입
