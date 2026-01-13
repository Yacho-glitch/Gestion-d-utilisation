import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { updateUser } from "../store/usersSlice"
import UserForm from "../components/UserForm"

export default function EditUser() {
    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const user = useSelector(state =>
        state.users.list.find(u => u.id == Number(id))
    )

    if (!user) {
        return (
            <p className="text-center text-gray-500 mt-20">
                User not found
            </p>
        )
    }

    const handleSubmit = (e, form) => {
        e.preventDefault()
        dispatch(updateUser({ id: user.id, ...form }))
        navigate('/')
    }


    return <UserForm user={user} onSubmit={handleSubmit} />
} 
























