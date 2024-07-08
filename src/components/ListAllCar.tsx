import { Box, Button, Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, TextField } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { formatMoney } from "../common/functions";
import { ModalNewCar } from "./ModalNewCar";
import { useEffect, useState } from "react";
import { ICar } from "../common/interfaces";
import axios from "axios";
import { toast } from "sonner";
import { ModalUpdateCar } from "./ModalUpdateCar";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export const ListAllCar = () => {

    useEffect(() => {
        async function getOffers() {
            await getAllCars()
        }

        getOffers()
    }, [])

    const [cars, setCars] = useState<ICar[]>([])
    const [filtered_cars, setFilteredCars] = useState<ICar[]>([])


    const [selected_car, setSelectedCar] = useState<ICar>({
        id: 0,
        model: '',
        brand: '',
        mileage: 0,
        price: 0,
        year: 0,
        color: '',
        city: '',
        plate: '',
        created: '',
        view: 0
    })

    const [open_modal, setOpenModal] = useState(false)
    const [open_update_modal, setUpdateModal] = useState(false)

    const closeModal = async () => {
        setOpenModal(false)
        setUpdateModal(false)
        await getAllCars()
    }

    const updateOrCreateOffer = (type: 'Create' | 'Update') => {
        if (type === 'Create') {
            setOpenModal(true)
        }

        if (type === 'Update') {
            setUpdateModal(true)
        }
    }

    const getAllCars = async () => {
        try {
            const { data } = await axios.get("http://127.0.0.1:3003/cars")
            setCars(data)
            setFilteredCars(data)
        } catch (error) {
            toast.error("Erro ao carregar ofertas")
            console.log("erro ao pegar ofertas", error);

        }
    }

    const selectCar = (car: ICar) => {
        setSelectedCar({
            ...car 
        })
        updateOrCreateOffer("Update")
    }

    const searchCar = (event: React.ChangeEvent<HTMLInputElement>) => {
        const text = event.target.value;
        if(text.length > 2){
            const temp = cars.filter(car => {
                if(car.model.toLowerCase().includes(text.toLowerCase())) return car
                if(car.brand.toLowerCase().includes(text.toLowerCase())) return car
                if(car.plate.toLowerCase().includes(text.toLowerCase())) return car
            })
            setFilteredCars(temp)
        }else{
            setFilteredCars(cars)
        }

    }


    const deleteCar = async (id: number) => {
        try {
            await axios.delete(`http://127.0.0.1:3003/cars/${id}`)
            await getAllCars()
            toast.success("Oferta Deletada!")
        } catch (error) {
            toast.error("Erro ao deletar oferta...")
            console.log(error);
            
        }
    }

    return (
        <>
            {open_modal && <ModalNewCar open_modal={open_modal} close_modal={closeModal} />}
            {
                open_update_modal && 
                <ModalUpdateCar 
                    open_modal={open_update_modal} 
                    close_modal={closeModal} 
                    car={selected_car}
                />
            }
            <Box sx={{ padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Box sx={{ padding: '0.4rem 0rem', display: 'flex', justifyContent: 'space-between' }}>
                    <TextField id="outlined-basic" onChange={searchCar} label="Pesquisar Veículo" size="small" variant="outlined" />
                    <Button onClick={() => updateOrCreateOffer("Create")} variant="outlined" sx={{ minWidth: 150, marginLeft: 2 }}>Nova Oferta</Button>
                </Box>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 900 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Modelo</StyledTableCell>
                                <StyledTableCell align="center">Marca</StyledTableCell>
                                <StyledTableCell align="center">Placa</StyledTableCell>
                                <StyledTableCell align="center">Cor</StyledTableCell>
                                <StyledTableCell align="center">Ano</StyledTableCell>
                                <StyledTableCell align="center">Cidade</StyledTableCell>
                                <StyledTableCell align="center">Preço</StyledTableCell>
                                <StyledTableCell align="center">Ações</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                filtered_cars.map((car) => (
                                    <StyledTableRow key={car.id}>
                                        <StyledTableCell component="th" scope="row">
                                            {car.model}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">{car.brand}</StyledTableCell>
                                        <StyledTableCell align="center">{car.plate}</StyledTableCell>
                                        <StyledTableCell align="center">{car.color}</StyledTableCell>
                                        <StyledTableCell align="center">{car.year}</StyledTableCell>
                                        <StyledTableCell align="center">{car.city}</StyledTableCell>
                                        <StyledTableCell align="center">{formatMoney(car.price.toString())}</StyledTableCell>
                                        <StyledTableCell align="center">
                                            <Button onClick={() => selectCar(car)}>
                                                <EditIcon />
                                            </Button>
                                            <Button onClick={() => deleteCar(car.id)}>
                                                <DeleteIcon color="error" />
                                            </Button>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                            {
                                !filtered_cars.length && <Box >NENHUMA OFERTA ENCONTRADA!</Box>
                            }
                </TableContainer>
            </Box>
        </>
    )

}