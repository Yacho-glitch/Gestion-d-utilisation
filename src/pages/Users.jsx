import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { useSelector, useDispatch } from "react-redux"
import { addUser, deleteAll, deleteUser } from "../store/usersSlice"
import { Link } from "react-router-dom"


export default function Users() {

  //get users state from store
  const users = useSelector(state => state.users.list)
  const dispatch = useDispatch()

  const [usersByRole, setUsersByRole] = useState([]);
  const [selectedRole, setSelectedRole] = useState('All');

  //intialize form object
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "User"
  })
  //state responsable to the form portal
  const [isFormOpen, setIsFormOpen] = useState(false)

  //handel the input changes function
  const handleChange = (e) => {

    //destructing the name and value of the input
    const { name, value } = e.target

    //update the form state
    setForm(prev => ({ ...prev, [name]: value }))
  }

  //add a new user
  const handleSubmit = (e) => {
    e.preventDefault()
    //add a new user to the global state
    dispatch(addUser({ id: users.length + 1, ...form }))

    //make the form state Empty
    setForm({ name: "", email: "", role: "User" })

    setIsFormOpen(false)//close the portal
  }

  //handel the delete function
  const handleDelete = (id) => {
    //check if confirm the delete
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur?")) {
      //delete the user from the global state by id
      dispatch(deleteUser(id))
    }
  }

  const filterByRole = (e) => {
    const { value } = e.target;
    if (value === 'All') {
      setUsersByRole([...users])
    } else {
      setUsersByRole([...users.filter(user => user.role === value)])
    }
    setSelectedRole(value)
  }
  useEffect(() => {
    if (users) {
      if (selectedRole === 'All') {
        setUsersByRole([...users])
      } else {
        setUsersByRole([...users.filter(user => user.role === selectedRole)])
      }
    }
  }, [users])


  return (
    <>
      {isFormOpen && createPortal(
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center" >
          <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 w-full max-w-md m-4" >
            <div className="mb-6 flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold text-slate-800 mb-1">
                  Ajouter Utilisateur
                </h2>
                <p className="text-sm text-slate-500">
                  Remplissez le formulaire ci-dessous
                </p>
              </div>
              <button
                onClick={() => setIsFormOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-2">
                  Nom complet
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  placeholder="Entrez le nom"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-2">
                  Adresse Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  placeholder="email@example.com"
                />
              </div>

              {/* Role */}
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-2">
                  Rôle
                </label>
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                >
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                  <option value="Manager">Manager</option>
                </select>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-linear-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all font-medium shadow-sm hover:shadow-md"
              >
                Ajouter
              </button>
            </form>
          </div>
        </div>,
        document.body
      )}

      <div className="grid grid-cols-1 gap-6">
        {/* User List */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

          {/* Header */}
          <div className="px-6 py-5 border-b border-slate-200 bg-linear-to-br from-indigo-50 to-purple-50 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold text-slate-800">
                Liste d'utilisateurs
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Gérez tous vos utilisateurs
              </p>
            </div>
            <div className="w-80 flex">
              <select
                name="role"
                value={selectedRole}
                onChange={filterByRole}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              >
                <option value="User">User</option>
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
                <option value="All">All</option>
              </select>

            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-600 bg-white px-4 py-2 rounded-xl border border-slate-200 font-medium">
                Total: {users.length}
              </span>
              <button
                onClick={() => setIsFormOpen(true)}
                className="bg-linear-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all font-medium text-sm"
              >
                Ajouter
              </button>
              <button
                onClick={() => dispatch(deleteAll())}
                className="bg-red-500 text-white px-4 py-2 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all font-medium text-sm"
              >
                delete all
              </button>

            </div>
          </div>

          {/* Empty State */}
          {users.length === 0 ? (
            <div className="text-center py-20 px-6">
              <div className="w-20 h-20 mx-auto bg-linear-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center mb-4">
                <svg className="h-10 w-10 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <p className="text-slate-800 text-lg font-semibold mt-4">
                Aucun utilisateur trouvé
              </p>
              <p className="text-slate-500 text-sm mt-2">
                Ajoutez votre premier utilisateur en utilisant le formulaire
              </p>
            </div>
          ) : (
            /* Table */
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-50 text-slate-600 uppercase text-xs border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Nom</th>
                    <th className="px-6 py-4 text-left font-semibold">Email</th>
                    <th className="px-6 py-4 text-left font-semibold">Rôle</th>
                    <th className="px-6 py-4 text-right font-semibold">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-200">
                  {usersByRole.map(user => (
                    <tr
                      key={user.id}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-6 py-4 font-semibold text-slate-800">
                        {user.name}
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {user.email}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium
                            ${user.role === 'Admin'
                              ? 'bg-rose-100 text-rose-700'
                              : user.role === 'Manager'
                                ? 'bg-amber-100 text-amber-700'
                                : 'bg-indigo-100 text-indigo-700'
                            }
                          `}
                        >
                          {user.role}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Link
                            to={`/user/${user.id}`}
                            className="inline-flex items-center px-3 py-1.5 text-indigo-600 hover:text-white hover:bg-indigo-600 border border-indigo-200 hover:border-indigo-600 rounded-lg transition-all font-medium"
                          >
                            Voir
                          </Link>

                          <button
                            onClick={() => handleDelete(user.id)}
                            className="inline-flex items-center px-3 py-1.5 text-red-600 hover:text-white hover:bg-red-600 border border-red-200 hover:border-red-600 rounded-lg transition-all font-medium"
                          >
                            Supprimer
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
