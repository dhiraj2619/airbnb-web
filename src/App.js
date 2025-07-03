import React from "react";
import Home from "./pages/Home";
import Header from "./components/Header";
import { matchPath, Route, Routes, useLocation } from "react-router-dom";
import LoginHost from "./components/LoginHost";
import ProfileCompletion from "./components/ProfileCompletion";
import HostListings from "./pages/HostListings";
import { RequireGuest } from "./Routes/ProtectedRoute";
import HostingOverview from "./pages/HostingOverview";
import HostingWizard from "./pages/HostingWizard";
import HostHeader from "./components/HostHeader";

const App = () => {

  const location = useLocation();

  const isHostRoutes = location.pathname === "/hosting/overview" || matchPath("/hosting/:propertyId/:step", location.pathname);
  return (
    <>
     {isHostRoutes ? <HostHeader/>  : <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<RequireGuest />}>
          <Route path="/become-a-host" element={<LoginHost />} />
        </Route>
        <Route path="/hosting" element={<HostListings />} />

        <Route path="/hosting/overview" element={<HostingOverview />} />
        <Route path="/hosting/:propertyId/:step" element={<HostingWizard />} />

        <Route path="/complete-profile" element={<ProfileCompletion />} />
      </Routes>
    </>
  );
};

export default App;
