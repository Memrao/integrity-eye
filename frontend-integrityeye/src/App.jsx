import { Route, Routes } from "react-router-dom"; // Ensure both Route and Routes are imported
import Authpage from "./pages/auth";
import Dashboard  from "./pages/dashboard";

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<Authpage />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
