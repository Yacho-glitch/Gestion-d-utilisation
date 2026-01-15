import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { updateUser, deleteUser } from '../store/usersSlice'

export default function User() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const user = useSelector(state => 
    state.users.list.find(u => u.id == Number(id))
  )
  
  const [isEditing, setIsEditing] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    role: 'User'
  })

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name,
        email: user.email,
        role: user.role
      })
    }
  }, [user])

  if (!user) {
    return (
      <div className="text-center py-20">
        <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-gray-500 text-lg mt-4">
          Utilisateur introuvable
        </p>
        <Link 
          to="/users" 
          className="inline-block mt-4 text-blue-600 hover:underline font-medium"
        >
          ← Retour à la liste
        </Link>
      </div>
    )
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleUpdate = (e) => {
    e.preventDefault()
    dispatch(updateUser({ id: user.id, ...form }))
    setIsEditing(false)
  }

  const handleDelete = () => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer ${user.name}?`)) {
      dispatch(deleteUser(user.id))
      navigate('/users')
    }
  }

  const handleCancel = () => {
    setForm({
      name: user.name,
      email: user.email,
      role: user.role
    })
    setIsEditing(false)
  }

  return (
    <div className="max-w-4xl mx-auto">
      
      {/* Card */}
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-bold mb-2">
                {user.name}
              </h2>
              <p className="opacity-90 text-blue-100">
                Profile d'utilisateur
              </p>
            </div>
            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold shadow-lg
                ${
                  user.role === 'Admin'
                    ? 'bg-red-500 text-white'
                    : user.role === 'Manager'
                    ? 'bg-yellow-500 text-white'
                    : 'bg-white text-blue-600'
                }
              `}
            >
              {user.role}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          
          {!isEditing ? (
            /* View Mode */
            <div className="space-y-6">
              
              {/* Info Rows */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="border-b pb-4">
                  <label className="text-sm text-gray-500 font-medium block mb-1">
                    Nom complet
                  </label>
                  <p className="text-gray-800 font-semibold text-lg">
                    {user.name}
                  </p>
                </div>

                <div className="border-b pb-4">
                  <label className="text-sm text-gray-500 font-medium block mb-1">
                    Adresse Email
                  </label>
                  <p className="text-gray-800 font-semibold text-lg">
                    {user.email}
                  </p>
                </div>

                <div className="border-b pb-4">
                  <label className="text-sm text-gray-500 font-medium block mb-1">
                    Rôle
                  </label>
                  <p className="text-gray-800 font-semibold text-lg">
                    {user.role}
                  </p>
                </div>

                <div className="border-b pb-4">
                  <label className="text-sm text-gray-500 font-medium block mb-1">
                    ID Utilisateur
                  </label>
                  <p className="text-gray-800 font-mono">
                    #{user.id}
                  </p>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  ✏️ Modifier
                </button>
                
                <button
                  onClick={handleDelete}
                  className="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition font-medium"
                >
                  🗑️ Supprimer
                </button>
              </div>

            </div>
          ) : (
            /* Edit Mode */
            <form onSubmit={handleUpdate} className="space-y-6">
              
              <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6">
                <p className="text-sm text-blue-800">
                  Vous êtes en mode édition. Modifiez les champs ci-dessous.
                </p>
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom complet
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Entrez le nom"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Adresse Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="email@example.com"
                />
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rôle
                </label>
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                  <option value="Manager">Manager</option>
                </select>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-medium"
                >
                  ✓ Enregistrer
                </button>
                
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition font-medium"
                >
                  ✗ Annuler
                </button>
              </div>

            </form>
          )}

        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-8 py-4 border-t">
          <Link
            to="/users"
            className="text-gray-600 hover:text-blue-600 font-medium inline-flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Retour à la liste
          </Link>
        </div>

      </div>
    </div>
  )
}
