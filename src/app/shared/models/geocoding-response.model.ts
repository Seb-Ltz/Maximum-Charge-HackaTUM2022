export interface GeocodingResponseModel {
  query: string[];
  features: GeocodingFeatureModel[];
}

export interface GeocodingFeatureModel {
  id: string;
  type: string;
  place_type: string[];
  relevance: number;
  properties: Record<string, any>;
  text: string;
  place_name: string;
  center: number[];
  geometry: {
    type: string;
    coordinates: number[];
  };
  attribution?: string;
  context: Record<string, any>;
}
