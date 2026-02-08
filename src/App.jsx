import "./App.css";
import { Route, Routes } from "react-router-dom";
import Welcome from "./pages/welcome";
import Dashboard from "./pages/dashboard";
import NotFound from "./pages/notFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      {/* <Route path="login" element={<Login />} /> */}
      {/* <Route path="register" element={<Register />} /> */}
      <Route
        path="/board"
        element={
          // <AuthGuard>
          <Dashboard />
          // </AuthGuard>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
