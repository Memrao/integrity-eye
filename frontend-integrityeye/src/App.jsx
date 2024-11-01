import { Route, Routes } from "react-router-dom"; // Ensure both Route and Routes are imported
import Authpage from "./pages/auth";

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<Authpage />} />
    </Routes>
  );
}

export default App;
