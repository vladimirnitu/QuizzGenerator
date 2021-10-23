import { MessageService } from '../services/message.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Logger {
  constructor(private messageService: MessageService) {}

  /** Log a UserService message with the MessageService */
  public log(message: string): void {
    this.messageService.add(`UsersService: ${message}`);
  }
}
