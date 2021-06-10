import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'png',
})
export class PngPipe implements PipeTransform {
  transform(value: string, defaultPath: string): string {
    return value ? `data:image/png;base64,${value}` : defaultPath;
  }
}
