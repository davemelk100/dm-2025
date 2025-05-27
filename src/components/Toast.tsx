import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

interface ToastProps {
  message: string;
  isVisible: boolean;
}

export default function Toast({ message, isVisible }: ToastProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 z-50"
        >
          <Check className="h-4 w-4" />
          <span>{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
