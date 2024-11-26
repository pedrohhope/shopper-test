import { Estimate, Option } from "@/api/types/EstimateTypes";
import { createContext, ReactNode, useContext, useState } from "react";

interface RideContextType {
    estimate: Estimate
    onChangeEstimate: (estimate: Estimate) => void
    drivers: Option[]
    onChangeDrivers: (drivers: Option[]) => void
}

const initialState: RideContextType = {
    estimate: {} as Estimate,
    onChangeEstimate: () => { },
    drivers: [],
    onChangeDrivers: () => { }
};

const RideContextType = createContext<RideContextType>(initialState);

interface RideProviderProps {
    children: ReactNode;
}

export function RideProvider({ children }: RideProviderProps) {
    const [estimate, setEstimate] = useState<Estimate>(initialState.estimate);
    const [drivers, setDrivers] = useState<Option[]>(initialState.drivers);

    const onChangeEstimate = (estimate: Estimate) => {
        setEstimate(estimate);
    }

    const onChangeDrivers = (drivers: Option[]) => {
        setDrivers(drivers);
    }
    return (
        <RideContextType.Provider value={{ estimate, onChangeEstimate, drivers, onChangeDrivers }}>
            {children}
        </RideContextType.Provider>
    );
}

export function useRide() {
    return useContext(RideContextType);
}