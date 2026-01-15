import { Routes, Route, Link } from "react-router-dom"
import Users from "./pages/Users"
import User from "./pages/User"

function App() {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <nav className="bg-white shadow mb-6">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">
            Gestion d'utilisateur
          </h1>

          <div className="space-x-4">
            <Link
              to="/users"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Utilisateurs
            </Link>
          </div>
        </div>
      </nav>

      {/* Pages */}
      <main className="max-w-7xl mx-auto px-4">
        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/user/:id" element={<User />} />
        </Routes>
      </main>

    </div>
  )
}

export default App;
