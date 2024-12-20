import { Estimate, Option } from "@/api/types/EstimateTypes";
import { createContext, ReactNode, useContext, useState } from "react";

interface Ride {
    customer_id: string;
    origin: string;
    destination: string;
    distance: number;
    duration: string;
}
interface RideContextType {
    estimate: Estimate
    onChangeEstimate: (estimate: Estimate) => void
    options: Option[]
    onChangeOptions: (options: Option[]) => void
    ride: Ride
    onChangeRide: (ride: Ride) => void
    onClear: () => void
}

const initialState: RideContextType = {
    estimate: {} as Estimate,
    onChangeEstimate: () => { },
    options: [],
    onChangeOptions: () => { },
    ride: {
        customer_id: "",
        origin: "",
        destination: "",
        distance: 0,
        duration: "",
    },
    onChangeRide: () => { },
    onClear: () => { }
};

const RideContextType = createContext<RideContextType>(initialState);

interface RideProviderProps {
    children: ReactNode;
}

export function RideProvider({ children }: RideProviderProps) {
    const [options, setOptions] = useState<Option[]>(initialState.options);
    const [ride, setRide] = useState<Ride>(initialState.ride);
    const [estimate, setEstimate] = useState<Estimate>(initialState.estimate);
    const onChangeEstimate = (estimate: Estimate) => {
        setEstimate(estimate);
    }

    const onChangeOptions = (options: Option[]) => {
        setOptions(options);
    }
    const onChangeRide = (ride: Ride) => {
        setRide(ride);
    }

    const onClear = () => {
        setRide(initialState.ride);
        setEstimate(initialState.estimate);
        setOptions(initialState.options);
    }

    return (
        <RideContextType.Provider value={{ onChangeRide, options, onChangeOptions: onChangeOptions, ride, onChangeEstimate, estimate, onClear }}>
            {children}
        </RideContextType.Provider>
    );
}

export function useRide() {
    return useContext(RideContextType);
}