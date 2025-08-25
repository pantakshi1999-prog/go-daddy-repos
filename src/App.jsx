import { BrowserRouter, Route, Routes } from "react-router-dom";

import Repositories from "./pages/repositories";
import Repository from "./pages/repository";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="App">
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Repositories />} />
              <Route path="/repository/:slug" element={<Repository />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
