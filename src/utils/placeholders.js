import * as fabric from "fabric";

export const addTextPlaceholder = (canvasInstance, saveState) => {
    const text = new fabric.IText("Click to edit", {
        left: 150,
        top: 100,
        fontSize: 20,
        fill: "black",
        editable: true,
        fontFamily: "Arial",
    });

    canvasInstance.current.add(text);
    canvasInstance.current.requestRenderAll();
    saveState();
};

export const addImagePlaceholder = (canvasInstance, saveState) => {
    const rect = new fabric.Rect({
        left: 200,
        top: 150,
        fill: "lightgray",
        width: 100,
        height: 100,
        stroke: "black",
        strokeWidth: 2,
    });

    canvasInstance.current.add(rect);
    canvasInstance.current.requestRenderAll();
    saveState();
};

export const addMCQPlaceholder = (canvasInstance, saveState) => {
    const mcqText = new fabric.IText("Type your question here...?\n\nA) Option-1\nB) Option-2\nC) Option-3\nD) Option-4", {
        left: 150,
        top: 100,
        fontSize: 18,
        fill: "black",
        editable: true,
        fontFamily: "Arial",
        lineHeight: 1.5,
    });

    canvasInstance.current.add(mcqText);
    canvasInstance.current.requestRenderAll();
    saveState();
};