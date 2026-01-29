# MSW 단독 실행 환경 문서

## 1) 프로젝트 통신 구조 요약

- Axios: src/lib/axiosInstance.ts에서 `Authorization` 헤더를 자동 주입.
- React Query: src/app/providers.tsx에서 전역 QueryClient 사용.
- Base URL: src/app/types/api.ts에 하드코딩된 `API_BASE_URL` 사용.
- 인증: OAuth2 토큰 교환/갱신은 `https://auth.everp.co.kr/oauth2/token`으로 직접 호출.

## 2) 실제 호출 API 목록

아래는 실제 코드에서 호출되는 엔드포인트 목록입니다. Request/Response 타입은 타입 정의 파일 기준입니다.

### 공통/인증

- POST https://auth.everp.co.kr/oauth2/token
  - Request: OAuth2 form
  - Response: `{ access_token, expires_in }`
- POST https://auth.everp.co.kr/logout
  - Response: ApiResponseNoData
- GET ${API_BASE_URL}/user/info
  - Response: ApiResponse<userInfoResponse>

### 알림

- GET ${API_BASE_URL}/alarm/notifications/list
  - Response: ApiResponse<NotificationListResponse>
- GET ${API_BASE_URL}/alarm/notifications/count
  - Response: ApiResponse<NotificationCountResponse>
- PATCH ${API_BASE_URL}/alarm/notifications/:id/read
  - Response: ApiResponseNoData
- PATCH ${API_BASE_URL}/alarm/notifications/all/read
  - Response: ApiResponseNoData
- GET ${API_BASE_URL}/alarm/notifications/subscribe (SSE)
  - Response: text/event-stream

### 대시보드

- GET ${API_BASE_URL}/dashboard/statistics
  - Response: ApiResponse<DashboardStatRes>
- GET ${API_BASE_URL}/dashboard/workflows
  - Response: ApiResponse<DashboardWorkflowRes>

### 영업(Sales)

- GET ${API_BASE_URL}/business/sd/statistics
  - Response: ApiResponse<SalesStatResponse>
- GET ${API_BASE_URL}/business/sd/quotations/customer/count
  - Response: ApiResponse<CustomerSalesStatResponse>
- GET ${API_BASE_URL}/business/sd/quotations
  - Response: ApiResponse<{ content: Quote[]; page: Page }>
- GET ${API_BASE_URL}/business/sd/quotations/:id
  - Response: ApiResponse<QuoteDetail>
- POST ${API_BASE_URL}/business/sd/quotations
  - Request: NewOrderRequest
  - Response: ApiResponse<{ items: NewOrderRequest }>
- GET ${API_BASE_URL}/business/sd/orders
  - Response: ApiResponse<{ content: Order[]; page: Page }>
- GET ${API_BASE_URL}/business/sd/orders/:id
  - Response: ApiResponse<OrderDetail>
- POST ${API_BASE_URL}/business/sd/quotations/confirm
  - Response: ApiResponseNoData
- POST ${API_BASE_URL}/business/sd/quotations/inventory/check
  - Request: { items: Inventories[] }
  - Response: ApiResponse<{ items: InventoryCheckRes[] }>
- POST ${API_BASE_URL}/business/sd/quotations/:id/approve-order
  - Response: ApiResponseNoData
- GET ${API_BASE_URL}/business/sd/customers
  - Response: ApiResponse<{ customers: SalesCustomer[]; page: Page }>
- GET ${API_BASE_URL}/business/sd/customers/:id
  - Response: ApiResponse<CustomerDetail>
- POST ${API_BASE_URL}/business/sd/customers
  - Request: CustomerData
  - Response: ApiResponse<ServerResponse>
- PATCH ${API_BASE_URL}/business/sd/customers/:id
  - Request: CustomerEditData
  - Response: ApiResponse<CustomerResponse>
- GET ${API_BASE_URL}/business/sd/analytics/sales
  - Response: ApiResponse<SalesAnalysis>
