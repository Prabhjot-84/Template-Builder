
// UNDO
export const undo = (canvasInstance, history, currentStep) => {
    if (currentStep.current > 0) {
        currentStep.current -= 1;
        canvasInstance.current.loadFromJSON(history.current[currentStep.current], () => {
            canvasInstance.current.requestRenderAll();
        });
    }
};


// REDO
export const redo = (canvasInstance, history, currentStep) => {
    if (currentStep.current < history.current.length - 1) {
        currentStep.current += 1;
        canvasInstance.current.loadFromJSON(history.current[currentStep.current], () => {
            canvasInstance.current.requestRenderAll();
        });
    }
};


// SAVE
export const saveCanvas = (canvasInstance) => {
    if (!canvasInstance.current) return;
    localStorage.setItem("canvasState", JSON.stringify(canvasInstance.current.toDatalessJSON()));
    alert("Canvas saved successfully!");
};


// LOAD
export const loadCanvas = (canvasInstance) => {
    const savedState = localStorage.getItem("canvasState");
    if (!savedState) {
        alert("No saved canvas found.");
        return;
    }
    if (canvasInstance.current) {
        canvasInstance.current.clear();
        canvasInstance.current.loadFromJSON(savedState, () => {
            canvasInstance.current.requestRenderAll();
        });
    }
};


// EXPORT
export const exportCanvas = (canvasInstance) => {
    if (!canvasInstance.current) return;
    const json = JSON.stringify(canvasInstance.current.toDatalessJSON(), null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "canvas-design.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    alert("Canvas exported successfully!");
};


// PREVIEW
export const openPreview = (canvasInstance, setPreviewImage, setIsPreviewOpen) => {
    if (!canvasInstance.current) return;
    setPreviewImage(canvasInstance.current.toDataURL({ format: "png", quality: 1 }));
    setIsPreviewOpen(true);
};
