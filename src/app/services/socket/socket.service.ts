import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as socketIo from 'socket.io-client';

const socketUrl = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private clientSocket: socketIo.Socket;

  constructor() {
    this.clientSocket = socketIo.connect(socketUrl);
  }

  listenToServer(connection: string): Observable<any> {
    return new Observable((subscribe) => {
      this.clientSocket.on(connection, (data) => {
        subscribe.next(data);
      })
    });
  }

  emitToServer(connection: string, data: any): void {
    this.clientSocket.emit(connection, data)
  }
}
