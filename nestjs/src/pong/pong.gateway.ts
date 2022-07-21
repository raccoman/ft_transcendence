import { OnGatewayDisconnect, WebSocketGateway } from '@nestjs/websockets';


@WebSocketGateway({ cors: true, namespace: 'pong' })
export default class PongGateway implements OnGatewayDisconnect {



  handleDisconnect(client: any): any {

  }

}