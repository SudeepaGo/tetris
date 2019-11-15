class ConnectionManager {
  constructor() {
    this.conn = null;
  }
  connect(address) {
    this.conn = new WebSocket(address);

    this.conn.onopen = () => {
      console.log('Connection established');
      this.conn.send('create-session');
    };
  }
}
