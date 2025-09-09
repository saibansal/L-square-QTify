import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import AllSongsList from "./pages/AllSongList";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/songs" element={<AllSongsList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
