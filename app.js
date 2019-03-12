(() => {
    const logMessage = (message) => console.log(message);
    let ws;

    if (ws) {
        ws.onerror = ws.onopen = ws.onclose = null;
        ws.close();
    }

    ws = new WebSocket(`ws://${location.host}`);
    ws.onopen = () => logMessage("WebSocket connection established");
    ws.onmessage = (ev) => logMessage(ev.data);
    ws.onerror = (ev) => logMessage(ev);
    ws.onclose = () => logMessage("WebSocket connection closed");
})();