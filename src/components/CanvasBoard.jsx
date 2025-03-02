import React, { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";
import Toolbar from "./Toolbar";
import Placeholder from "./Placeholder";

const CanvasBoard = () => {
    const canvasRef = useRef(null);
    const canvasInstance = useRef(null);

    // History for Undo/Redo
    const history = useRef([]);
    const currentStep = useRef(-1);

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
            if (e.key === "Delete" || e.key === "Backspace") {
                const activeObject = canvasInstance.current.getActiveObject();
                if (activeObject) {
                    canvasInstance.current.remove(activeObject);
                    saveState();
                    canvasInstance.current.renderAll();
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            canvasInstance.current.dispose();
        };
    }, []);

    // Save the current canvas state
    const saveState = () => {
        if (!canvasInstance.current) return;
    
        // Capture full state including all objects
        const json = JSON.stringify(canvasInstance.current.toDatalessJSON());
    
        // Ensure history doesn't go past current step
        history.current = history.current.slice(0, currentStep.current + 1);
        history.current.push(json);
        currentStep.current = history.current.length - 1;
    };    

    // Undo Function
    const undo = () => {
        if (currentStep.current > 0) {
            currentStep.current -= 1;
    
            canvasInstance.current.loadFromJSON(history.current[currentStep.current], () => {
                canvasInstance.current.renderAll();  // Ensure proper redraw
            });
    
            // 🚀 Force canvas to remain visible even after undo
            setTimeout(() => {
                canvasInstance.current.requestRenderAll();  
            }, 50);
        }
    };
    

    // Redo Function
    const redo = () => {
        if (currentStep.current < history.current.length - 1) {
            currentStep.current += 1;
            canvasInstance.current.loadFromJSON(history.current[currentStep.current], () => {
                canvasInstance.current.renderAll();  // Ensure full redraw
            });
        }
    };    

    // Load canvas from JSON
    const loadCanvas = (json) => {
        if (!json || !canvasInstance.current) return;
        canvasInstance.current.clear();
        canvasInstance.current.loadFromJSON(json, () => {
            canvasInstance.current.renderAll();
        });
    };

    // Add Objects
    const addTextPlaceholder = () => {
        const text = new fabric.Text("Text Placeholder", { left: 150, top: 100, fontSize: 20, fill: "black" });
        canvasInstance.current.add(text);
        canvasInstance.current.renderAll();
        saveState();  // Save only after render
    };
    
    const addImagePlaceholder = () => {
        const rect = new fabric.Rect({ left: 200, top: 150, fill: "lightgray", width: 100, height: 100, stroke: "black", strokeWidth: 2 });
        canvasInstance.current.add(rect);
        canvasInstance.current.renderAll();
        saveState();  // Save only after render
    };
    
    const addMCQPlaceholder = () => {
        const mcqBox = new fabric.Rect({ left: 250, top: 200, fill: "white", width: 150, height: 100, stroke: "black", strokeWidth: 2 });
        const text = new fabric.Text("MCQ Placeholder", { left: 260, top: 220, fontSize: 16, fill: "black" });
    
        canvasInstance.current.add(mcqBox);
        canvasInstance.current.add(text);
        canvasInstance.current.renderAll();
        saveState();  // Ensure all objects are saved together
    };


    return (
        <div>
            <Toolbar onUndo={undo} onRedo={redo} />
            <div className="flex justify-evenly p-5">
                <Placeholder onAddText={addTextPlaceholder} onAddImage={addImagePlaceholder} onAddMCQ={addMCQPlaceholder} />
                <canvas ref={canvasRef} className="shadow-lg rounded-lg border border-slate-200" />
            </div>
        </div>
    );
};

export default CanvasBoard;
