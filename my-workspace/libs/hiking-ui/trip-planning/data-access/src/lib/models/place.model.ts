import { Photo } from "./photo.model";
import { PlaceLocation } from "./place-location.model";

export interface Place {
    name: string;
    photos: Photo[];
    place_id: string;
    rating: number;
    geometry: PlaceLocation;
}