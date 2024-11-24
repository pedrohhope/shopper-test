import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';

interface LatLng {
    latitude: number;
    longitude: number;
}

interface RouteLeg {
    startLocation: {
        latLng: LatLng;
    };
    endLocation: {
        latLng: LatLng;
    };
}

interface Route {
    distanceMeters: number;
    duration: string;
    legs: RouteLeg[];
}

export interface GoogleApiResponse {
    routes: Route[];
}

interface Response {
    distance: number,
    duration: string,
    origin: {
        latitude: number,
        longitude: number,
    },
    destination: {
        latitude: number
        longitude: number,
    },
    routeResponse: GoogleApiResponse
};

@Injectable()
export class GoogleApiService {
    private readonly apiKey: string = process.env.GOOGLE_API_KEY;

    constructor(private readonly httpService: HttpService) { }

    async computeRoutes(origin: string, destination: string, travelMode: string): Promise<Response> {
        const url = `https://routes.googleapis.com/directions/v2:computeRoutes`;

        try {
            const response: AxiosResponse<GoogleApiResponse> = await this.httpService.axiosRef.post(
                url,
                {
                    origin: {
                        address: origin,
                    },
                    destination: {
                        address: destination,
                    },
                    travelMode,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Goog-Api-Key': this.apiKey,
                        'X-Goog-FieldMask': 'routes.distanceMeters,routes.duration,routes.legs.startLocation,routes.legs.endLocation',
                    },
                },
            );

            const route = response.data.routes[0];
            const leg = route.legs[0];

            return {
                distance: route.distanceMeters,
                duration: route.duration,
                origin: {
                    latitude: leg.startLocation.latLng.latitude,
                    longitude: leg.startLocation.latLng.longitude,
                },
                destination: {
                    latitude: leg.endLocation.latLng.latitude,
                    longitude: leg.endLocation.latLng.longitude,
                },
                routeResponse: response.data
            };

        } catch (error) {
            console.error('Erro na resposta da API:', error.response?.data || error.message);
            const message = {
                error_code: "INVALID_REQUEST",
                error_description: "Google API error",
            }
            throw message;
        }
    }

}
