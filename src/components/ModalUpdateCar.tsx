import { Box, Button, Grid, Modal, TextField, Typography } from "@mui/material"
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { ICar } from "../common/interfaces";

interface IModalUpdateOffer {
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



export const ModalUpdateCar = ({ open_modal, close_modal, car }: IModalUpdateOffer) => {

    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    const [loading, setLoading] = useState(false)

    const [form_offer, SetFormOffer] = useState({
        ...car
    })


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (files) {
            setSelectedFiles(Array.from(files));
        }
    };


    const updateOffer = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setLoading(true)

        try {
            const { data } = await axios.put(`http://127.0.0.1:3003/cars/${car.id}`, {
                ...form_offer,
                update_photos: selectedFiles.length ? true : false
            })

            if(selectedFiles.length){
                await sendPhotos(data.id)
            }
        } catch (error) {
            toast.error("Erro ao editar oferta, verifique os campos e tente novamente!")
            console.log("deu erro", error);
        }

        setLoading(false)
        close_modal()
    }


    const sendPhotos = async (id: number) => {
        const form_data = new FormData()

        form_data.append("car_id", String(id))

        selectedFiles.forEach(file => {
            form_data.append("photos[]", file)
        })

        try {
            const { data } = await axios.post('http://127.0.0.1:3003/photos', form_data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(data);

        } catch (error) {
            console.log("erro ao enviar fotos", error);
        }
    }


    return (
        <Modal
            open={open_modal}
            onClose={() => close_modal()}
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h1" sx={{ marginBottom: 2 }}>
                    Adicionar nova oferta
                </Typography>
                <form onSubmit={updateOffer}>
                    <Grid columns={12} container spacing={2}>

                        <Grid item xs={6}>
                            <TextField
                                onChange={(event) => SetFormOffer({ ...form_offer, model: event.target.value })}
                                required id="Modelo" value={form_offer.model} label="Modelo" size="small" variant="outlined" />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                onChange={(event) => SetFormOffer({ ...form_offer, brand: event.target.value })}
                                required id="Marca" value={form_offer.brand} label="Marca" size="small" variant="outlined" />
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                onChange={(event) => SetFormOffer({ ...form_offer, price: Number(event.target.value) })}
                                required InputProps={{inputProps: {min: 0}}} id="Preço" type="number" value={form_offer.price} label="Preço" size="small" variant="outlined" />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                onChange={(event) => SetFormOffer({ ...form_offer, year: Number(event.target.value) })}
                                required id="Ano" type="number" InputProps={{inputProps: {min: 0}}} label="Ano" value={form_offer.year} size="small" variant="outlined" />
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                onChange={(event) => SetFormOffer({ ...form_offer, mileage: Number(event.target.value) })}
                                required id="Quilometragem" InputProps={{inputProps: {min: 0}}} type="number" value={form_offer.mileage} label="Quilometragem" size="small" variant="outlined" />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                onChange={(event) => SetFormOffer({ ...form_offer, color: event.target.value })}
                                required id="Cor" label="Cor" size="small" value={form_offer.color} variant="outlined" />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                sx={{ width: '100%' }}
                                onChange={(event) => SetFormOffer({ ...form_offer, plate: event.target.value })}
                                required id="Placa" label="Placa" size="small" value={form_offer.plate} variant="outlined" />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                sx={{ width: '100%' }}
                                onChange={(event) => SetFormOffer({ ...form_offer, city: event.target.value })}
                                required id="Cidade" label="Cidade" size="small" value={form_offer.city} variant="outlined" />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                sx={{ width: '100%' }}
                                onChange={(event) => SetFormOffer({ ...form_offer, created: event.target.value })}
                                required id="Data" type="date" size="small" value={form_offer.created} variant="outlined" />
                        </Grid>
                        <Grid item xs={12}>
                            <label htmlFor="Files">Selecione as fotos</label>
                            <input id="Files" type="file" multiple onChange={handleFileChange} />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" disabled={loading} sx={{ background: 'black', color: "white", width: '100%' }}>
                                Editar Oferta
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Modal>
    )
}