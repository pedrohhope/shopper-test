export interface GetCustomerRidesParams {
    customer_id: string
    driver_id?: number
}

export interface GetCustomerRidesResponse {
    customer_id: string
    rides: Ride[]
}

export interface Ride {
    id: number
    date: string
    origin: string
    destination: string
    distance: number
    duration: string
    driver: Driver
    value: number
}

export interface Driver {
    id: number
    name: string
}
