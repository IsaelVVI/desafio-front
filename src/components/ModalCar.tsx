import { Box, Button, List, ListItem, Modal, Typography } from "@mui/material"
import { ICar } from "../common/interfaces";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

interface IModalCar extends ICar {
    open_modal: boolean,
    close_modal: any
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};


export const ModalCar = ({ open_modal, close_modal, brand, name, price, view, year, list }: IModalCar) => {
    return (
        <Modal
            open={open_modal}
            onClose={() => close_modal()}
        >
            <Box sx={style}>
                <Swiper
                    modules={[Navigation, Pagination]}
                >
                    <SwiperSlide>
                        <img height={250} width={'100%'} src="https://picsum.photos/250/300" alt="" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img height={250} width={'100%'} src="https://picsum.photos/250/300" alt="" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img height={250} width={'100%'} src="https://picsum.photos/250/300" alt="" />
                    </SwiperSlide>
                </Swiper>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {name}
                </Typography>
                <List>
                    <ListItem sx={{ padding: 0 }}>
                        Marca: {brand}
                    </ListItem>
                    <ListItem sx={{ padding: 0 }}>
                        Ano: {year}
                    </ListItem>
                    <ListItem sx={{ padding: 0 }}>
                        Preço: {price}
                    </ListItem>
                </List>
                <Box sx={{display: 'flex', justifyContent: 'end'}}>
                    <Button sx={{background: 'black', color:"white", padding: '6px 20px'}}>Fazer Oferta</Button>
                </Box>
            </Box>
        </Modal>
    )
}