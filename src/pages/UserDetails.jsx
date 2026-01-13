import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'


export default function UserDetails() {
    const { id } = useParams()
    const user = useSelector(state => state.users.list.find(u => u.id == id))

    // if (!user) return <p>User not found</p>
    if (!user) {
        return (
            <div className="text-center py-20">
                <p className="text-gray-500 text-lg">
                    User not found
                </p>
                <Link to="/" className="inline-block mt-4 text-blue-600 hover:underline">Back to users</Link>
            </div>
        )
    }


    return (
       <div className="max-w-3xl mx-auto">
      
      {/* Card */}
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
          <h2 className="text-2xl font-bold">
            {user.name}
          </h2>
          <p className="opacity-90">
            User Profile
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          
          {/* Info row */}
          <div className="flex items-center justify-between border-b pb-4">
            <span className="text-gray-500 font-medium">
              Email
            </span>
            <span className="text-gray-800 font-semibold">
              {user.email}
            </span>
          </div>

          <div className="flex items-center justify-between border-b pb-4">
            <span className="text-gray-500 font-medium">
              Role
            </span>
            <span
              className={`px-4 py-1 rounded-full text-sm font-semibold
                ${
                  user.role === 'Admin'
                    ? 'bg-red-100 text-red-600'
                    : 'bg-blue-100 text-blue-600'
                }
              `}
            >
              {user.role}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-500 font-medium">
              User ID
            </span>
            <span className="text-gray-800">
              #{user.id}
            </span>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex justify-between">
          <Link
            to="/"
            className="text-gray-600 hover:text-blue-600 font-medium"
          >
            ← Back
          </Link>

          <Link
            to={`/edit/${user.id}`}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Edit User
          </Link>
        </div>

      </div>
    </div>
    )
}