- GET ${API_BASE_URL}/scm-pp/product/item/toggle
  - Response: ApiResponse<{ products: ItemResponse[] }>

### 재무(Finance)

- GET ${API_BASE_URL}/business/fcm/statictics
  - Response: ApiResponse<FinanceStatResponse>
- GET ${API_BASE_URL}/business/fcm/invoice/ap
  - Response: ApiResponse<{ content: InvoiceListRes[]; page: Page }>
- GET ${API_BASE_URL}/business/fcm/invoice/ap/:id
  - Response: ApiResponse<InvoicetDetailRes>
- POST ${API_BASE_URL}/business/fcm/invoice/ap/receivable/request?invoiceId=:id
  - Response: ApiResponseNoData
- GET ${API_BASE_URL}/business/fcm/invoice/ar
  - Response: ApiResponse<{ content: InvoiceListRes[]; page: Page }>
- GET ${API_BASE_URL}/business/fcm/invoice/ar/:id
  - Response: ApiResponse<InvoicetDetailRes>
- POST ${API_BASE_URL}/business/fcm/invoice/ar/:id/receivable/complete
  - Response: ApiResponseNoData
- POST ${API_BASE_URL}/business/fcm/invoice/ap/:id/payable/complete
  - Response: ApiResponseNoData
- GET ${API_BASE_URL}/business/fcm/statistics/customer/total-purchases
  - Response: ApiResponse<CustomerSupplierStatResponse>
- GET ${API_BASE_URL}/business/fcm/statistics/supplier/total-sales
  - Response: ApiResponse<CustomerSupplierStatResponse>

### 재고/창고

- GET ${API_BASE_URL}/scm-pp/iv/statistic
  - Response: ApiResponse<InventoryStatResponse>
- GET ${API_BASE_URL}/scm-pp/iv/inventory-items
  - Response: ApiResponse<{ content: InventoryResponse[]; page: Page }>
- GET ${API_BASE_URL}/scm-pp/iv/items/:id
  - Response: ApiResponse<InventoryDetailResponse>
- GET ${API_BASE_URL}/scm-pp/iv/shortage/preview
  - Response: ApiResponse<{ content: LowStockItemResponse[] }>
- GET ${API_BASE_URL}/scm-pp/iv/stock-transfers
  - Response: ApiResponse<{ content: StockMovementResponse[] }>
- POST ${API_BASE_URL}/scm-pp/iv/stock-transfers
  - Request: StockMovementRequest
  - Response: ApiResponseNoData
- PATCH ${API_BASE_URL}/scm-pp/iv/items/:id/safety-stock?safetyStock=:value
  - Response: ApiResponseNoData
- GET ${API_BASE_URL}/scm-pp/sales-orders/production
  - Response: ApiResponse<{ content: ProductionListResponse[]; page: Page }>
- GET ${API_BASE_URL}/scm-pp/sales-orders/production/:id
  - Response: ApiResponse<ShippingDetailResponse>
- GET ${API_BASE_URL}/scm-pp/sales-orders/ready-to-ship
  - Response: ApiResponse<{ content: ReadyToShipListResponse[]; page: Page }>
- GET ${API_BASE_URL}/scm-pp/sales-orders/ready-to-ship/:id
  - Response: ApiResponse<ShippingDetailResponse>
- PATCH ${API_BASE_URL}/scm-pp/sales-orders/:id/status
  - Request: markAsReadyRequest
  - Response: ApiResponse<markAsReadyToShipResponse>
- GET ${API_BASE_URL}/scm-pp/purchase-orders/receiving
  - Response: ApiResponse<{ content: ReceivedListResponse[]; page: Page }>
- GET ${API_BASE_URL}/scm-pp/purchase-orders/received
  - Response: ApiResponse<{ content: ReceivedListResponse[]; page: Page }>
- GET ${API_BASE_URL}/scm-pp/iv/items/toggle
  - Response: ApiResponse<AddInventoryItemsToggleResponse[]>
