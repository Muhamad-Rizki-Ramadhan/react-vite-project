import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/public";
import PublicLayout from "./layouts/public";
import Books from "./pages/public/books";
import Register from "./pages/auth/register";
import Login from "./pages/auth/login";
import AdminLayout from "./layouts/admin";
import Dashboard from "./pages/admin";
import BookCreate from "./pages/admin/books/create";
import AdminBooks from "./pages/admin/books";
import AdminAuthors from "./pages/admin/authors";
import AuthorCreate from "./pages/admin/authors/create";
import AdminGenres from "./pages/admin/genres";
import GenreCreate from "./pages/admin/genres/create";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                
                <Route element={<PublicLayout />}>
                    <Route index element={<Home />} />
                    <Route path="books" element={<Books />} />
                </Route>

          
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />

              
                <Route path="admin" element={<AdminLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="books" element={<AdminBooks />} />
                    <Route path="books/create" element={<BookCreate />} />

                    <Route path="authors" element={<AdminAuthors />} />
                    <Route path="authors/create" element={<AuthorCreate />} />

                    <Route path="genres" element={<AdminGenres />} />
                    <Route path="genres/create" element={<GenreCreate />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
