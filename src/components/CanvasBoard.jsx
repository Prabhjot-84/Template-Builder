import React, { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";
import Toolbar from "./Toolbar.jsx";
import Placeholder from "./Placeholder.jsx";
import PreviewModal from "./PreviewModal.jsx";

import { undo, redo, saveCanvas, loadCanvas, exportCanvas, openPreview } from "../utils/canvasActions.js";
import { addTextPlaceholder, addImagePlaceholder, addMCQPlaceholder } from "../utils/placeholders.js";


const CanvasBoard = () => {
    const canvasRef = useRef(null);
    const canvasInstance = useRef(null);

    // History for Undo/Redo
    const history = useRef([]);
    const currentStep = useRef(-1);

    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        // Initialize Fabric.js Canvas
        canvasInstance.current = new fabric.Canvas(canvasRef.current, {
            width: window.innerWidth * 0.7,
            height: 500,
            backgroundColor: "#f8f9fa",
        });

        saveState(); // Save Initial State

        // Handle Delete Key
        const handleKeyDown = (e) => {
            const activeObject = canvasInstance.current?.getActiveObject();
            
            // Prevent deletion when editing text
            if (activeObject && activeObject.isEditing) {
                return;
            }
        
            if ((e.key === "Delete" || e.key === "Backspace") && activeObject) {
                canvasInstance.current.remove(activeObject);
                saveState();
                canvasInstance.current.renderAll();
            }
        };        

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            if (canvasInstance.current) {
                canvasInstance.current.dispose();
            }
        };
    }, []);

    // Save the current canvas state
    const saveState = () => {
        if (!canvasInstance.current) return;
        history.current = history.current.slice(0, currentStep.current + 1);
        history.current.push(JSON.stringify(canvasInstance.current.toDatalessJSON()));
        currentStep.current = history.current.length - 1;
    };
  

    return (
        <div>
            <Toolbar 
                onUndo={() => undo(canvasInstance, history, currentStep)} 
                onRedo={() => redo(canvasInstance, history, currentStep)} 
                onSave={() => saveCanvas(canvasInstance)} 
                onLoad={() => loadCanvas(canvasInstance)} 
                onExport={() => exportCanvas(canvasInstance)} 
                onPreview={() => openPreview(canvasInstance, setPreviewImage, setIsPreviewOpen)} 
            />

            <div className="flex justify-evenly p-5">
                <Placeholder 
                    onAddText={() => addTextPlaceholder(canvasInstance, saveState)} 
                    onAddImage={() => addImagePlaceholder(canvasInstance, saveState)} 
                    onAddMCQ={() => addMCQPlaceholder(canvasInstance, saveState)} 
                />
                <div className="bg-slate-50 rounded-lg shadow-lg">
                    <canvas ref={canvasRef} />
                </div>
            </div>

            <PreviewModal isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)} previewImage={previewImage} />
        </div>
    );
};

export default CanvasBoard;