- GET ${API_BASE_URL}/scm-pp/iv/warehouses/dropdown
  - Response: ApiResponse<{ warehouses: WarehouseToggleResponse[] }>
- POST ${API_BASE_URL}/scm-pp/iv/items
  - Request: AddInventoryItemsRequest
  - Response: ApiResponseNoData
- POST ${API_BASE_URL}/scm-pp/iv/items/info
  - Request: { itemIds: string[] }
  - Response: ApiResponse<ItemResponse[]>
- GET ${API_BASE_URL}/scm-pp/iv/warehouses/statistic
  - Response: ApiResponse<WarehouseStatResponse>
- GET ${API_BASE_URL}/scm-pp/iv/warehouses
  - Response: ApiResponse<{ content: WarehouseListResponse[]; page: Page }>
- GET ${API_BASE_URL}/scm-pp/iv/warehouses/:id
  - Response: ApiResponse<WarehouseDetailResponse>
- POST ${API_BASE_URL}/scm-pp/iv/warehouses
  - Request: AddWarehouseRequest
  - Response: ApiResponseNoData
- PUT ${API_BASE_URL}/scm-pp/iv/warehouses/:id
  - Request: EditWarehouseRequest
  - Response: ApiResponseNoData
- GET ${API_BASE_URL}/scm-pp/iv/warehouses/managers/toggle
  - Response: ApiResponse<WarehouseManagerInfoResponse[]>

### 재고부족

- GET ${API_BASE_URL}/scm-pp/iv/shortage/count/critical/statistic
  - Response: ApiResponse<LowStockStatResponse>
- GET ${API_BASE_URL}/scm-pp/iv/shortage
  - Response: ApiResponse<{ content: LowStockListResponse[]; page: Page }>

### 구매(Purchase)

- GET ${API_BASE_URL}/scm-pp/mm/statistics
  - Response: ApiResponse<PurchaseStatResponse>
- GET ${API_BASE_URL}/scm-pp/mm/supplier/orders/statistics
  - Response: ApiResponse<SupplierPurchaseStatResponse>
- GET ${API_BASE_URL}/scm-pp/mm/purchase-requisitions
  - Response: ApiResponse<PurchaseReqListResponse>
- GET ${API_BASE_URL}/scm-pp/mm/purchase-requisitions/:id
  - Response: ApiResponse<PurchaseReqDetailResponse>
- POST ${API_BASE_URL}/scm-pp/mm/purchase-requisitions
  - Request: PurchaseRequestBody
  - Response: ApiResponse<null>
- POST ${API_BASE_URL}/scm-pp/mm/stock-purchase-requisitions
  - Request: StockPurchaseRequestBody
  - Response: ApiResponse<null>
- POST ${API_BASE_URL}/scm-pp/mm/purchase-requisitions/:id/release
  - Response: ApiResponse<null>
- POST ${API_BASE_URL}/scm-pp/mm/purchase-requisitions/:id/reject
  - Request: { comment: string }
  - Response: ApiResponse<null>
- GET ${API_BASE_URL}/scm-pp/mm/purchase-orders
  - Response: ApiResponse<PurchaseOrderListResponse>
- GET ${API_BASE_URL}/scm-pp/mm/purchase-orders/:id
  - Response: ApiResponse<PurchaseOrderDetailResponse>
- POST ${API_BASE_URL}/scm-pp/mm/purchase-orders/:id/approve
  - Response: ApiResponse<null>
- POST ${API_BASE_URL}/scm-pp/mm/purchase-orders/:id/reject
  - Response: ApiResponse<null>
- POST ${API_BASE_URL}/scm-pp/mm/:id/start-delivery
  - Response: ApiResponse<null>
- GET ${API_BASE_URL}/scm-pp/mm/supplier
  - Response: ApiResponse<SupplierListResponse>
- GET ${API_BASE_URL}/scm-pp/mm/supplier/:id
  - Response: ApiResponse<SupplierDetailResponse>
