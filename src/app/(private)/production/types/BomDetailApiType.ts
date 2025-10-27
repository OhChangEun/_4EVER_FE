// BOM 구성품 (Component)
export interface BomComponent {
  itemId: string;
  itemNumber: string;
  itemName: string;
  quantity: number;
  uomName: string;
  level: string; // 예: "Level 1"
  supplierCompanyName: string;
  operationId: string;
  operationName: string;
}

// BOM 레벨 구조 내 아이템
export interface BomLevelItem {
  itemId: string;
  itemNumber: string;
  itemName: string;
  quantity: number;
  uomName: string;
}

// 레벨별 구조 (Level 1, Level 2 ...)
export interface BomLevelStructure {
  [level: string]: BomLevelItem[];
}

// 공정(Routing) 정보
export interface BomRouting {
  sequence: number;
  operationId: string;
  operationName: string;
  runTime: number; // 단위 시간 (예: 분)
}

// BOM 전체 정보
export interface BomDetailResponse {
  bomId: string;
  bomNumber: string;
  productId: string;
  productNumber: string;
  productName: string;
  version: string;
  status: string; // 예: "활성"
  lastModifiedAt: string;
  components: BomComponent[];
  levelStructure: BomLevelStructure;
  routing: BomRouting[];
}
