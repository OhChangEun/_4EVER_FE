// types/BomType.ts

export type BomStatus = '활성' | '비활성';
export type ComponentType = '부품' | '원자재' | '';
export type ComponentLevel = 1 | 2 | 3;

export interface Component {
  id: string;
  code: string;
  type: ComponentType;
  name: string;
  quantity: number;
  unit: string;
  level: ComponentLevel;
  material: string;
  supplier: string;
}

export interface Process {
  id: string;
  sequence: number;
  name: string;
  workCenter: string;
  setupTime: number;
  runTime: number;
}

export interface BomItem {
  id: string;
  productCode: string;
  productName: string;
  version: string;
  unit: string;
  status: BomStatus;
  createdDate: string;
  lastModified: string;
  components: Component[];
  processes: Process[];
}

export type ComponentRow = Component;

export type MaterialSupplierMap = Record<string, string[]>;
export type SupplierProcessMap = Record<string, string[]>;
