import { KeyValueItem } from '@/app/types/CommonType';
import { autoUpdate, FloatingPortal, offset, shift, useFloating } from '@floating-ui/react';
import { useEffect, useState } from 'react';

interface DropdownProps<T extends string = string> {
  items: KeyValueItem[];
  value: T; // 선택된 값
  onChange?: (key: T) => void;
  className?: string;
}

export default function Dropdown<T extends string = string>({
  items,
  value,
  onChange,
  className = '',
}: DropdownProps<T>) {
  const [open, setOpen] = useState(false);

  const { refs, floatingStyles } = useFloating({
    placement: 'bottom-start',
    middleware: [offset(6), shift()],
    whileElementsMounted: autoUpdate,
  });

  const selectedItem = items.find((item) => item.key === value);
  const displayLabel = selectedItem?.value ?? items[0].value;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (open && !refs.floating.current?.contains(target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open, refs]);

  const handleSelect = (key: string) => {
    onChange?.(key as T);
    setOpen(false); // 닫기
  };

  return (
    <div className={`relative inline-block ${className}`}>
      {/* 버튼 */}
      <div ref={refs.setReference}>
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className={`pl-4 pr-1.5 py-1.5 text-sm rounded-lg font-medium focus:outline-none transition cursor-pointer whitespace-nowrap
                    ${
                      selectedItem?.key === 'ALL'
                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        : 'bg-blue-100 text-blue-500 hover:bg-blue-200/70'
                    }
                  `}
        >
          <span>{displayLabel}</span>
          <span className="pl-2">
            <i className="ri-arrow-down-s-line"></i>
          </span>
        </button>
      </div>

      {/* 드롭다운 리스트 */}
      {open && (
        <FloatingPortal>
          <ul
            ref={refs.setFloating}
            style={floatingStyles}
            className="z-[9999] max-h-56 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg min-w-[120px] animate-fadeIn"
          >
            {items.map((item, index) => {
              const isSelected = item.key === selectedItem?.key;
              const borderRadiusClass =
                index === 0 ? 'rounded-t-lg' : index === items.length - 1 ? 'rounded-b-lg' : '';
              return (
                <li
                  key={item.key}
                  onClick={() => {
                    handleSelect(item.key);
                  }}
                  className={`px-4 py-2 text-sm truncate cursor-pointer
                            ${borderRadiusClass}
                            ${isSelected ? 'text-blue-500 bg-blue-50' : 'text-gray-800 hover:bg-blue-50'}
                          `}
                >
                  {item.value}
                </li>
              );
            })}
          </ul>
        </FloatingPortal>
      )}
    </div>
  );
}
