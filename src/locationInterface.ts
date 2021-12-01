interface locationProperties {
    name: string;
}

interface locationGeometry {
    type: string;
    coordinates: number[];
}

export interface locationFeature {
    type: string;
    properties: locationProperties;
    geometry: locationGeometry;
}