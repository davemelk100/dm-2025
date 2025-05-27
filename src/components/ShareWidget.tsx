import { Linkedin, Link2 } from "lucide-react";
import { useState } from "react";

interface ShareWidgetProps {
  url: string;
  title: string;
}

export default function ShareWidget({ url, title }: ShareWidgetProps) {
  const [showCopied, setShowCopied] = useState(false);

  const handleShare = (type: "linkedin" | "copy") => {
    if (type === "linkedin") {
      const encodedUrl = encodeURIComponent(url);
      const encodedTitle = encodeURIComponent(title);
      window.open(
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodedTitle}`,
        "_blank"
      );
    } else {
      navigator.clipboard.writeText(url);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => handleShare("linkedin")}
        className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-700 dark:text-gray-400 dark:hover:text-blue-600 transition-colors"
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="h-5 w-5" />
        <span>Share on LinkedIn</span>
      </button>
      <button
        onClick={() => handleShare("copy")}
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
        aria-label="Copy link"
      >
        <Link2 className="h-5 w-5" />
        <span>{showCopied ? "Copied!" : "Copy Link"}</span>
      </button>
    </div>
  );
}
