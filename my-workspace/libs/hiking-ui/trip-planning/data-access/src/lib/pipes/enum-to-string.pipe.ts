import { Pipe, PipeTransform } from '@angular/core';
import { TripPrivacy } from '../models/trip-privacy.model';

@Pipe({
  name: 'enumToString',
})
export class EnumToStringPipe implements PipeTransform {
  transform(value): string {
    return value.name.replace(/([A-Z]+[a-z]*)([A-Z])/g, '$1 $2');
  }
}
