import { confirmRide } from "@/api/endpoints"
import { ConfirmRideBody } from "@/api/types/ConfirmRideTypes"
import { ErrorHandler } from "@/api/types/ErrorHandler"
import Container from "@/components/Container"
import DriverCard, { SelectedDriver } from "@/components/DriverCard"
import Map from "@/components/Map"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useRide } from "@/contexts/RideContext"
import { toast } from "@/hooks/use-toast"
import { useMutation } from "@tanstack/react-query"
import { CarFront, ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"

const RideOptions = () => {
    const {
        estimate,
        options,
        ride,
        onClear
    } = useRide()

    const navigate = useNavigate()


    const mutation = useMutation({
        mutationFn: async (data: ConfirmRideBody) => {
            return await confirmRide(data)
        },
        onSuccess: () => {
            toast({
                title: "Sucesso!",
                description: "Viagem confirmada com sucesso!",
                variant: "default",
            })
            navigate("/history")
            onClear()
        },
        onError: (error: ErrorHandler) => {
            const errorMessage = error.error_description || "Erro inesperado. Tente novamente mais tarde."
            toast({
                title: "Erro",
                description: errorMessage,
                variant: "destructive",
            })
        },
    })


    const handleGoBack = () => {
        navigate(-1)
    }

    const onSelectDriver = ({
        id,
        name,
        value,
    }: SelectedDriver) => {
        const data: ConfirmRideBody = {
            customer_id: ride.customer_id,
            destination: ride.destination,
            distance: ride.distance,
            driver: {
                id,
                name
            },
            duration: ride.duration,
            origin: ride.origin,
            value,
        }
        mutation.mutate(data)
    }

    return (
        <Container>
            <Card className="shadow-lg rounded-lg border border-gray-200 flex flex-col">
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <button onClick={handleGoBack} className="p-2 rounded-full hover:bg-gray-200">
                            <ArrowLeft size={24} className="text-gray-800" />
                        </button>
                        <div>
                            <CardTitle className="flex items-center gap-2 text-xl font-semibold text-gray-800">
                                <CarFront size={24} />
                                Opções de viagem
                            </CardTitle>
                            <CardDescription className="text-gray-600">Selecione o motorista ideal para sua viagem</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="flex flex-col space-y-3">
                    <div className="w-full rounded-lg overflow-hidden flex justify-center">
                        <Map
                            pointA={estimate.origin}
                            pointB={estimate.destination}
                        />
                    </div>

                    {options.length ? <ScrollArea className="rounded-md overflow-auto" >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[400px]">
                            {options.map((option) => (
                                <DriverCard key={option.id} {...option} onSelect={onSelectDriver} hasSelected disabled={mutation.isPending} />
                            ))}
                        </div>
                    </ScrollArea> :
                        <div className="flex flex-col items-center justify-center space-y-2">
                            <p className="text-gray-600">Nenhum motorista disponível para essa distância</p>
                        </div>}
                </CardContent>
            </Card>
        </Container>
    )
}

export default RideOptions
