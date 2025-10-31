interface NotificationPaginationProps {
  currentPage: number;
  totalPages: number;
  onPrevPage: () => void;
  onNextPage: () => void;
}

// 페이지네이션 컴포넌트
export default function NotificationPagination({
  currentPage,
  totalPages,
  onPrevPage,
  onNextPage,
}: NotificationPaginationProps) {
  return (
    <div className="p-3 border-t border-gray-200 bg-gray-50">
      <div className="flex items-center justify-center space-x-3">
        <button
          onClick={onPrevPage}
          disabled={currentPage === 0}
          className={`flex items-center justify-center w-8 h-8 rounded-full cursor-pointer transition-colors ${
            currentPage === 0
              ? 'text-gray-300'
              : 'text-gray-600 hover:bg-blue-100 hover:text-blue-600'
          }`}
        >
          <i className="ri-arrow-left-s-line text-lg"></i>
        </button>

        <div className="pt-0.5 flex items-center space-x-1">
          <span className="text-sm font-semibold text-gray-700">{currentPage + 1}</span>
          <span className="text-sm text-gray-400">/</span>
          <span className="text-sm text-gray-500">{totalPages}</span>
        </div>

        <button
          onClick={onNextPage}
          disabled={currentPage === totalPages - 1}
          className={`flex items-center justify-center w-8 h-8 rounded-full cursor-pointer transition-colors ${
            currentPage === totalPages - 1
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-gray-600 hover:bg-blue-100 hover:text-blue-600'
          }`}
        >
          <i className="ri-arrow-right-s-line text-lg"></i>
        </button>
      </div>
    </div>
  );
}
