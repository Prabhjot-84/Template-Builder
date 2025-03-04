import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faImage, faListOl } from "@fortawesome/free-solid-svg-icons";

const Placeholder = ({ onAddText, onAddImage, onAddMCQ }) => {
    return (
        <>
            <div className="flex flex-col gap-7 p-5 px-8">
                <button onClick={onAddText} className="flex items-center gap-2 border-2 rounded-md font-bold text-slate-600 text-xl px-3 py-1 w-44 hover:shadow-xl">
                    <FontAwesomeIcon icon={faPen} size="sm" className="mr-2" />
                    Add Text
                </button>
                <button onClick={onAddImage} className="flex items-center gap-2 border-2 rounded-md font-bold text-slate-600 text-xl px-3 py-1 w-44 hover:shadow-xl">
                    <FontAwesomeIcon icon={faImage} size="sm" className="mr-2" /> Add Image
                </button>
                <button onClick={onAddMCQ} className="flex items-center gap-2 border-2 rounded-md font-bold text-slate-600 text-xl px-3 py-1 w-44 hover:shadow-xl">
                    <FontAwesomeIcon icon={faListOl} size="sm" className="mr-2" /> Add MCQ
                </button>
            </div>
        </>
    )
}

export default Placeholder