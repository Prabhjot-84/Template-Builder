import React from "react";

const Toolbar = ({ onUndo, onRedo }) => {
    return (
        <div className="p-5 px-8 flex items-center justify-between">
            <div className="flex gap-5">
                <button onClick={onUndo} className="border p-2 px-3 rounded"> Undo </button>
                <button onClick={onRedo} className="border p-2 px-3 rounded"> Redo </button>
            </div>
        </div>
    );
};

export default Toolbar;
