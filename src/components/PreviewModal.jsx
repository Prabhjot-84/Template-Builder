import React from "react";

const PreviewModal = ({ isOpen, onClose, previewImage }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-5 rounded-lg shadow-lg max-w-2xl w-full">
                <h2 className="text-lg font-semibold mb-3">Template Preview</h2>
                {previewImage ? (
                    <img src={previewImage} alt="Canvas Preview" className="w-full h-auto rounded" />
                ) : (
                    <p>No preview available</p>
                )}
                <button 
                    onClick={onClose} 
                    className="mt-3 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default PreviewModal;