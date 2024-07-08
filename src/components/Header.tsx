import { AppBar, Box, Button, Toolbar} from "@mui/material"
import { useNavigate } from "react-router-dom"

export const Header = () => {

    const navigate = useNavigate()

    const navigatePage = (route: string) => {
        navigate(route)
    }

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" sx={{backgroundColor: 'black'}}>
                    <Toolbar sx={{display: 'flex', justifyContent: 'end'}}>
                        <Button onClick={() => navigatePage("/")} color="inherit">Ofertas</Button>
                        <Button onClick={() => navigatePage("/admin")} color="inherit">Administração</Button>
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    )
}