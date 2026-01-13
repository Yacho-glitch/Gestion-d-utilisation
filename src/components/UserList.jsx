import { useDispatch } from "react-redux";
import { deleteUser } from "../store/usersSlice"
import { Link } from "react-router-dom"

export default function UserList({ users }) {
    const dispatch = useDispatch()

    if (users.length === 0) {
        return (
            <div className="text-center py-20">
                <p className="text-gray-500 text-lg">
                    No users found.
                </p>
                <Link
                    to="/add"
                    className="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >Add your first user
                </Link>
            </div>
        )
    }

    return (
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
      
      {/* Header */}
      <div className="px-6 py-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-700">
          List d'utilisateur
        </h2>
        <span className="text-sm text-gray-500">
          Total: {users.length}
        </span>
      </div>

      {/* Table */}
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

          <tbody className="divide-y">
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

                <td className="px-6 py-4 text-right space-x-2">
                  <Link
                    to={`/user/${user.id}`}
                    className="inline-block text-blue-600 hover:underline"
                  >
                    Details
                  </Link>

                  <Link
                    to={`/edit/${user.id}`}
                    className="inline-block text-yellow-600 hover:underline"
                  >
                    Modifier
                  </Link>

                  <button
                    onClick={() => dispatch(deleteUser(user.id))}
                    className="text-red-600 hover:underline"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
    ) 
}