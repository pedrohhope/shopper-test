import { Review } from "@/api/types/EstimateTypes";
import { formatPrice } from "@/utils/price";
import { Button } from "./ui/button";

interface DriverCardProps {
    id: number;
    name: string;
    description: string;
    vehicle: string;
    review: Review;
    value: number;
    onSelect: (id: number) => void;
    hasSelected: boolean;
}

const DriverCard = ({ id, name, description, vehicle, review, value, onSelect, hasSelected }: DriverCardProps) => {
    const rating = Number(review.rating);

    return (
        <div key={id} className="w-full bg-white shadow-lg rounded-xl border border-gray-200 overflow-hidden flex flex-col">
            <div className="p-6 flex flex-col space-y-4">
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <p className="text-lg font-semibold text-gray-800">{name}</p>
                        <p className="text-lg font-medium text-gray-600">{formatPrice(value)}</p>
                    </div>
                    <p className="text-sm text-gray-500">{vehicle}</p>
                </div>
                <p className="text-sm text-gray-600">{description}</p>
                <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Rating:</span>
                    <div className="flex items-center">
                        {Array.from({ length: 5 }, (_, index) => (
                            <svg
                                key={index}
                                xmlns="http://www.w3.org/2000/svg"
                                fill={index < rating ? "currentColor" : "none"}
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="w-5 h-5 text-yellow-500"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 17.25l-6.416 3.374 1.224-7.1L1 7.656l7.112-1.034L12 1l3.888 5.566L23 7.656l-5.808 5.863 1.224 7.1z"
                                />
                            </svg>
                        ))}
                    </div>
                </div>
                <p className="text-sm text-gray-600 italic">"{review.comment}"</p>

                {hasSelected && (
                    <div className="flex justify-end">
                        <Button onClick={() => onSelect(id)} className="w-full">
                            Escolher
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DriverCard;
