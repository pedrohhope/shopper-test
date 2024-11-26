interface MapProps {
    pointA: {
        latitude: number;
        longitude: number;
    };
    pointB: {
        latitude: number;
        longitude: number;
    };
}

const Map = ({ pointA, pointB }: MapProps) => {
    const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

    const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?size=600x300&markers=color:red%7Clabel:A%7C${pointA.latitude},${pointA.longitude}&markers=color:blue%7Clabel:B%7C${pointB.latitude},${pointB.longitude}&path=weight:3%7Ccolor:0x0000ff%7C${pointA.latitude},${pointA.longitude}%7C${pointB.latitude},${pointB.longitude}&key=${apiKey}`;

    return <img src={mapUrl} alt="Mapa com marcadores e rota" />
};

export default Map;
