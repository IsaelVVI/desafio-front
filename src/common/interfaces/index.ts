

export interface ICar {
    list?: boolean,
    id: number,
    brand: string,
    model: string,
    year: number,
    price: number
    color: string,
    mileage: number,
    view: number,
    plate: string,
    city: string,
    created: string,
    photos?: IPhotos[]
}

export interface IPhotos {
    car_id: number,
    photo_url: string
}