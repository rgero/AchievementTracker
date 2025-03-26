import { Avatar } from "@mui/material"
import { useAuth } from "../../context/AuthenticationContext"

const UserAvatar = () => {
  const {user} = useAuth(); 

  const userImage = user ? user.user_metadata.avatar : "/default-user.jpg";
  const userName =  user ? user.user_metadata.full_name : "Default User";

  return (
    <Avatar alt={userName} src={userImage} sx={{width: 32, height: 32}}/>
  )
}

export default UserAvatar
