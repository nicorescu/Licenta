import { Pipe, PipeTransform } from '@angular/core';
import { TripPrivacy } from '../models/trip-privacy.model';

@Pipe({
  name: 'enumToArray',
})
export class EnumToArrayPipe implements PipeTransform {
  transform(value): object {
    return Object.keys(value)
      .filter((e) => !isNaN(+e))
      .map((o) => {
        return { value: +o, name: value[o] };
      });
  }
}
