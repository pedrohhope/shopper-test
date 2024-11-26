import { Estimate, Option } from "@/api/types/EstimateTypes";
import { createContext, ReactNode, useContext, useState } from "react";

interface RideContextType {
    estimate: Estimate
    onChangeEstimate: (estimate: Estimate) => void
    options: Option[]
    onChangeOptions: (options: Option[]) => void
}

const initialState: RideContextType = {
    estimate: {} as Estimate,
    onChangeEstimate: () => { },
    options: [],
    onChangeOptions: () => { }
};

const RideContextType = createContext<RideContextType>(initialState);

interface RideProviderProps {
    children: ReactNode;
}

export function RideProvider({ children }: RideProviderProps) {
    const [estimate, setEstimate] = useState<Estimate>(initialState.estimate);
    const [options, setOptions] = useState<Option[]>(initialState.options);

    const onChangeEstimate = (estimate: Estimate) => {
        setEstimate(estimate);
    }

    const onChangeOptions = (options: Option[]) => {
        setOptions(options);
    }
    return (
        <RideContextType.Provider value={{ estimate, onChangeEstimate, options, onChangeOptions: onChangeOptions }}>
            {children}
        </RideContextType.Provider>
    );
}

export function useRide() {
    return useContext(RideContextType);
}