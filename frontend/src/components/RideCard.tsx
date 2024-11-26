import { Ride } from "@/api/types/CostumerRides";
import { formatPrice } from "@/utils/price";
import { formatDuration } from "@/utils/time";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";



const RideCard = (ride: Ride) => {
    const date = new Date(ride.date);
    const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);

    return (
        <div
            key={ride.id}
            className="border border-gray-300 rounded-lg p-5 shadow-lg hover:shadow-xl transition-shadow bg-white"
        >
            <div className="mb-4">
                <h3 className="text-lg font-bold text-gray-800">
                    Corrida #{ride.id}
                </h3>
                <p className="text-sm text-gray-500">
                    {format(
                        localDate,
                        "dd 'de' MMMM 'de' yyyy 'às' HH:mm",
                        { locale: ptBR }
                    )}
                </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <p className="text-sm text-gray-600 font-medium">Motorista</p>
                    <p className="text-base font-semibold text-gray-800">{ride.driver.name}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-600 font-medium">Distância</p>
                    <p className="text-base font-semibold text-gray-800">{(ride.distance / 1000).toFixed(1)} km</p>
                </div>
                <div>
                    <p className="text-sm text-gray-600 font-medium">Origem</p>
                    <p className="text-base text-gray-800">{ride.origin}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-600 font-medium">Destino</p>
                    <p className="text-base text-gray-800">{ride.destination}</p>
                </div>
            </div>

            <div className="flex justify-between items-center border-t pt-4 mt-4 text-gray-800">
                <div>
                    <p className="text-sm text-gray-600 font-medium">Duração</p>
                    <p className="text-base font-semibold">{formatDuration(parseInt(ride.duration))}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-600 font-medium">Valor</p>
                    <p className="text-base font-semibold text-green-600">{formatPrice(ride.value)}</p>
                </div>
            </div>
        </div>
    );
};

export default RideCard;
