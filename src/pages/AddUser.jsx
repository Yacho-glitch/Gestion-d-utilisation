import { useDispatch } from "react-redux"
import { addUser } from "../store/usersSlice"
import { useNavigate } from "react-router-dom"
import UserForm from "../components/UserForm"

export default function AddUser() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = (e, form) => {
        e.preventDefault()
        dispatch(addUser({ id: Date.now(), ...form }))
        navigate('/')
    }

    return <UserForm onSubmit={handleSubmit} />
}










