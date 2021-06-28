import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { FullConversation } from '@hkworkspace/hiking-ui/trip-planning/data-access';
import { SessionToken } from '@hkworkspace/shared/app-authentication/data-access';
import { TranslocoService } from '@ngneat/transloco';
import { take, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'hk-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss'],
})
export class ChatBoxComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('messagesContainer') messagesContainer: ElementRef;
  @ViewChildren('msg') messagesDiv: QueryList<ElementRef>;

  @Input()
  conversation: FullConversation;
  @Input()
  sessionToken: SessionToken;

  @Input()
  shouldScroll: boolean;

  @Output()
  messageSent = new EventEmitter();

  currentMessage: string;
  activeLang: string;
  alive = true;
  first = true;
  constructor(private translocoService: TranslocoService) {}

  ngOnInit(): void {
    this.activeLang = this.translocoService.getActiveLang();
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

  ngAfterViewInit(): void {
    this.messagesDiv.changes.pipe(takeWhile(() => this.alive)).subscribe(() => {
      const elem = this.messagesContainer.nativeElement;
      elem.scrollTop = elem.scrollHeight;
    });
  }

  isScrolledToBottom(el) {
    return el.offsetHeight + el.scrollTop >= el.scrollHeight;
  }

  sendMessage() {
    if (this.currentMessage) {
      this.messageSent.emit(this.currentMessage);
      this.currentMessage = '';
    }
  }
}
