export interface GetEstimateRideBody {
    customer_id: string,
    origin: string,
    destination: string
}

export interface GetEstimateRideResponse {
    estimate: Estimate
    options: Option[]
}

export interface Estimate {
    distance: number
    duration: string
    origin: Origin
    destination: Destination
    routeResponse: RouteResponse
}

export interface Origin {
    latitude: number
    longitude: number
}

export interface Destination {
    latitude: number
    longitude: number
}

export interface RouteResponse {
    routes: Route[]
}

export interface Route {
    legs: Leg[]
    distanceMeters: number
    duration: string
}

export interface Leg {
    startLocation: StartLocation
    endLocation: EndLocation
}

export interface StartLocation {
    latLng: LatLng
}

export interface LatLng {
    latitude: number
    longitude: number
}

export interface EndLocation {
    latLng: LatLng2
}

export interface LatLng2 {
    latitude: number
    longitude: number
}

export interface Option {
    id: number
    name: string
    description: string
    vehicle: string
    review: Review
    value: number
}

export interface Review {
    rating: string
    comment: string
}
