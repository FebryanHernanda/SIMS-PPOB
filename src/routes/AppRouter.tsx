import { Route, Routes } from "react-router-dom";
import { MainLayout } from "../components/templates";
import {
  HistoryTransaksiPage,
  HomePage,
  LoginPage,
  PembayaranPage,
  ProfilePage,
  RegistrasiPage,
  TopUpPage,
  TransaksiPage,
} from "../pages";
import ProtectedRoute from "./ProtectedRoute";

const AppRouter = () => {
  const isAuthenticated = Boolean(localStorage.getItem("token"));
  console.log(isAuthenticated);

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegistrasiPage />} />
      {/* testing route */}
      <Route
        path="/homepage"
        element={
          <MainLayout dashboardSection={true}>
            <HomePage />
          </MainLayout>
        }
      />
      <Route
        path="/pembayaran"
        element={
          <MainLayout dashboardSection={true}>
            <PembayaranPage />
          </MainLayout>
        }
      />
      <Route
        path="/topup"
        element={
          <MainLayout dashboardSection={true}>
            <TopUpPage />
          </MainLayout>
        }
      />
      <Route
        path="/transaksi"
        element={
          <MainLayout dashboardSection={true}>
            <TransaksiPage />
          </MainLayout>
        }
      />
      <Route
        path="/transaksi/history"
        element={
          <MainLayout dashboardSection={true}>
            <HistoryTransaksiPage />
          </MainLayout>
        }
      />
      <Route
        path="/profile"
        element={
          <MainLayout dashboardSection={false}>
            <ProfilePage />
          </MainLayout>
        }
      />
      <Route
        path="/profile/edit"
        element={
          <MainLayout dashboardSection={false}>
            <ProfilePage />
          </MainLayout>
        }
      />
      <Route
        path="*"
        element={<div className="mt-20">404 - Halaman tidak ditemukan!</div>}
      />

      <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
        <Route
          path="/home"
          element={
            <MainLayout dashboardSection={true}>
              <HomePage />
            </MainLayout>
          }
        ></Route>
      </Route>
    </Routes>
  );
};

export default AppRouter;
