import { getEstimateRide } from "@/api/endpoints"
import { GetEstimateRideBody } from "@/api/types/EstimateTypes"
import Container from "@/components/container"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRide } from "@/contexts/RideContext"
import { toast } from "@/hooks/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { MapPinned } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema: z.ZodType<GetEstimateRideBody> = z.object({
    customer_id: z.string().min(1, {
        message: "Por favor, informe seu id",
    }),
    origin: z.string().min(1, {
        message: "Por favor, digite um endereço de origem",
    }),
    destination: z.string().min(1, {
        message: "Por favor, digite um endereço de destino",
    }),
})

const RideRequestForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            customer_id: "",
            origin: "",
            destination: ""
        }
    })
    const {
        onChangeOptions,
        onChangeEstimate
    } = useRide();

    const mutation = useMutation({
        mutationFn: async (data: z.infer<typeof formSchema>) => {
            return await getEstimateRide(data)
        },
        onSuccess: (data) => {
            const { estimate, options } = data
            onChangeEstimate(estimate)
            onChangeOptions(options)
        },
        onError: (error: any) => {
            const errorMessage = error?.error_description || "Erro inesperado. Tente novamente mais tarde."
            toast({
                title: "Erro",
                description: errorMessage,
                variant: "destructive",
            })
        },
    })

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        mutation.mutate(data)
    }

    return (
        <Container>
            <Card>
                <CardHeader>
                    <CardTitle className="flex gap-2"><MapPinned /> Solicite sua viagem</CardTitle>
                    <CardDescription>Você deve preencher todos os campos para solicitar uma viagem</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="customer_id"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Informe seu id</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Ex: 12345" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="origin"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Endereço de origem</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Ex: Av Paulista, 123" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="destination"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Endereço de destino</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Ex: Av Santa Cruz, 456" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                            </div>

                            <div className="flex justify-end">
                                <Button type="submit" disabled={mutation.isPending}>
                                    {mutation.isPending ? "Buscando..." : "Buscar viagens"}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </Container>
    )
}

export default RideRequestForm
