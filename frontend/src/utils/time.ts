
export function formatDuration(seconds: number) {
    if (seconds >= 3600) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.round((seconds % 3600) / 60);
        return `${hours}h ${minutes > 0 ? `${minutes}m` : ""}`;
    } else {
        const minutes = Math.ceil(seconds / 60);
        return `${minutes} min`;
    }
}


