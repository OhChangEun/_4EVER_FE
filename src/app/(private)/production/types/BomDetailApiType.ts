// BOM 구성품 (Component)
export interface BomComponent {
  itemId: string;
  code: string;
  name: string;
  quantity: number;
  unit: string;
  level: string; // 예: "Level 1"
  supplierName: string;
  operationId: string;
  operationName: string;
  componentType: string;
}

// BOM 레벨 구조 내 아이템
export interface BomLevelItem {
  code: string;
  name: string;
  quantity: number;
}

// 레벨별 구조 (Level 1, Level 2 ...)
export interface BomLevelStructure {
  [level: string]: BomLevelItem[];
}

// 공정(Routing) 정보
export interface BomRouting {
  sequence: number;
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
  statusCode: string; // 예: "활성"
  lastModifiedAt: string;
  components: BomComponent[];
  levelStructure: BomLevelStructure;
  routing: BomRouting[];
}
