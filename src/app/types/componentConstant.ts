import PurchaseRequestListTab from '@/app/(private)/purchase/components/tabs/PurchaseRequestListTab';
import { Tab } from './NavigationType';
import PurchaseOrderListTab from '@/app/(private)/purchase/components/tabs/PurchaseOrderListTab';
import SupplierListTab from '@/app/(private)/purchase/components/tabs/SupplierListTab';
import InvoiceList from '@/app/(private)/finance/components/tabs/InvoiceList';
import SalesQuoteList from '@/app/(private)/sales/components/tabs/SalesQuoteList';
import SalesOrderList from '@/app/(private)/sales/components/tabs/SalesOrderList';
import SalesCustomerList from '@/app/(private)/sales/components/tabs/SalesCustomerList';
import SalesChart from '@/app/(private)/sales/components/tabs/SalesChart';

// 재무 관리 탭 전환
export const FINANCE_TABS: Tab[] = [
  {
    id: 'sales',
    name: '매출 전표 관리',
    icon: 'ri-money-dollar-circle-line',
    component: InvoiceList,
  },
  { id: 'purchase', name: '매입 전표 관리', icon: 'ri-shopping-cart-line', component: InvoiceList },
];

// 구매 관리 탭 전환
export const PURCHASE_TABS: Tab[] = [
  {
    id: 'requests',
    name: '구매 요청',
    icon: 'ri-file-add-line',
    component: PurchaseRequestListTab,
  },
  {
    id: 'orders',
    name: '발주서',
    icon: 'ri-shopping-bag-3-line',
    component: PurchaseOrderListTab,
  },
  {
    id: 'suppliers',
    name: '공급업체 관리',
    icon: 'ri-building-line',
    component: SupplierListTab,
  },
];

export const SALES_TABS: Tab[] = [
  { id: 'quotes', name: '견적 관리', icon: 'ri-file-text-line', component: SalesQuoteList },
  { id: 'orders', name: '주문 관리', icon: 'ri-shopping-cart-line', component: SalesOrderList },
  { id: 'customers', name: '고객 관리', icon: 'ri-user-3-line', component: SalesCustomerList },
  { id: 'analytics', name: '매출 분석', icon: 'ri-bar-chart-line', component: SalesChart },
];
