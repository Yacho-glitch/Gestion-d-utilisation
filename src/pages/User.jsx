import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { updateUser, deleteUser } from '../store/usersSlice'

export default function User() {

  //get the id of user from the url
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  //get user from global state by id
  const user = useSelector(state =>
    state.users.list.find(u => u.id == Number(id))
  )

  const [isEditing, setIsEditing] = useState(false)

  //intialize form object
  const [form, setForm] = useState({
    name: '',
    email: '',
    role: 'User'
  })

  //once user found it or updated excute the code
  useEffect(() => {
    //check are not undefinded
    if (user) {
      //update form
      setForm({
        name: user.name,
        email: user.email,
        role: user.role
      })
    }
  }, [user])

  //if user don't exist we show this
  if (!user) {
    return (
      <div className="text-center py-20">
        <div className="w-16 h-16 mx-auto bg-slate-100 rounded-full flex items-center justify-center">
          <svg className="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-slate-600 text-base font-medium mt-4">
          Utilisateur introuvable
        </p>
        <Link
          to="/users"
          className="inline-block mt-4 text-indigo-600 hover:text-indigo-700 font-medium px-4 py-2 hover:bg-indigo-50 rounded-lg transition-colors"
        >
          ← Retour à la liste
        </Link>
      </div>
    )
  }

  //handel the input changes function
  const handleChange = (e) => {

    //destructing the name and value of the input
    const { name, value } = e.target

    //update the form state
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
      <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm">

        {/* Header */}
        <div className="bg-linear-to-br from-indigo-50 to-purple-50 p-8 border-b border-slate-200">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-bold mb-1 text-slate-800">
                {user.name}
              </h2>
              <p className="text-slate-500 text-sm">
                Profile d'utilisateur
              </p>
            </div>
            <span
              className={`px-4 py-2 rounded-full text-xs font-medium
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
          </div>
        </div>

        {/* Content */}
        <div className="p-8">

          {!isEditing ? (
            /* View Mode */
            <div className="space-y-6">

              {/* Info Rows */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div className="bg-slate-50 rounded-xl p-4">
                  <label className="text-xs text-slate-500 font-medium block mb-2">
                    Nom complet
                  </label>
                  <p className="text-slate-800 font-semibold">
                    {user.name}
                  </p>
                </div>

                <div className="bg-slate-50 rounded-xl p-4">
                  <label className="text-xs text-slate-500 font-medium block mb-2">
                    Adresse Email
                  </label>
                  <p className="text-slate-800 font-semibold">
                    {user.email}
                  </p>
                </div>

                <div className="bg-slate-50 rounded-xl p-4">
                  <label className="text-xs text-slate-500 font-medium block mb-2">
                    Rôle
                  </label>
                  <p className="text-slate-800 font-semibold">
                    {user.role}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex-1 bg-linear-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all font-medium shadow-sm hover:shadow-md"
                >
                  Modifier
                </button>

                <button
                  onClick={handleDelete}
                  className="flex-1 bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition-all font-medium shadow-sm hover:shadow-md"
                >
                  Supprimer
                </button>
              </div>

            </div>
          ) : (
            /* Edit Mode */
            <form onSubmit={handleUpdate} className="space-y-6">

              <div className="bg-indigo-50 rounded-xl p-4 mb-6">
                <p className="text-sm text-indigo-800">
                  Vous êtes en mode édition. Modifiez les champs ci-dessous.
                </p>
              </div>

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

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-all font-medium shadow-sm hover:shadow-md"
                >
                  Enregistrer
                </button>

                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 bg-slate-500 text-white px-6 py-3 rounded-xl hover:bg-slate-600 transition-all font-medium shadow-sm hover:shadow-md"
                >
                  Annuler
                </button>
              </div>

            </form>
          )}

        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-8 py-4 border-t border-slate-200">
          <Link
            to="/users"
            className="text-slate-600 hover:text-indigo-600 font-medium inline-flex items-center transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Retour à la liste
          </Link>
        </div>

      </div>
    </div>
  )
}
