import "./App.css";
import { Route, Routes } from "react-router-dom";
import Welcome from "./pages/welcome";
import Dashboard from "./pages/dashboard";
import NotFound from "./pages/notFound";
import Auth from "./pages/auth";
import AuthGuard from "./components/AuthGuard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/auth" element={<Auth />} />
      <Route
        path="/board"
        element={
          <AuthGuard>
            <Dashboard />
          </AuthGuard>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
