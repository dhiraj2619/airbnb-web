import React from "react";
import Home from "./pages/Home";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import LoginHost from "./components/LoginHost";

const App = () => {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/become-host" element={<LoginHost/>} />
      </Routes>
    </>
  );
};

export default App;
