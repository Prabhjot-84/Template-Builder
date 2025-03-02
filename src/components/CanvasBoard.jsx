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
            if (canvasInstance.current) {
                canvasInstance.current.dispose();
            }
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
                canvasInstance.current.renderAll();
                setTimeout(() => {
                    canvasInstance.current.requestRenderAll();
                }, 50);
            });
        }
    };

    // Save canvas to localStorage
    const saveCanvas = () => {
        if (!canvasInstance.current) return;
        const json = JSON.stringify(canvasInstance.current.toDatalessJSON());
        localStorage.setItem("canvasState", json);
        alert("Canvas saved successfully!");
    };

    // Load canvas from localStorage
    const loadCanvas = () => {
        const savedState = localStorage.getItem("canvasState");
        if (!savedState) {
            alert("No saved canvas found.");
            return;
        }

        if (canvasInstance.current) {
            canvasInstance.current.clear(); // Clear previous content before loading

            canvasInstance.current.loadFromJSON(savedState, () => {
                canvasInstance.current.renderAll();
                setTimeout(() => {
                    canvasInstance.current.requestRenderAll();
                }, 50);
            }, (error) => {
                console.error("Error loading canvas:", error);
            });
        }
    };

    // Export canvas as JSON file
    const exportCanvas = () => {
        if (!canvasInstance.current) return;

        // Convert canvas to JSON
        const json = JSON.stringify(canvasInstance.current.toDatalessJSON(), null, 2);
        
        // Create a Blob and generate a download link
        const blob = new Blob([json], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        
        // Create a temporary anchor element and trigger download
        const a = document.createElement("a");
        a.href = url;
        a.download = "canvas-design.json";
        document.body.appendChild(a);
        a.click();
        
        // Cleanup
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        alert("Canvas exported successfully!");
    };


    // Add Objects
    const addTextPlaceholder = () => {
        const text = new fabric.Text("Text Placeholder", { left: 150, top: 100, fontSize: 20, fill: "black" });
        canvasInstance.current.add(text);
        canvasInstance.current.renderAll();
        saveState();  
    };
    
    const addImagePlaceholder = () => {
        const rect = new fabric.Rect({ left: 200, top: 150, fill: "lightgray", width: 100, height: 100, stroke: "black", strokeWidth: 2 });
        canvasInstance.current.add(rect);
        canvasInstance.current.renderAll();
        saveState();  
    };
    
    const addMCQPlaceholder = () => {
        const mcqBox = new fabric.Rect({ left: 250, top: 200, fill: "white", width: 150, height: 100, stroke: "black", strokeWidth: 2 });
        const text = new fabric.Text("MCQ Placeholder", { left: 260, top: 220, fontSize: 16, fill: "black" });
    
        canvasInstance.current.add(mcqBox);
        canvasInstance.current.add(text);
        canvasInstance.current.renderAll();
        saveState();  
    };

    return (
        <div>
            <Toolbar onUndo={undo} onRedo={redo} onSave={saveCanvas} onLoad={loadCanvas} onExport={exportCanvas} />
            <div className="flex justify-evenly p-5">
                <Placeholder onAddText={addTextPlaceholder} onAddImage={addImagePlaceholder} onAddMCQ={addMCQPlaceholder} />
                <div className="bg-slate-50 rounded-lg shadow-lg"> <canvas ref={canvasRef}/> </div>
            </div>
        </div>
    );
};

export default CanvasBoard;
