import { getEstimateRide } from "@/api/endpoints"
import Container from "@/components/container"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
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
import { toast } from "@/hooks/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { MapPinned } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
    customer_id: z.string().min(1, {
        message: "Por favor, informe seu id",
    }),
    destinations: z.object({
        origin: z.string().min(1, {
            message: "Por favor, digite um endereço de origem",
        }),
        destination: z.string().min(1, {
            message: "Por favor, digite um endereço de destino",
        }),
    })
})

const RideRequestForm = () => {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            customer_id: "",
            destinations: {
                origin: "",
                destination: ""
            }
        }
    })

    const mutation = useMutation({
        mutationFn: async (data: z.infer<typeof formSchema>) => {
            return await getEstimateRide(
                data.customer_id,
                data.destinations.origin,
                data.destinations.destination
            )
        },
        onSuccess: (data) => {
            console.log("Resposta da API:", data)
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
                                    name="destinations.origin"
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
                                    name="destinations.destination"
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
