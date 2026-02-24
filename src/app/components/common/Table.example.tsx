import Table, { TableColumn } from '@/app/components/common/Table';
import StatusLabel from '@/app/components/common/StatusLabel';

// 사용 예제: 고객 목록 테이블

interface Customer {
  customerId: string;
  customerNumber: string;
  customerName: string;
  manager: {
    managerName: string;
    managerPhone: string;
    managerEmail: string;
  };
  address: string;
  totalTransactionAmount: number;
  orderCount: number;
  statusCode: string;
}

// 컬럼 정의
const columns: TableColumn<Customer>[] = [
  {
    key: 'customerName',
    label: '고객명',
    render: (_, row) => (
      <div>
        <div className="text-sm font-medium text-gray-900">{row.customerName}</div>
        <div className="text-xs text-gray-500">{row.customerNumber}</div>
      </div>
    ),
  },
  {
    key: 'manager',
    label: '담당자',
    render: (_, row) => {
      const manager = row.manager;
      return (
        <div>
          <div className="text-sm text-gray-900">{manager.managerName}</div>
          <div className="text-xs text-gray-500">{manager.managerPhone}</div>
          <div className="text-xs text-gray-500">{manager.managerEmail}</div>
        </div>
      );
    },
  },
  {
    key: 'address',
    label: '주소',
    render: (value) => (
      <div className="text-sm text-gray-900 max-w-xs truncate">{String(value)}</div>
    ),
  },
  {
    key: 'totalTransactionAmount',
    label: '거래금액',
    align: 'right',
    render: (_, row) => (
      <div>
        <div className="text-sm font-medium text-gray-900">
          ₩{row.totalTransactionAmount.toLocaleString()}
        </div>
        <div className="text-xs text-gray-500">{row.orderCount}건</div>
      </div>
    ),
  },
  {
    key: 'statusCode',
    label: '상태',
    align: 'center' as const,
    render: (value) => <StatusLabel $statusCode={String(value)} />,
  },
  {
    key: 'actions',
    label: '작업',
    align: 'center',
    width: '80px',
    render: (_, row) => (
      <button
        onClick={() => console.log('View', row.customerId)}
        className="text-blue-600 hover:text-blue-800"
        title="상세보기"
      >
        <i className="ri-eye-line"></i>
      </button>
    ),
  },
];

// 사용 방법
export default function CustomerTableExample() {
  const customers: Customer[] = []; // 실제 데이터

  return (
    <Table
      columns={columns}
      data={customers}
      keyExtractor={(row) => row.customerId}
      onRowClick={(row) => console.log('Row clicked:', row)}
      emptyMessage="고객 정보가 없습니다."
    />
  );
}
