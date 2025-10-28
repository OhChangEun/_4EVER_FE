// 직급 데이터 형식
export interface PositionData {
  positionId: string;
  positionName: string;
  headCount: number;
  payment: number;
}

export type PositionDataResponse = PositionData[];
