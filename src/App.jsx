import { Routes, Route, Link } from "react-router-dom"
import Home from "./pages/Home"
import AddUser  from "./pages/AddUser"
import EditUser from "./pages/EditUser"
import UserDetails from "./pages/UserDetails"

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
              to="/"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Accueil
            </Link>

            <Link
              to="/add"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Ajouter Utilisateur
            </Link>
          </div>
        </div>
      </nav>

      {/* Pages */}
      <main className="max-w-5xl mx-auto px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddUser />} />
          <Route path="/edit/:id" element={<EditUser />} />
          <Route path="/user/:id" element={<UserDetails />} />
        </Routes>
      </main>

    </div>
  )
}

export default App;
