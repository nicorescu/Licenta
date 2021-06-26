import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'conversation'
})
export class ConversationPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
