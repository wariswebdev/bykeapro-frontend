export interface Poi {
  id: number | string;
  name_clean: string;
  category: string;
  latitude: number;
  longitude: number;
  alternative_names?: string;
}
