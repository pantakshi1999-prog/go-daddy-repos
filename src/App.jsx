import { BrowserRouter, Route, Routes } from "react-router-dom";

import Repositories from "./pages/repositories/Repositories";
import Repository from "./pages/repository/Repository";

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
