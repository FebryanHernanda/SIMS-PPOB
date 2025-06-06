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
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegistrasiPage />} />

      <Route
        path="/pembayaran"
        element={
          <ProtectedRoute>
            <MainLayout dashboardSection={true}>
              <PembayaranPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/topup"
        element={
          <ProtectedRoute>
            <MainLayout dashboardSection={true}>
              <TopUpPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/transaksi"
        element={
          <ProtectedRoute>
            <MainLayout dashboardSection={true}>
              <TransaksiPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/transaksi/history"
        element={
          <ProtectedRoute>
            <MainLayout dashboardSection={true}>
              <HistoryTransaksiPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <MainLayout dashboardSection={false}>
              <ProfilePage />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile/edit"
        element={
          <ProtectedRoute>
            <MainLayout dashboardSection={false}>
              <ProfilePage />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <MainLayout dashboardSection={true}>
              <HomePage />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="*"
        element={<div className="mt-20">404 - Halaman tidak ditemukan!</div>}
      />
    </Routes>
  );
};

export default AppRouter;
