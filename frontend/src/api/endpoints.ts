import apiClient from "./client"

export const getEstimateRide = async (
    customer_id: string,
    origin: string,
    destination: string
) => {
    try {
        const response = await apiClient.post(
            "/ride/estimate",
            {
                customer_id,
                origin,
                destination,
            }
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
