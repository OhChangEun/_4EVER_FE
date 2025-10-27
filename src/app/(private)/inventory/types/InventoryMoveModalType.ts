export interface InventoryMoveModalProps {
  $setShowMoveModal: (show: boolean) => void;
  $selectedStock: {
    itemName: string;
    itemNumber: string;
    warehouseName: string;
    warehouseNumber: string;
    currentStock: number;
    uomName: string;
  };
}
