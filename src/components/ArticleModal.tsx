import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ArticleModalProps {
  title: string;
  content: string;
  image?: string;
  onClose: () => void;
}

export default function ArticleModal({
  title,
  content,
  image,
  onClose,
}: ArticleModalProps) {
  const renderContent = (text: string) => {
    return text.split("\n\n").map((paragraph, index) => {
      if (paragraph.startsWith("## ")) {
        return (
          <h2
            key={index}
            className="text-2xl font-bold mb-4 mt-6 dark:text-white"
          >
            {paragraph.replace("## ", "")}
          </h2>
        );
      }
      return (
        <p key={index} className="mb-4 dark:text-gray-200">
          {paragraph}
        </p>
      );
    });
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 rounded-lg shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            aria-label="Close modal"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="p-8">
            <h2 className="text-3xl font-bold mb-2 dark:text-white">{title}</h2>
            <div className="flex items-center gap-4 mb-6 text-sm text-gray-600 dark:text-gray-400">
              <span>Dave Melkonian</span>
              <span>•</span>
              <span>March 19, 2024</span>
            </div>
            {image && (
              <div className="mb-8 aspect-video overflow-hidden rounded-lg shadow-md">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            )}
            <div className="prose dark:prose-invert max-w-none">
              {renderContent(content)}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
