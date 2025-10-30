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
import BookEdit from "./pages/admin/books/edit";
import ShowBook from "./pages/public/books/show";
import AuthorEdit from "./pages/admin/authors/edit";
import GenreEdit from "./pages/admin/genres/edit";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <BrowserRouter>
        <Routes>
                
                <Route element={<PublicLayout />}>
                    <Route index element={<Home />} />

                    <Route path="books">
                        <Route index element={<Books />} />
                        <Route path="show/:id" element={<ShowBook />} />
                    </Route>
                </Route>

                
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />

                <Route path="admin" element={<ProtectedRoute requiredRole="admin" />}> 
                    <Route element={<AdminLayout />}>
                        <Route index element={<Dashboard />} />
                        <Route path="books" element={<AdminBooks />} />
                        <Route path="books/create" element={<BookCreate />} />
                        <Route path="books/edit/:id" element={<BookEdit />} />

                        <Route path="authors" element={<AdminAuthors />} />
                        <Route path="authors/create" element={<AuthorCreate />} />
                        <Route path="authors/edit/:id" element={<AuthorEdit />} />

                        <Route path="genres" element={<AdminGenres />} />
                        <Route path="genres/create" element={<GenreCreate />} />
                        <Route path="genres/edit/:id" element={<GenreEdit />} />
                    </Route>
                </Route>
            </Routes>
            {/* <Routes>
                
                <Route element={<PublicLayout />}>
                    <Route index element={<Home />} />

                    <Route path="books">
                        <Route index element={<Books />} />
                        <Route path="show/:id" element={<ShowBook />} />
                    </Route>
                </Route>

                
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />

                
                <Route path="admin" element={<AdminLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="books" element={<AdminBooks />} />
                    <Route path="books/create" element={<BookCreate />} />
                    <Route path="books/edit/:id" element={<BookEdit />} />

                    <Route path="authors" element={<AdminAuthors />} />
                    <Route path="authors/create" element={<AuthorCreate />} />
                    <Route path="authors/edit/:id" element={<AuthorEdit />} />

                    <Route path="genres" element={<AdminGenres />} />
                    <Route path="genres/create" element={<GenreCreate />} />
                    <Route path="genres/edit/:id" element={<GenreEdit />} />
                </Route>
            </Routes> */}
        </BrowserRouter>
    );
}

export default App;
