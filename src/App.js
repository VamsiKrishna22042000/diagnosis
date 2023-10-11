import "./App.css";

import Dox from "./dox";
import MainTemplate from "./maintemplate";
import Notfound from "./notfound";

import Gross from "./gorss.js";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainTemplate />} />
          <Route path="/microscopy/:sampleId" element={<Dox />} />
          <Route path="/gorss/:sampleId" element={<Gross />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
