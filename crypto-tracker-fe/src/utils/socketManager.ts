// socketManager.ts
import io, { Socket } from 'socket.io-client';

class SocketManager {
  private socket: Socket | null = null;

  connect(url: string) {
    this.socket = io(url);
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  getSocket() {
    return this.socket;
  }

  // Add methods to handle socket events and updates
}

const socketManager = new SocketManager();
export default socketManager;
