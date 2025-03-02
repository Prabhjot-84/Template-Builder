import React from "react";
import CanvasBoard from "./components/CanvasBoard.jsx";

function App() {
  return (
    <div className="h-screen bg-gray-200">
      <nav className="bg-slate-800 p-5 px-7 text-white font-bold text-xl">
        <h1 className="">Template Builder</h1>
      </nav>
      <CanvasBoard />
    </div>
  );
}

export default App;
