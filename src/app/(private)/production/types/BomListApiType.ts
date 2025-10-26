import { Page } from '@/app/types/Page';

export interface BomListData {
  bomId: string;
  bomNumber: string;
  itemId: string;
  itemCode: string;
  itemName: string;
  version: string;
  status: string;
  lastModifiedAt: string;
}
export interface BomListResponse {
  page: Page;
  content: BomListData[];
}

// export interface FetchBomListParams {
//   나중에 추가
// }
