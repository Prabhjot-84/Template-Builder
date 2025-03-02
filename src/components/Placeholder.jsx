import React from 'react'

const Placeholder = ({ onAddText, onAddImage, onAddMCQ }) => {
    return (
        <>
            <div className="flex flex-col items-center gap-7 p-5 px-8">
                <button onClick={onAddText} className="border-2 rounded-md font-bold text-slate-600 text-xl px-3 py-1 w-60">Add Text</button>
                <button onClick={onAddImage} className="border-2 rounded-md font-bold text-slate-600 text-xl px-3 py-1 w-60">Add Image</button>
                <button onClick={onAddMCQ} className="border-2 rounded-md font-bold text-slate-600 text-xl px-3 py-1 w-60">Add MCQ</button>
            </div>
        </>
    )
}

export default Placeholder