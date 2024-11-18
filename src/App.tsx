import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/pages/LoginPage";
import HomePage from "./components/pages/HomePage";
import ProtectedRoute from "./components/templates/ProtectedRoute";
import { AuthProvider } from "./stores/contexts/AuthContext";
import EditorPage from "./components/pages/EditorPage";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/editor/:id" element={<EditorPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
