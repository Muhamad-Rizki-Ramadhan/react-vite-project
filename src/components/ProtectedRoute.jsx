import { Navigate, Outlet } from "react-router-dom";
import { getRole, useDecodeToken } from "../_services/auth";

export default function ProtectedRoute({ requiredRole }) {
    
    const token = localStorage.getItem("accessToken");
    // Gunakan useDecodeToken untuk mendapatkan data
    const { decodedToken, isExpired } = useDecodeToken(token);
    
    // Asumsi: Jika token ada, tapi decodedToken masih null, berarti masih loading/gagal decode.
    // Jika token ada DAN isExpired adalah undefined, berarti useJwt belum selesai bekerja.
    const isDecoding = token && (decodedToken === undefined || isExpired === undefined);

    // Kriteria Otentikasi: Token ada, sudah di-decode (decodedToken != null), DAN BELUM kedaluwarsa.
    const isAuthenticated = !!token && !!decodedToken && !isExpired;

    // --- LOGIKA PROTEKSI ---

    // Kasus 1: Sedang memproses token, tampilkan sesuatu (atau null/loading)
    // Walaupun null/undefined akan memicu render ulang, ini mencegah redirect loop.
    if (isDecoding) {
        return null; // Tampilkan loading state atau div kosong
    }

    // Kasus 2: Gagal Autentikasi (Token hilang atau Kedaluwarsa)
    if (!isAuthenticated) {
        // Hapus token yang mungkin sudah expired (sebelum redirect)
        if (token) localStorage.removeItem("accessToken"); 
        
        return <Navigate to="/login" replace />; 
    }

    // Kasus 3: Gagal Otorisasi (Login, tapi role salah)
    if (requiredRole) {
        const currentRole = getRole();
        
        if (!currentRole || currentRole !== requiredRole) { 
            console.warn(`Akses ditolak: Role saat ini '${currentRole}' mencoba mengakses halaman untuk '${requiredRole}'.`);
            return <Navigate to="/" replace />; // Alihkan ke home (rute non-admin)
        }
    }

    // Kasus 4: SEMUA BERHASIL
    return <Outlet />;
}
