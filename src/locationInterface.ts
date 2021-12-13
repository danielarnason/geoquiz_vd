interface locationProperties {
    featureId?: string;
    layerId?: string;
    title?: string;
    description?: string;
    latitude?: string;
    longitude?: string;
    name?: string;
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