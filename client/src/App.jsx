import { lazy, Suspense } from "react";
import ErrorBoundary from "./ErrorBoundary";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Protectroute from "./components/Protectroute";
import Publicroute from "./components/Publicroute";
import Spinner from "./components/Spinner";
const HomePages = lazy(() => import("./pages/HomePages"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const ApplyDoctor = lazy(() => import("./pages/ApplyDoctor"));
const NotificationPage = lazy(() => import("./pages/NotificationPage"));
const Doctors = lazy(() => import("./pages/Admin/Doctors"));
const Users = lazy(() => import("./pages/Admin/Users"));
const Profile = lazy(() => import("./pages/doctor/Profile"));
const Bookingpage = lazy(() => import("./pages/Bookingpage"));

function App() {
  const { loading } = useSelector((state) => state.alerts);

  return (
    <>
      <BrowserRouter>
        {loading ? (
          <Spinner />
        ) : (
          <ErrorBoundary>
            <Suspense fallback={<Spinner />}>
              <Routes>
                <Route
                  path="/"
                  element={
                    <Protectroute>
                      <HomePages />
                    </Protectroute>
                  }
                />
                <Route
                  path="/login"
                  element={
                    <Publicroute>
                      <Login />
                    </Publicroute>
                  }
                />
                <Route
                  path="/register"
                  element={
                    <Publicroute>
                      <Register />
                    </Publicroute>
                  }
                />
                <Route
                  path="/notification"
                  element={
                    <Protectroute>
                      <NotificationPage />
                    </Protectroute>
                  }
                />
                <Route
                  path="/admin/users"
                  element={
                    <Protectroute>
                      <Users />
                    </Protectroute>
                  }
                />
                <Route
                  path="/admin/doctors"
                  element={
                    <Protectroute>
                      <Doctors />
                    </Protectroute>
                  }
                />
                <Route
                  path="/doctor/profile/:id"
                  element={
                    <Protectroute>
                      <Profile />
                    </Protectroute>
                  }
                />
                <Route
                  path="/doctor/book-appointment/:doctorid"
                  element={
                    <Protectroute>
                      <Bookingpage />
                    </Protectroute>
                  }
                />
                <Route
                  path="/apply-doctor"
                  element={
                    <Protectroute>
                      <ApplyDoctor />
                    </Protectroute>
                  }
                />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
