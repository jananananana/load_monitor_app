export default class WebSocketClient {   
    static createWebSocketClient() {
        return new WebSocket(`ws://${location.host}`);
    }

    static parseMessage (ev) {
        return JSON.parse(ev.data);
    }
}
