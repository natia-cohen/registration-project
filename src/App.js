import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import "./assets/styles/App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<RegisterPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
