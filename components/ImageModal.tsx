import React, { useEffect } from "react";
import { X } from "lucide-react";

interface ImageModalProps {
  imageUrl: string;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ imageUrl, onClose }) => {
  useEffect(() => {
    console.log("Modal mounted");
    return () => console.log("Modal unmounted");
  }, []);

  return (
    <>
      {/* Close button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-white p-2 text-black shadow-lg hover:bg-gray-100 fixed top-8 right-8"
        style={{ zIndex: 9999 }}
      >
        <X className="h-10 w-10" />
      </button>

      <div className="fixed inset-0 z-[9000]">
        {/* Scrim overlay */}
        <div
          className="fixed inset-0 bg-black/85"
          onClick={onClose}
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.85)",
          }}
        />

        {/* Modal content */}
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="relative max-h-[90vh] max-w-[90vw] bg-gray-100 rounded-lg shadow-2xl">
            <div className="p-8">
              <div className="relative h-full w-full">
                <img
                  src={imageUrl}
                  alt="Full size"
                  className="max-h-[80vh] max-w-[80vw] object-contain"
                  style={{
                    maxHeight: "80vh",
                    maxWidth: "80vw",
                    width: "auto",
                    height: "auto",
                    objectFit: "contain",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageModal;
