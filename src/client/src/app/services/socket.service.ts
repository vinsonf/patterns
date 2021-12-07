import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import {map, shareReplay, tap} from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  public indexes$!: Observable<any>;
  constructor(private socket: Socket) {
  }

  sendMessage(msg: string) {
    this.socket.emit('message', msg);
  }
  getMessage() {
    console.log(this.socket);
    return this.socket.fromEvent('message').pipe(map((data:any) => data));
  }

  emit(event: string, data: any) {
    this.socket.emit(event, data);
  }
  get socketId() {
    return this.socket?.ioSocket.id;
  }

}
