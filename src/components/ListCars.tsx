import { Box, Button, Grid } from "@mui/material"
import { Car } from "./Car"
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import GridViewSharpIcon from '@mui/icons-material/GridViewSharp';
import { useState } from "react";
export const ListCars = () => {

    const carros = [
        {
            id: 1,
            preco: 50000,
            marca: 'Toyota',
            modelo: 'Corolla',
            ano: 2020,
            visualizacoes: 120
        },
        {
            id: 2,
            preco: 70000,
            marca: 'Honda',
            modelo: 'Civic',
            ano: 2019,
            visualizacoes: 95
        },
        {
            id: 3,
            preco: 30000,
            marca: 'Ford',
            modelo: 'Focus',
            ano: 2018,
            visualizacoes: 80
        },
        {
            id: 4,
            preco: 45000,
            marca: 'Chevrolet',
            modelo: 'Cruze',
            ano: 2021,
            visualizacoes: 110
        },
        {
            id: 5,
            preco: 60000,
            marca: 'Volkswagen',
            modelo: 'Golf',
            ano: 2020,
            visualizacoes: 130
        },
        {
            id: 6,
            preco: 60000,
            marca: 'Volkswagen',
            modelo: 'Golf',
            ano: 2020,
            visualizacoes: 130
        },
        {
            id: 7,
            preco: 60000,
            marca: 'Volkswagen',
            modelo: 'Golf',
            ano: 2020,
            visualizacoes: 130
        }
    ];

    const [list_cars, setListCars] = useState(false)
    
    const changeViewList = (list: boolean) => {
        setListCars(list)
    }

   

    return (
        <>
            <Box sx={{ padding: '1rem', display: 'flex', justifyContent: 'center' }}>
                <Grid container rowSpacing={2} columnSpacing={2} columns={12} alignItems={'center'} item lg={6}>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'end' }}>
                        <Button onClick={() => changeViewList(true)}>
                            <FormatListBulletedIcon color={list_cars ? 'primary' : 'action'} />
                        </Button>
                        <Button onClick={() => changeViewList(false)}>
                            <GridViewSharpIcon color={!list_cars ? 'primary' : 'action'} />
                        </Button>
                    </Grid>
                    {carros.map((carro) => (
                        <Grid key={carro.id} item xs={list_cars ? 12 : 6} lg={list_cars ? 12 : 6} xl={list_cars ? 12 : 3}>
                            <Car
                                list={list_cars}
                                brand={carro.marca}
                                name={carro.modelo}
                                price={carro.preco}
                                view={carro.visualizacoes}
                                year={carro.ano}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </>
    )

}