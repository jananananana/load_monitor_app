"use strict";

const express = require("express"),
    WebSocket = require("ws"),
    http = require("http"),
    path = require("path"),
    os = require('os'),
    SERVER_PORT = 3000,
    DIST_DIR = "dist",
    MIN_INTERVAL = 600000,
    HTML_FILE = path.relative(DIST_DIR, "/index.html");

const app = express();
const server = http.createServer(app);
const websocketServer = new WebSocket.Server({ server });

app.use(express.static(DIST_DIR));

const getDatum = () => ({
        ts: Date.now(),
        value: (os.loadavg()[0] / os.cpus().length)
});

const newDatum = () => JSON.stringify(getDatum());

websocketServer.on("connection", (wsc) => {
    setImmediate(() => wsc.send(newDatum()));
    const loadInterval = setInterval(
        () => wsc.send(newDatum()),
        10000
    );

    wsc.on('close', () => {
        clearInterval(loadInterval);
        wsc.close();
    });
});

app.get("/", (_req, res) => res.sendFile(HTML_FILE));

server.listen(SERVER_PORT, () =>
    console.log(`Server connected on port ${SERVER_PORT}`)
);