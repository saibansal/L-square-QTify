import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import AllSongsList from "./pages/AllSongList";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/song-detail/:id" element={<AllSongsList />} />

          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
