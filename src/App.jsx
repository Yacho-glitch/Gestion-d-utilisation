import { Routes, Route, Link, Navigate } from "react-router-dom"
import Users from "./pages/Users"
import User from "./pages/User"

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">

      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Gestion d'utilisateur
          </h1>

          <div className="flex gap-2">
            <Link
              to="/users"
              className="px-4 py-2 text-slate-700 hover:text-indigo-600 font-medium transition-colors rounded-lg hover:bg-slate-100"
            >
              Utilisateurs
            </Link>
          </div>
        </div>
      </nav>

      {/* Pages */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/user/:id" element={<User />} />
        </Routes>
      </main>

    </div>
  )
}

export default App;
