import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register, useDecodeToken } from "../../_services/auth";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "", 
    email: "",
    username: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("accessToken");
  const decodedData = useDecodeToken(token);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

   try {
      const response = await register(formData);

      localStorage.setItem("accessToken", response.token);
      localStorage.setItem("userInfo", JSON.stringify(response.user));

      if (response.user.role === "admin") {
        return navigate("/admin");
      } else {
        return navigate("/");
      }
    } catch (err) {
      // Ambil objek errors dari respons 422 Laravel
      const apiErrors = err?.response?.data?.message;

      if (apiErrors && typeof apiErrors === 'object') {
          // Ambil pesan error pertama dari validasi yang gagal
          // Laravel errors object: { field: ['The field message...'] }
          const firstFieldError = Object.values(apiErrors)[0];
          
          if (Array.isArray(firstFieldError) && firstFieldError.length > 0) {
              setError(firstFieldError[0]); // Tampilkan pesan spesifik pertama
          } else {
              setError("Validasi gagal, cek isian Anda.");
          }
      } else {
          // Jika bukan error 422 atau formatnya tidak dikenal
          setError(err?.response?.data?.message || "Gagal mendaftar. Silakan coba lagi.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token && decodedData && decodedData.success) {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (userInfo?.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
  }, [token, decodedData, navigate]);
  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create an account
              </h1>
              {error && (
                <div className="text-red-500 text-sm mt-2">{error}</div>
              )}
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Nama Anda"
                    required
                  />
                </div>
                
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email Anda
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    placeholder="nama@contoh.com"
                    required
                  />
                </div>
                
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    placeholder="user_keren"
                    required
                  />
                </div>
               
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>
                

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800 disabled:opacity-50"
                >
                  {loading ? "Mendaftar..." : "Daftar Akun"}
                </button>

                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Sudah punya akun?{" "}
                  <Link
                    to="/login"
                    className="font-medium text-indigo-600 hover:underline dark:text-indigo-500"
                  >
                    Masuk di sini
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
