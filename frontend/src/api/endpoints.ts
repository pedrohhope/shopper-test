import { AxiosResponse } from "axios"
import apiClient from "./client"
import { GetEstimateRideBody, GetEstimateRideResponse } from "./types/EstimateTypes"

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
        throw {
            error_code: "NETWORK_ERROR",
            error_description: "Não foi possível conectar ao servidor. Verifique sua conexão.",
        }
    }
}
