import { useSelector } from "react-redux"
import UserList from "../components/UserList"

export default function Home() {
    const users = useSelector(state => state.users.list)
    return <UserList users={users} />
}