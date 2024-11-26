import { AxiosResponse } from "axios"
import apiClient from "./client"
import { GetEstimateRideBody, GetEstimateRideResponse } from "./types/EstimateTypes"
import { ConfirmRideBody } from "./types/ConfirmRideTypes"
import { GetCustomerRidesParams, GetCustomerRidesResponse } from "./types/CostumerRides"
import { ErrorHandler } from "./types/ErrorHandler"

export const getEstimateRide = async (data: GetEstimateRideBody) => {
    try {
        const response: AxiosResponse<GetEstimateRideResponse> = await apiClient.post(
            "/ride/estimate",
            data
        )
        return response.data
    } catch (error: ErrorHandler | any) {
        if (error.response && error.response.data) {
            const { error_code, error_description } = error.response.data
            throw {
                error_code: error_code || "UNKNOWN_ERROR",
                error_description: error_description || "Erro desconhecido. Tente novamente mais tarde.",
            }
        }
    }
}


export const confirmRide = async (data: ConfirmRideBody) => {
    try {
        const response = await apiClient.patch(
            "/ride/confirm",
            data
        )
        return response.data
    } catch (error: ErrorHandler | any) {
        if (error.response && error.response.data) {
            const { error_code, error_description } = error.response.data
            throw {
                error_code: error_code || "UNKNOWN_ERROR",
                error_description: error_description || "Erro desconhecido. Tente novamente mais tarde.",
            }
        }
    }
}

export const getCustomerRides = async (params: GetCustomerRidesParams) => {
    try {
        const response: AxiosResponse<GetCustomerRidesResponse> = await apiClient.get(`/ride/${params.customer_id}`, {
            params: {
                driver_id: params.driver_id
            }
        })
        return response.data
    } catch (error: ErrorHandler | any) {
        if (error.response && error.response.data) {
            const { error_code, error_description } = error.response.data
            throw {
                error_code: error_code || "UNKNOWN_ERROR",
                error_description: error_description || "Erro desconhecido. Tente novamente mais tarde.",
            }
        }
    }
}