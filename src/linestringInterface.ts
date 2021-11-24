interface geometry {
    type: string;
    coordinates: number[];
}

export interface lineString {
    type: string;
    properties: Record<string, never>;
    geometry: geometry;
}