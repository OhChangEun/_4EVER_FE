'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalContainerProps {
  children: React.ReactNode;
  title?: string;
  onClose: () => void;
}

const ModalContainer = ({ children, title, onClose }: ModalContainerProps) => {
  return (
    <AnimatePresence>
      <div className="fixed z-[1000] inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="border border-gray-100 bg-white rounded-2xl shadow-xl p-6 max-h-[720px] min-w-[400px] min-h-[380px] overflow-scroll relative pointer-events-auto"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* 헤더: title + 닫기 버튼 */}
          <div className="flex justify-between items-center">
            <h2 className="pl-2 pt-2 text-gray-800 text-lg font-semibold">{title}</h2>
            <button
              onClick={onClose}
              className="pr-1 text-gray-500 hover:text-gray-800 dark:hover:text-white cursor-pointer"
            >
              ✕
            </button>
          </div>
          {/* 모달 본문 */}
          <div className="pt-6">{children}</div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ModalContainer;
