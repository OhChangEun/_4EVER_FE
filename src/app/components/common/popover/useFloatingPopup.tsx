'use client';

import { useState, ReactNode } from 'react';
import {
  autoUpdate,
  flip,
  offset,
  shift,
  useFloating,
  useClick,
  useDismiss,
  useInteractions,
  FloatingPortal,
} from '@floating-ui/react';
import { AnimatePresence, motion } from 'framer-motion';

interface FloatingPopupOptions {
  placement?: 'top' | 'bottom' | 'bottom-start' | 'bottom-end';
  gap?: number;
}

export function useFloatingPopup({
  placement = 'bottom-start',
  gap = 8,
}: FloatingPopupOptions = {}) {
  const [isOpen, setIsOpen] = useState(false);

  // Floating 기본 설정
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen, // 상태를 floating-ui가 직접 제어 가능하게
    placement,
    middleware: [offset(gap), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  // 클릭 / 외부 클릭 등 기본 상호작용 설정
  const click = useClick(context); // 클릭으로 토글
  const dismiss = useDismiss(context); // 외부 클릭 감지로 닫기
  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss]);

  // 팝업 컴포넌트 정의
  const Popup = ({ children }: { children: ReactNode }) => (
    <AnimatePresence>
      {isOpen && (
        <FloatingPortal>
          <motion.div
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()} // floating props 적용
            className="z-[500] bg-white border border-gray-200 rounded-lg shadow-xl p-2"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
          >
            {children}
          </motion.div>
        </FloatingPortal>
      )}
    </AnimatePresence>
  );

  return {
    isOpen,
    setIsOpen,
    refs,
    getReferenceProps, // 버튼에 props 연결 필요
    Popup,
  };
}
