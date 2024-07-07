import { Card, CardActions, CardContent, CardMedia, List, ListItem, Typography } from "@mui/material"
import { useState } from "react"
import { ModalCar } from "./ModalCar"
import { ICar } from "../common/interfaces"


export const Car = ({list, name, year, view, brand, price}: ICar) => {

    const [open_modal, setOpenModal] = useState(false)

    const [car_selected, setCarSelected] = useState({
        price: 0,
        name: '',
        brand: '',
        year: 0,
        view: 0
    })

    const closeModal = () => {
        setOpenModal(false)
    }

    const selectCar = () => {
        setCarSelected({
            brand,
            name,
            price,
            view,
            year
        })

        setOpenModal(true)
    }

    return (
        <>
            <ModalCar 
                open_modal={open_modal} 
                close_modal={closeModal}
                brand={car_selected.brand}
                name={car_selected.name}
                price={car_selected.price}
                view={car_selected.view}
                year={car_selected.year} 
            />
            <Card onClick={() => selectCar()} sx={{display: list ? 'flex' : 'block', height: list ? 200 : 'auto'}}>
                <CardMedia
                    component={"img"}
                    height={!list ? 150 : 'auto'}
                    sx={{contain: 'size'}}
                    image="https://picsum.photos/200/300"
                />
                <CardContent sx={{
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    flexDirection: 'column', 
                    alignItems: 'start', 
                    width: list ? '100%' : 'auto'
                }}>
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                    <List>
                        <ListItem sx={{padding: 0}}>
                            Marca: {brand}
                        </ListItem>
                        <ListItem sx={{padding: 0}}>
                            Ano: {year}
                        </ListItem>
                        <ListItem sx={{padding: 0}}>
                            Preço: {price}
                        </ListItem>
                    </List>
                    {
                        list && <CardActions sx={{display: 'flex', width: '100%', justifyContent: 'center'}}>
                                    <small>Visualizações: {view}</small>
                                </CardActions>
                    }
                </CardContent>
                {
                    !list && <CardActions sx={{display: 'flex', justifyContent: 'end'}}>
                                <small>Visualizações: {view}</small>
                            </CardActions>
                }
            </Card>
        </>
    )
}