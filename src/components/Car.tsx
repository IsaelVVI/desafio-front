import { Card, CardActions, CardContent, List, ListItem, Typography, useMediaQuery } from "@mui/material"
import { useState } from "react"
import { ModalCar } from "./ModalCar"
import { ICar } from "../common/interfaces"
import { formatMoney } from "../common/functions"

interface IPropsCar {
    car: ICar
    list?: boolean
}

export const Car = ({car, list}: IPropsCar) => {

    const media_query = useMediaQuery('(min-width:400px)')

    const [open_modal, setOpenModal] = useState(false)
    const photo = car.photos && car.photos[0].photo_url
    const closeModal = () => {
        setOpenModal(false)
    }

    const selectCar = () => {
        setOpenModal(true)
    }

    return (
        <>
            {open_modal && <ModalCar 
                open_modal={open_modal} 
                close_modal={closeModal}
                car={car}
            />}
            <Card onClick={() => selectCar()} sx={{display: list ? 'flex' : 'block', minHeight: media_query ? 'auto' : 250}}>
                <img style={{minHeight: 250, maxHeight: media_query ? 260 : 220}} width={list ? media_query ? 200 : 140 : '100%'} src={photo} alt="image offer" />
                <CardContent sx={{
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    flexDirection: 'column', 
                    alignItems: 'start', 
                    width: list ? '100%' : 'auto'
                }}>
                    <Typography gutterBottom variant="h5" component="div">
                        {car.model}
                    </Typography>
                    <List>
                        <ListItem sx={{padding: 0}}>
                            <span>
                                <small><b>Marca:</b> </small> {car.brand}
                            </span>
                        </ListItem>
                        <ListItem sx={{padding: 0}}>
                            <span>
                                <small><b>Ano:</b> </small> {car.year}
                            </span>
                        </ListItem>
                        <ListItem sx={{padding: 0}}>
                            <span>
                                <small><b>Preço:</b> </small> {formatMoney(car.price.toString())}
                            </span>
                        </ListItem>
                    </List>
                    {
                        list && <CardActions sx={{display: 'flex', width: '100%', justifyContent: 'center'}}>
                                    <small>Visualizações: {car.view}</small>
                                </CardActions>
                    }
                </CardContent>
                {
                    !list && <CardActions sx={{display: 'flex', justifyContent: 'end'}}>
                                <small>Visualizações: {car.view}</small>
                            </CardActions>
                }
            </Card>
        </>
    )
}