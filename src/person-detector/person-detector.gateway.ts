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
    origin: [
      `${process.env.CHILD_APP_URL}`, // Origen React App
      `${process.env.ADULT_APP_IP}`, // notebook (adultApp)
    ],
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

  @SubscribeMessage('child:detected')
  handleChildDetected(@ConnectedSocket() client: Socket) {
    console.log(`Se detecto niño en notebook -> Notificando a la mac`);
    this.server.to('mac-app').emit('child:detected');
  }

  @SubscribeMessage('child:gone')
  handleChildGone(@ConnectedSocket() client: Socket) {
    console.log(`Niño se fue de la notebook -> Notificando a la mac`);
    this.server.to('mac-app').emit('child:gone');
  }

  // Metodo para emitir a una room especifica
  notifyRoom(room: string, event: string) {
    console.log(`Emitiendo evento '${event}' a la room '${room}'`);
    this.server.to(room).emit(event);
    return { message: `Evento '${event}' emitido a la room '${room}'` };
  }

  // Mac → Notebook: categoría seleccionada
  @SubscribeMessage('category:selected')
  handleCategorySelected(
    @MessageBody() category: string,
    @ConnectedSocket() client: Socket,
  ) {
    console.log(
      `-> Categoría seleccionada: ${category} → notificando a notebook`,
    );
    this.server.to('notebook-app').emit('category:selected', { category });
  }

  // Mac → Notebook: categoría actualizada (solo si puzzle no activo)
  @SubscribeMessage('category:update')
  handleCategoryUpdate(
    @MessageBody() category: string,
    @ConnectedSocket() client: Socket,
  ) {
    console.log(
      `-> Categoría actualizada: ${category} → notificando a notebook`,
    );
    this.server.to('notebook-app').emit('category:update', { category });
  }

  // Notebook → Mac: puzzle en curso
  @SubscribeMessage('puzzle:active')
  handlePuzzleActive(@ConnectedSocket() client: Socket) {
    console.log(`-> 🧩 Puzzle activo en notebook → notificando a Mac`);
    this.server.to('mac-app').emit('puzzle:active');
  }

  // Notebook → Mac: puzzle completado
  @SubscribeMessage('puzzle:completed')
  handlePuzzleCompleted(@ConnectedSocket() client: Socket) {
    console.log(`-> ✅ Puzzle completado → solicitando categoría actual a Mac`);
    this.server.to('mac-app').emit('puzzle:completed');
  }

  // Mac → Notebook: respuesta con categoría actual
  @SubscribeMessage('category:current')
  handleCategoryCurrent(
    @MessageBody() category: string,
    @ConnectedSocket() client: Socket,
  ) {
    console.log(`-> Categoría actual: ${category} → enviando a notebook`);
    this.server.to('notebook-app').emit('category:current', { category });
  }
}
