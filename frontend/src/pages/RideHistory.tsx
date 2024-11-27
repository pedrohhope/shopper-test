import { getCustomerRides } from "@/api/endpoints"
import { GetCustomerRidesParams, Ride } from "@/api/types/CostumerRides"
import { ErrorHandler } from "@/api/types/ErrorHandler"
import Container from "@/components/Container"
import RideCard from "@/components/RideCard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRide } from "@/contexts/RideContext"
import { toast } from "@/hooks/use-toast"
import { useMutation } from "@tanstack/react-query"
import { List, Search } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const RideHistory = () => {
    const [params, setParams] = useState<GetCustomerRidesParams>({
        customer_id: '',
        driver_id: undefined,
    })

    const { options, onClear } = useRide()
    const navigate = useNavigate()
    const [rides, setRides] = useState<Ride[]>([])

    const { mutate, isPending } = useMutation({
        mutationFn: async () => {
            const response = await getCustomerRides(params)
            return response
        },
        onSuccess: (data) => {
            if (!data?.rides) return;
            setRides(data.rides)
        },
        onError: (error: ErrorHandler) => {
            console.log(error)
            const errorMessage = error.error_description || "Erro inesperado. Tente novamente mais tarde."
            toast({
                title: "Erro",
                description: errorMessage,
                variant: "destructive",
            })
        }
    })

    const onChangeCustomerId = (e: React.ChangeEvent<HTMLInputElement>) => {
        setParams({
            ...params,
            customer_id: e.target.value,
        })
    }

    const onSelectDriver = (value: string) => {
        setParams({
            ...params,
            driver_id: value === 'all' ? undefined : Number(value),
        })
    }

    const hangleBackRequestForm = () => {
        navigate('/')
        onClear()
    }

    const searchRides = () => {
        mutate()
    }

    return (
        <Container>
            <Card className="shadow-lg rounded-lg border border-gray-200 flex flex-col">
                <CardHeader className="flex justify-between w-full flex-row">
                    <div className="flex flex-col gap-3">
                        <CardTitle className="flex items-center gap-2 text-xl font-semibold text-gray-800">
                            <List size={24} />
                            Histórico de viagens
                        </CardTitle>
                        <CardDescription className="text-gray-600">
                            Lista de viagens realizadas
                        </CardDescription>
                    </div>
                    <div>
                        <Button
                            size="sm"
                            onClick={hangleBackRequestForm}
                        >
                            Solicitar nova viagem
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col md:flex-row gap-3 mb-5">
                        <div className="flex w-full gap-3">
                            <Input
                                placeholder="Buscar por ID de usuário"
                                className="w-full"
                                onChange={onChangeCustomerId}
                            />
                            <Select onValueChange={onSelectDriver}>
                                <SelectTrigger className="md:w-[300px]">
                                    <SelectValue placeholder="Selecione um motorista" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Todos</SelectItem>
                                    {options.map((option) => (
                                        <SelectItem key={option.id} value={option.id.toString()}>
                                            {option.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <Button size="xl" onClick={searchRides} disabled={isPending}>
                            <Search /> {isPending ? "Buscando..." : "Buscar viagens"}
                        </Button>
                    </div>
                    <ScrollArea className="rounded-md overflow-auto bg-white">
                        <div className="max-h-[500px] p-4 space-y-4">
                            {rides.length ? (
                                rides.map((ride) => (
                                    <RideCard key={ride.id} {...ride} />
                                ))
                            ) : (
                                <div className="flex items-center justify-center h-[200px] flex-col">
                                    <Search size={64} />
                                    <p className="text-gray-500">
                                        Busque por uma viagem com os filtros acima
                                    </p>
                                </div>
                            )}
                        </div>
                    </ScrollArea>

                </CardContent>
            </Card>
        </Container>
    )
}

export default RideHistory