- POST ${API_BASE_URL}/scm-pp/mm/supplier
  - Request: CreateSupplierRequest
  - Response: ApiResponse<null>
- PATCH ${API_BASE_URL}/scm-pp/mm/supplier/:id
  - Request: ModSupplierRequestBody
  - Response: ApiResponse<null>
- GET ${API_BASE_URL}/scm-pp/mm/purchase-requisition/status/toggle
  - Response: ApiResponse<KeyValueItem[]>
- GET ${API_BASE_URL}/scm-pp/mm/purchase-requisition/search-type/toggle
  - Response: ApiResponse<KeyValueItem[]>
- GET ${API_BASE_URL}/scm-pp/mm/purchase-orders/status/toggle
  - Response: ApiResponse<KeyValueItem[]>
- GET ${API_BASE_URL}/scm-pp/mm/purchase-orders/search-type/toggle
  - Response: ApiResponse<KeyValueItem[]>
- GET ${API_BASE_URL}/scm-pp/mm/supplier/category/toggle
  - Response: ApiResponse<KeyValueItem[]>
- GET ${API_BASE_URL}/scm-pp/mm/supplier/search-type/toggle
  - Response: ApiResponse<KeyValueItem[]>
- GET ${API_BASE_URL}/scm-pp/mm/supplier/status/toggle
  - Response: ApiResponse<KeyValueItem[]>

### 생산(Production)

- GET ${API_BASE_URL}/scm-pp/pp/statistic
  - Response: ApiResponse<ProductionStatResponse>
- GET ${API_BASE_URL}/scm-pp/pp/quotations
  - Response: ApiResponse<QuotationListResponse>
- POST ${API_BASE_URL}/scm-pp/pp/quotations/simulate
  - Response: ApiResponse<QuotationSimulationResponse>
- POST ${API_BASE_URL}/scm-pp/pp/quotations/preview
  - Response: ApiResponse<QuotationPreviewResponse>
- POST ${API_BASE_URL}/scm-pp/pp/quotations/confirm
  - Response: ApiResponse<null>
- GET ${API_BASE_URL}/scm-pp/pp/quotations/mps
  - Response: ApiResponse<MpsListResponse>
- GET ${API_BASE_URL}/scm-pp/pp/boms
  - Response: ApiResponse<BomListResponse>
- GET ${API_BASE_URL}/scm-pp/pp/boms/:id
  - Response: ApiResponse<BomDetailResponse>
- POST ${API_BASE_URL}/scm-pp/pp/boms
  - Response: ApiResponse<null>
- DELETE ${API_BASE_URL}/scm-pp/pp/boms/:id
  - Response: ApiResponseNoData
- GET ${API_BASE_URL}/scm-pp/pp/products/:id
  - Response: ApiResponse<MaterialResponse>
- GET ${API_BASE_URL}/scm-pp/pp/operations
  - Response: ApiResponse<KeyValueItem[]>
- GET ${API_BASE_URL}/scm-pp/pp/quotations/mrp
  - Response: ApiResponse<MrpOrdersListResponse>
- POST ${API_BASE_URL}/scm-pp/pp/mrp/convert
  - Response: ApiResponse<any>
- GET ${API_BASE_URL}/scm-pp/pp/mrp/runs
  - Response: ApiResponse<MrpPlannedOrdersListResponse>
- GET ${API_BASE_URL}/scm-pp/pp/mrp/planned-orders/detail/:id
  - Response: ApiResponse<MrpPlannedOrdersDetailResponse>
- GET ${API_BASE_URL}/scm-pp/pp/mes
  - Response: ApiResponse<MesListResponse>
- GET ${API_BASE_URL}/scm-pp/pp/mes/:id
  - Response: ApiResponse<MesDetailResponse>
- PUT ${API_BASE_URL}/scm-pp/pp/mes/:id/start
  - Response: ApiResponse<void>
- PUT ${API_BASE_URL}/scm-pp/pp/mes/:id/complete
  - Response: ApiResponse<void>
