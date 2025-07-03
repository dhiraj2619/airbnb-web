import React from "react";
import Home from "./pages/Home";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import LoginHost from "./components/LoginHost";
import ProfileCompletion from "./components/ProfileCompletion";
import HostListings from "./pages/HostListings";
import { RequireGuest } from "./Routes/ProtectedRoute";
import HostingOverview from "./pages/HostingOverview";

const App = () => {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<RequireGuest />}>
          <Route path="/become-a-host" element={<LoginHost />} />
        </Route>
        <Route path="/hosting" element={<HostListings />} />
        <Route path="/hosting/overview" element={<HostingOverview />} />

        <Route path="/complete-profile" element={<ProfileCompletion />} />
      </Routes>
    </>
  );
};

export default App;
