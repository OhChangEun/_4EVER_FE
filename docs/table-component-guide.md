# Table 컴포넌트 사용 가이드

공통 Table 컴포넌트를 사용하여 모든 테이블 UI를 통일합니다.

## 📦 컴포넌트 위치

- `src/app/components/common/Table.tsx`
- `src/app/components/common/Table.example.tsx` (사용 예제)

## 🎨 디자인 시스템

### 기본 스타일

- **wrapper**: `bg-white rounded-xl border border-gray-100`
- **header**: `bg-gray-50 text-sm font-semibold text-gray-700`
- **row hover**: `hover:bg-gray-50 transition-colors`
- **text**: `text-gray-700`
- **border**: `border-gray-50` (row 구분선)

### 특징

- 은은한 shadow (과하지 않음)
- 밝은 배경색 (gray-50)
- 부드러운 border radius
- 일관된 padding (`px-4 py-3`)

## 📝 사용 방법

### 1. 기본 사용법

```tsx
import Table, { TableColumn } from '@/app/components/common/Table';

interface MyData {
  id: string;
  name: string;
  email: string;
}

const columns: TableColumn<MyData>[] = [
  {
    key: 'name',
    label: '이름',
    align: 'left', // 'left' | 'center' | 'right'
  },
  {
    key: 'email',
    label: '이메일',
  },
];

const data: MyData[] = [
  { id: '1', name: '홍길동', email: 'hong@example.com' },
  { id: '2', name: '김철수', email: 'kim@example.com' },
];

<Table
  columns={columns}
  data={data}
  keyExtractor={(row) => row.id}
  emptyMessage="데이터가 없습니다."
/>;
```

### 2. 커스텀 렌더링

```tsx
const columns: TableColumn<MyData>[] = [
  {
    key: 'name',
    label: '사용자',
    render: (value, row, index) => (
      <div>
        <div className="font-medium">{row.name}</div>
        <div className="text-xs text-gray-500">{row.email}</div>
      </div>
    ),
  },
  {
    key: 'status',
    label: '상태',
    align: 'center',
    render: (value) => <StatusLabel $statusCode={String(value)} />,
  },
  {
    key: 'actions',
    label: '작업',
    align: 'center',
    width: '100px',
    render: (_, row) => (
      <button onClick={() => handleEdit(row)}>
        <i className="ri-edit-line" />
      </button>
    ),
  },
];
```

### 3. Row 클릭 이벤트

```tsx
<Table
  columns={columns}
  data={data}
  onRowClick={(row, index) => {
    console.log('Clicked row:', row);
    handleRowClick(row.id);
  }}
  hoverable={true}
/>
```

### 4. Props 옵션

```tsx
interface TableProps<T> {
  columns: TableColumn<T>[]; // 컬럼 정의 (필수)
  data: T[]; // 데이터 배열 (필수)
  keyExtractor?: (row: T, index: number) => string | number; // 고유 키 추출
  onRowClick?: (row: T, index: number) => void; // Row 클릭 핸들러
  emptyMessage?: string; // 빈 데이터 메시지
  hoverable?: boolean; // hover 효과 (기본: true)
  className?: string; // 추가 클래스
}
```

## 🔄 기존 테이블 마이그레이션

### Before (기존 코드)

```tsx
<table className="w-full">
  <thead className="bg-gray-50">
    <tr>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">이름</th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">이메일</th>
    </tr>
  </thead>
  <tbody className="bg-white divide-y divide-gray-200">
    {data.map((row) => (
      <tr key={row.id} className="hover:bg-gray-50">
        <td className="px-6 py-4">{row.name}</td>
        <td className="px-6 py-4">{row.email}</td>
      </tr>
    ))}
  </tbody>
</table>
```

### After (Table 컴포넌트 사용)

```tsx
const columns: TableColumn<User>[] = [
  { key: 'name', label: '이름' },
  { key: 'email', label: '이메일' },
];

<Table columns={columns} data={data} keyExtractor={(row) => row.id} />;
```

## 📂 마이그레이션 대상 파일 목록

다음 파일들의 테이블을 공통 컴포넌트로 변경하세요:

- `src/app/(private)/sales/components/tabs/SalesQuoteList.tsx`
- `src/app/(private)/sales/components/tabs/SalesOrderList.tsx`
- `src/app/(private)/sales/components/tabs/SalesCustomerList.tsx`
- `src/app/(private)/purchase/components/tabs/SupplierListTab.tsx`
- `src/app/(private)/production/components/tabs/PlannedOrdersTab.tsx`
- `src/app/(private)/production/components/tabs/QuotationTab.tsx`
- `src/app/(private)/production/components/tabs/OrdersTab.tsx`
- `src/app/(private)/inventory/components/tabs/InventoryList.tsx`
- `src/app/(private)/inventory/components/tabs/ReceivingManagementList.tsx`
- `src/app/(private)/inventory/components/tabs/ShippingManagementList.tsx`
- `src/app/(private)/low-stock/components/LowStockList.tsx`
- 기타 테이블을 사용하는 모든 페이지

## ✅ 체크리스트

기존 테이블을 마이그레이션할 때:

- [ ] TableColumn 타입 정의
- [ ] 컬럼별 render 함수 작성 (필요시)
- [ ] keyExtractor 설정
- [ ] onRowClick 이벤트 처리 (필요시)
- [ ] 기존 table 태그 제거
- [ ] TableStatusBox 대신 emptyMessage 사용

## 💡 팁

1. **타입 안정성**: 제네릭을 활용하여 타입 안정성 확보
2. **재사용성**: 동일한 컬럼 정의를 여러 곳에서 사용 가능
3. **일관성**: 모든 테이블이 동일한 디자인 시스템 적용
4. **유지보수**: 디자인 변경 시 Table 컴포넌트만 수정

## 🎯 완료 후 효과

- ✅ 모든 테이블 UI 통일
- ✅ 코드 중복 감소
- ✅ 유지보수 용이성 향상
- ✅ 일관된 사용자 경험
