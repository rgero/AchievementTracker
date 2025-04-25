import { IconButton } from "@mui/material"
import { Search } from "@mui/icons-material"
import { useDialogContext } from "../../context/DialogContext"

const SearchButton = () => {
  const { searchOpen, toggleSearch } = useDialogContext()
  return (
    <IconButton 
      aria-label="delete" 
      onClick={() => toggleSearch()}
      sx={{
        transition: 'color 0.3s ease',
        color: searchOpen ? 'error.main' : 'text.primary',
      }}  
    >
      <Search />
    </IconButton>
  )
}

export default SearchButton
