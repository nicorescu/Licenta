import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'png',
})
export class PngPipe implements PipeTransform {
  transform(value: string): string {
    return `data:image/png;base64,${value}`;
  }
}
