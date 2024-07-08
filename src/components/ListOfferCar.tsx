import { Box, Button, Grid } from "@mui/material"
import { Car } from "./Car"
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import GridViewSharpIcon from '@mui/icons-material/GridViewSharp';
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { ICar } from "../common/interfaces";
export const ListOfferCar = () => {

  useEffect(() => {
    async function getOffers() {
      await getAllCars()
    }

    getOffers()
  }, [])

  const [list_cars, setListCars] = useState(false)

  const changeViewList = (list: boolean) => {
    setListCars(list)
  }


  const [cars, setCars] = useState<ICar[]>([])
  const getAllCars = async () => {
    try {
      const { data } = await axios.get("http://127.0.0.1:3003/cars")
      setCars(data)
    } catch (error) {
      toast.error("Erro ao carregar ofertas")
      console.log("erro ao pegar ofertas", error);

    }
  }


  return (
    <>
      <Box sx={{ padding: '1rem', display: 'flex', justifyContent: 'center' }}>
        <Grid container columns={12} alignItems={'center'} item lg={6} rowSpacing={list_cars ? 2 : 0} columnSpacing={list_cars ? 0 : 1}>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'end' }}>
            <Button onClick={() => changeViewList(true)}>
              <FormatListBulletedIcon color={list_cars ? 'primary' : 'action'} />
            </Button>
            <Button onClick={() => changeViewList(false)}>
              <GridViewSharpIcon color={!list_cars ? 'primary' : 'action'} />
            </Button>
          </Grid>
          {cars.map((car) => (
            <Grid key={car.id} item xs={list_cars ? 12 : 6} lg={list_cars ? 12 : 6} xl={list_cars ? 12 : 3}>
              <Car
                car={car}
                list={list_cars}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  )

}