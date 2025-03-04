import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faUpload, faUndo, faRedo, faFileExport, faEye } from "@fortawesome/free-solid-svg-icons";

const Toolbar = ({ onUndo, onRedo, onSave, onLoad, onExport, onPreview }) => {
    return (
        <div className="p-5 px-8 flex items-center justify-between">
            <div className="flex gap-5">
                <button onClick={onUndo} className="border p-2 px-3 rounded hover:shadow-lg"> 
                    <FontAwesomeIcon icon={faUndo} size="sm" className="mr-2" />
                    Undo 
                </button>
                <button onClick={onRedo} className="border p-2 px-3 rounded hover:shadow-lg"> 
                    <FontAwesomeIcon icon={faRedo} size="sm" className="mr-2" />
                    Redo
                </button>
                <button onClick={onSave} className="border p-2 px-3 rounded hover:shadow-lg" title="Save Canvas"> 
                    <FontAwesomeIcon icon={faSave} className="mr-2" />
                    Save
                </button>
                <button onClick={onLoad} className="border p-2 px-3 rounded hover:shadow-lg" title="Load saved Canvas">
                    <FontAwesomeIcon icon={faUpload} size="sm" className="mr-2" />
                    Load
                </button>
            </div>
            <div className="flex gap-5">
                <button onClick={onExport} className="border border-slate-400 bg-slate-300 p-2 px-3 rounded hover:shadow-lg"> 
                    <FontAwesomeIcon icon={faFileExport} size="sm" className="mr-2" />
                    Export
                </button>
                <button onClick={onPreview} className="text-white bg-slate-700 p-2 px-3 rounded hover:shadow-lg">
                    <FontAwesomeIcon icon={faEye} size="sm" className="mr-2" />
                    Preview
                </button>
            </div>
        </div>
    );
};

export default Toolbar;
