
function createWebSocketClient() {
    return new WebSocket(`ws://${location.host}`);
}

function parseMessage (ev) {
    return JSON.parse(ev.data);
}

export { createWebSocketClient, parseMessage };
