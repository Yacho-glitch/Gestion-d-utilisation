import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { addUser, deleteUser } from "../store/usersSlice"
import { Link } from "react-router-dom"

export default function Users() {
  const users = useSelector(state => state.users.list)
  const dispatch = useDispatch()
  
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "User"
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(addUser({ id: Date.now(), ...form }))
    setForm({ name: "", email: "", role: "User" })
  }

  const handleDelete = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur?")) {
      dispatch(deleteUser(id))
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Add User Form - Left Side */}
      <div className="lg:col-span-1">
        <div className="bg-white shadow-lg rounded-xl p-6 sticky top-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Ajouter Utilisateur
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nom
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Entrez le nom"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="email@example.com"
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="User">User</option>
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
              </select>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Ajouter
            </button>
          </form>
        </div>
      </div>

      {/* User List - Right Side */}
      <div className="lg:col-span-2">
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          
          {/* Header */}
          <div className="px-6 py-4 border-b bg-gray-50 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">
              Liste d'utilisateurs
            </h2>
            <span className="text-sm text-gray-600 bg-blue-100 px-3 py-1 rounded-full">
              Total: {users.length}
            </span>
          </div>

          {/* Empty State */}
          {users.length === 0 ? (
            <div className="text-center py-20">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <p className="text-gray-500 text-lg mt-4">
                Aucun utilisateur trouvé
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Ajoutez votre premier utilisateur en utilisant le formulaire
              </p>
            </div>
          ) : (
            /* Table */
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                  <tr>
                    <th className="px-6 py-3 text-left">Nom</th>
                    <th className="px-6 py-3 text-left">Email</th>
                    <th className="px-6 py-3 text-left">Role</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {users.map(user => (
                    <tr
                      key={user.id}
                      className="hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-4 font-medium text-gray-800">
                        {user.name}
                      </td>

                      <td className="px-6 py-4 text-gray-600">
                        {user.email}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold
                            ${
                              user.role === 'Admin'
                                ? 'bg-red-100 text-red-600'
                                : user.role === 'Manager'
                                ? 'bg-yellow-100 text-yellow-600'
                                : 'bg-blue-100 text-blue-600'
                            }
                          `}
                        >
                          {user.role}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-right space-x-3">
                        <Link
                          to={`/user/${user.id}`}
                          className="inline-block text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Voir
                        </Link>

                        <button
                          onClick={() => handleDelete(user.id)}
                          className="text-red-600 hover:text-red-800 font-medium"
                        >
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          )}
        </div>
      </div>

    </div>
  )
}
