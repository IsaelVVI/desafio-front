import { AppBar, Box, Button, Toolbar} from "@mui/material"

export const Header = () => {
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" sx={{backgroundColor: 'black'}}>
                    <Toolbar sx={{display: 'flex', justifyContent: 'end'}}>
                        <Button color="inherit">Ofertas</Button>
                        <Button color="inherit">Administração</Button>
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    )
}