import { PixabayHit } from './pixabay-hit.model';

export interface PixabayResult {
  total: number;
  totalHits: number;
  hits: PixabayHit[];
}
