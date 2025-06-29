import React from "react";
import Home from "./pages/Home";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import LoginHost from "./components/LoginHost";
import ProfileCompletion from "./components/ProfileCompletion";

const App = () => {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/become-host" element={<LoginHost/>} />
      
        <Route path="/complete-profile" element={<ProfileCompletion/>} />
      </Routes>
    </>
  );
};

export default App;
