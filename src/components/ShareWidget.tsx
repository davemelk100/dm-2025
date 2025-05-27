import { Linkedin, Link2 } from "lucide-react";
import { useState } from "react";
import Toast from "./Toast";

interface ShareWidgetProps {
  url: string;
  title: string;
}

export default function ShareWidget({ url, title }: ShareWidgetProps) {
  const [showToast, setShowToast] = useState(false);

  const handleShare = (platform: string) => {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    switch (platform) {
      case "linkedin":
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodedTitle}`,
          "_blank"
        );
        break;
      case "copy":
        navigator.clipboard.writeText(url);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
        break;
    }
  };

  return (
    <>
      <div className="flex items-center gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <span className="text-sm text-gray-600 dark:text-gray-400">Share:</span>
        <div className="flex gap-3">
          <button
            onClick={() => handleShare("linkedin")}
            className="p-2 text-gray-600 hover:text-blue-700 dark:text-gray-400 dark:hover:text-blue-600 transition-colors"
            aria-label="Share on LinkedIn"
          >
            <Linkedin className="h-5 w-5" />
          </button>
          <button
            onClick={() => handleShare("copy")}
            className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            aria-label="Copy link"
          >
            <Link2 className="h-5 w-5" />
          </button>
        </div>
      </div>
      <Toast message="Link copied to clipboard" isVisible={showToast} />
    </>
  );
}
