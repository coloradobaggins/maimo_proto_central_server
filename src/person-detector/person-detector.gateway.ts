import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000', // Origen React App
  },
})
export class PersonDetectorGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  // Cliente conectado
  handleConnection(client: Socket) {
    console.log(`Cliente conectado: ${client.id}`);
  }

  // Cliente desconectado
  handleDisconnect(client: Socket) {
    console.log(`Cliente desconectado: ${client.id}`);
  }

  // Cliente solicita unirse a una room
  @SubscribeMessage('join')
  handleJoin(
    @MessageBody() roomName: string,
    @ConnectedSocket() client: Socket,
  ) {
    client.join(roomName);
    console.log(`Cliente ${client.id} se unió a la room: ${roomName}`);
  }
}
