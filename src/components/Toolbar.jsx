import React from "react";

const Toolbar = ({ onUndo, onRedo, onSave, onLoad, onExport, onPreview }) => {
    return (
        <div className="p-5 px-8 flex items-center justify-between">
            <div className="flex gap-5">
                <button onClick={onUndo} className="border p-2 px-3 rounded"> Undo </button>
                <button onClick={onRedo} className="border p-2 px-3 rounded"> Redo </button>
                <button onClick={onSave} className="border p-2 px-3 rounded"> Save </button>
                <button onClick={onLoad} className="border p-2 px-3 rounded" title="Load the saved file"> Load </button>
            </div>
            <div className="flex gap-5">
                <button onClick={onExport} className="border border-slate-400 bg-slate-300 p-2 px-3 rounded"> Export </button>
                <button onClick={onPreview} className="text-white bg-slate-700 p-2 px-3 rounded"> Preview </button>
            </div>
        </div>
    );
};

export default Toolbar;
