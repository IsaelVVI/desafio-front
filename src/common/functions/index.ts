import { format } from "date-fns";

export const formatMoney = (number: string) => {
    if (!number) {
        return "R$ 0,00";
    }
    const temp_number: string = number.toString();
    const numero = parseFloat(temp_number).toFixed(2).split(".");
    
    numero[0] = numero[0].split(/(?=(?:...)*$)/).join(".");
    return `R$ ${numero.join(",")}`;
}


export const formatDate = (date: string) => {

    return format(new Date(date), 'dd/MM/yyyy')
}