- PUT ${API_BASE_URL}/scm-pp/pp/mes/:id/operations/:opId/start
  - Response: ApiResponse<void>
- PUT ${API_BASE_URL}/scm-pp/pp/mes/:id/operations/:opId/complete
  - Response: ApiResponse<void>
- GET ${API_BASE_URL}/scm-pp/pp/mps/boms/toggle
  - Response: ApiResponse<KeyValueItem[]>
- GET ${API_BASE_URL}/scm-pp/pp/products
  - Response: ApiResponse<KeyValueItem[]>
- GET ${API_BASE_URL}/scm-pp/pp/available/status/toggle
  - Response: ApiResponse<KeyValueItem[]>
- GET ${API_BASE_URL}/scm-pp/pp/status/toggle
  - Response: ApiResponse<KeyValueItem[]>
- GET ${API_BASE_URL}/scm-pp/pp/mrp/quotations/toggle
  - Response: ApiResponse<KeyValueItem[]>
- GET ${API_BASE_URL}/scm-pp/pp/mrp/available/status/toggle
  - Response: ApiResponse<KeyValueItem[]>
- GET ${API_BASE_URL}/scm-pp/pp/mrp/runs/quotations/toggle
  - Response: ApiResponse<KeyValueItem[]>
- GET ${API_BASE_URL}/scm-pp/pp/mrp/runs/status/toggle
  - Response: ApiResponse<KeyValueItem[]>
- GET ${API_BASE_URL}/scm-pp/pp/mes/status/toggle
  - Response: ApiResponse<KeyValueItem[]>

### HRM

- GET ${API_BASE_URL}/business/hrm/statistics
  - Response: ApiResponse<HrmStatResponse>
- GET ${API_BASE_URL}/business/hrm/employee
  - Response: ApiResponse<EmployeeListResponse>
- GET ${API_BASE_URL}/business/hrm/positions
  - Response: ApiResponse<PositionDataResponse>
- GET ${API_BASE_URL}/business/hrm/positions/:id
  - Response: ApiResponse<PositionDetailResponse>
- GET ${API_BASE_URL}/business/hrm/departments
  - Response: ApiResponse<DepartmentsListResponse>
- PATCH ${API_BASE_URL}/business/hrm/departments/:id
  - Response: ApiResponse<null>
- GET ${API_BASE_URL}/business/hrm/payroll
  - Response: ApiResponse<PayRollListResponse>
- GET ${API_BASE_URL}/business/hrm/payroll/:id
  - Response: ApiResponse<PayRollDetailResponse>
- GET ${API_BASE_URL}/business/hrm/training-status
  - Response: ApiResponse<TrainingListResponse>
- GET ${API_BASE_URL}/business/hrm/training/employee/:id
  - Response: ApiResponse<TrainingDetailResponse>
- GET ${API_BASE_URL}/business/hrm/program
  - Response: ApiResponse<ProgramListResponse>
- GET ${API_BASE_URL}/business/hrm/program/:id
  - Response: ApiResponse<ProgramDetailResponse>
- GET ${API_BASE_URL}/business/hrm/time-record
  - Response: ApiResponse<AttendanceListResponse>
- GET ${API_BASE_URL}/business/hrm/leave-request
  - Response: ApiResponse<LeaveListResponse>
- PATCH ${API_BASE_URL}/business/hrm/employee/:id
  - Response: ApiResponseNoData
- PATCH ${API_BASE_URL}/business/hrm/leave/request/:id/release
  - Response: ApiResponse<null>
- PATCH ${API_BASE_URL}/business/hrm/leave/request/:id/reject
  - Response: ApiResponse<null>
- POST ${API_BASE_URL}/business/hrm/program
  - Response: ApiResponse<null>
- PATCH ${API_BASE_URL}/business/hrm/program/:id
  - Response: ApiResponse<null>
- POST ${API_BASE_URL}/business/hrm/program/:employeeId
  - Response: ApiResponse<null>
