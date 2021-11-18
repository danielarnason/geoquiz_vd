interface fastfoodProperties {
    name: string;
}

interface fastfoodGeometry {
    type: string;
    coordinates: number[];
}

export interface fastfoodFeature {
    type: string;
    properties: fastfoodProperties;
    geometry: fastfoodGeometry;
}