"use strict";

const express = require("express"),
    WebSocket = require("ws"),
    http = require("http"),
    path = require("path"),
    os = require('os'),
    SERVER_PORT = 3000,
    DIST_DIR = "dist",
    HTML_FILE = path.relative(DIST_DIR, "/index.html");

const app = express();
const server = http.createServer(app);
const websocketServer = new WebSocket.Server({ server });

app.use(express.static(DIST_DIR));

websocketServer.on("connection", (wsc) => {
    const loadInterval = setInterval(
        () => {
            const cpus = os.cpus().length;
            const avg = os.loadavg()[0]/cpus 
            wsc.send(JSON.stringify({
                time: Date.now(),
                value: avg
            }));
        },
        10000
    );

    websocketServer.on('close', function() {
        clearInterval(loadInterval);
    });
});

app.get("/", (_req, res) => res.sendFile(HTML_FILE));

server.listen(SERVER_PORT, () =>
    console.log(`Server connected on port ${SERVER_PORT}`)
);