- PUT ${API_BASE_URL}/business/hrm/time-record/:id
  - Response: ApiResponse<null>
- POST ${API_BASE_URL}/business/hrm/payroll/complete
  - Response: ApiResponse<null>
- POST ${API_BASE_URL}/business/hrm/employee/signup
  - Response: ApiResponse<null>
- GET ${API_BASE_URL}/business/hrm/departments/all
  - Response: ApiResponse<KeyValueItem[]>
- GET ${API_BASE_URL}/business/hrm/:departmentId/positions/all
  - Response: ApiResponse<KeyValueItem[]>
- GET ${API_BASE_URL}/business/hrm/attendance/statuses
  - Response: ApiResponse<KeyValueItem[]>
- GET ${API_BASE_URL}/business/hrm/departments/:id/members
  - Response: ApiResponse<KeyValueItem[]>
- GET ${API_BASE_URL}/business/hrm/payroll/statuses
  - Response: ApiResponse<KeyValueItem[]>
- GET ${API_BASE_URL}/business/hrm/trainings/categories
  - Response: ApiResponse<KeyValueItem[]>
- GET ${API_BASE_URL}/business/hrm/trainings/programs
  - Response: ApiResponse<KeyValueItem[]>
- GET ${API_BASE_URL}/business/hrm/trainings/completion-statuses
  - Response: ApiResponse<KeyValueItem[]>

### 프로필

- POST ${API_BASE_URL}/business/hrm/leave/request
  - Request: RequestVacation
  - Response: ApiResponseNoData
- POST ${API_BASE_URL}/business/profile/trainings/request?trainingId=:id
  - Response: ApiResponseNoData
- PATCH ${API_BASE_URL}/business/hrm/attendance/check-in
  - Response: ApiResponseNoData
- PATCH ${API_BASE_URL}/business/hrm/attendance/check-out
  - Response: ApiResponseNoData
- GET ${API_BASE_URL}/business/profile
  - Response: ApiResponse<ProfileInfoResponse | CustomerInfoResponse>
- GET ${API_BASE_URL}/business/profile/today-attendance
  - Response: ApiResponse<TodayAttendResponse>
- GET ${API_BASE_URL}/business/profile/attendance-records
  - Response: ApiResponse<AttendanceRecordsResponse[]>
- GET ${API_BASE_URL}/business/profile/trainings/available
  - Response: ApiResponse<TrainingResponse[]>
- GET ${API_BASE_URL}/business/profile/trainings/in-progress
  - Response: ApiResponse<TrainingResponse[]>
- GET ${API_BASE_URL}/business/profile/trainings/completed
  - Response: ApiResponse<TrainingResponse[]>
- POST ${API_BASE_URL}/business/profile/employees/profile/update
  - Request: EditUserRequest
  - Response: ApiResponseNoData

## 3) MSW 사용법

- 환경 변수 `NEXT_PUBLIC_API_MOCKING=enabled` 설정 시 목킹 활성화.
- 실패 케이스: 요청에 `?mockError=true` 또는 헤더 `x-mock-error: true` 추가.

## 4) 실제 백엔드로 교체 시 변경 포인트

1. NEXT_PUBLIC_API_MOCKING 값을 제거하거나 `disabled`로 변경.
2. OAuth, API Base URL을 환경 변수로 분리 (`API_BASE_URL`).
3. `axios` 직접 사용 파일을 `axiosInstance`로 통일.
4. 실서버 스키마가 확정되면 mock 데이터 구조를 실 데이터와 동기화.

## 5) Vercel 배포 주의사항

- Preview/Production 환경 변수에 `NEXT_PUBLIC_API_MOCKING=enabled`를 설정해야 목킹 동작.
- `public/mockServiceWorker.js`가 배포 산출물에 포함되어야 함.
- Next.js 캐시/ISR 적용 시, 클라이언트에서 MSW가 시작되기 전 요청이 발생할 수 있으므로, React Query 초기 요청 타이밍을 주의.
