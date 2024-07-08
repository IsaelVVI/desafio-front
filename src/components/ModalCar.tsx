import { Box, Button, List, ListItem, Modal, Typography } from "@mui/material"
import { ICar } from "../common/interfaces";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { formatDate, formatMoney } from "../common/functions";
import { useEffect } from "react";
import axios from "axios";

interface IModalCar {
    open_modal: boolean,
    close_modal: any,
    car: ICar
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};


export const ModalCar = ({ open_modal, close_modal, car }: IModalCar) => {

    useEffect(() => {
        async function getOffers() {
            const offers = localStorage.getItem("offers")
            if(!offers || offers && !JSON.parse(offers).includes(car.id)){
                await updateView()
                if(offers){
                    let temp = JSON.parse(offers)
                    temp.push(car.id)
                    localStorage.setItem("offers", JSON.stringify(temp))
                }else{
                    let temp = []
                    temp.push(car.id)
                    localStorage.setItem("offers", JSON.stringify(temp))
                }
            }
        }

        getOffers()
    }, [])

    const updateView = async () => {
        try {
            await axios.put(`http://127.0.0.1:3003/cars/${car.id}`, {
                view: 1
            })
        } catch (error) {
            
        }
    }

    const sendWpp = async () => {
        const phone = `5585996891799`
        const message = `Olá queria fazer uma oferta no seguinte veículo \nModelo: ${car.model}\nMarca: ${car.brand}\nAno: ${car.year} \nPreço: ${formatMoney(car.price.toString())}`
        window.open(`whatsapp://send?phone=${phone}&text=${encodeURI(message)}`, '_blank')
    }

    return (
        <Modal
            open={open_modal}
            onClose={() => close_modal()}
        >
            <Box sx={style}>
                <Swiper
                    autoplay={
                        {
                            delay: 2000
                        }
                    }
                    modules={[Navigation, Pagination, Autoplay]}
                >
                    {car.photos?.map((photo, index: number) => (
                        <SwiperSlide key={index}>
                            <img height={250} width={'100%'} src={photo.photo_url} alt="photo offer" />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {car.model}
                </Typography>
                <List>
                    <ListItem sx={{ padding: 0 }}>
                        Marca: {car.brand}
                    </ListItem>
                    <ListItem sx={{ padding: 0 }}>
                        Ano: {car.year}
                    </ListItem>
                    <ListItem sx={{ padding: 0 }}>
                        Cor: {car.color}
                    </ListItem>
                    <ListItem sx={{ padding: 0 }}>
                        Quilometragem: {car.mileage}
                    </ListItem>
                    <ListItem sx={{ padding: 0 }}>
                        Placa: {car.plate}
                    </ListItem>
                    <ListItem sx={{ padding: 0 }}>
                        Cidade: {car.city}
                    </ListItem>
                    <ListItem sx={{ padding: 0 }}>
                        Preço: {formatMoney(car.price.toString())}
                    </ListItem>
                    <ListItem sx={{ padding: 0 }}>
                        Data de Criação: {formatDate(car.created.toString())}
                    </ListItem>
                </List>
                <Box sx={{display: 'flex', justifyContent: 'end'}}>
                    <Button onClick={() => sendWpp()} sx={{background: 'black', color:"white", padding: '6px 20px'}}>Fazer Oferta</Button>
                </Box>
            </Box>
        </Modal>
    )
}