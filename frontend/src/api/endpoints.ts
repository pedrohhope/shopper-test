import { AxiosResponse } from "axios"
import apiClient from "./client"
import { GetEstimateRideBody, GetEstimateRideResponse } from "./types/EstimateTypes"
import { ConfirmRideBody } from "./types/ConfirmRideTypes"

export const getEstimateRide = async (data: GetEstimateRideBody) => {
    try {
        const response: AxiosResponse<GetEstimateRideResponse> = await apiClient.post(
            "/ride/estimate",
            data
        )
        return response.data
    } catch (error: any) {
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
    } catch (error: any) {
        if (error.response && error.response.data) {
            const { error_code, error_description } = error.response.data
            throw {
                error_code: error_code || "UNKNOWN_ERROR",
                error_description: error_description || "Erro desconhecido. Tente novamente mais tarde.",
            }
        }
    }
}