import React from "react";
import Home from "./pages/Home";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import LoginHost from "./components/LoginHost";
import GoogleAuthSuccess from "./components/GoogleAuthSuccess";

const App = () => {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/become-host" element={<LoginHost/>} />
        <Route path="/google-auth-success" element={<GoogleAuthSuccess/>} />
      </Routes>
    </>
  );
};

export default App;
