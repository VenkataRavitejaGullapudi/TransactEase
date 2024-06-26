import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import SendMoney from "./pages/SendMoney";
import ProtectedComponent from "./components/ProtectedComponent";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/"
            element={
              <ProtectedComponent>
                <Dashboard />
              </ProtectedComponent>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedComponent>
                <Dashboard />
              </ProtectedComponent>
            }
          />
          <Route
            path="/send"
            element={
              <ProtectedComponent>
                <SendMoney />{" "}
              </ProtectedComponent>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
