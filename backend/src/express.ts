import express from "express";
import WebSocket ,{ WebSocketServer } from "ws";

const app = express()
const httpServer = app.listen(8080, () => {
    console.log("Listening to port 8080");
})

let count = 0;

const wss = new WebSocketServer({server: httpServer})

wss.on("connection", (socket) => {
    socket.on("error", console.error)

    socket.on("message", (data, isBinary) => {
        wss.clients.forEach((client) => {
            if(client.readyState === WebSocket.OPEN) {
                client.send(data, {binary: isBinary})
            }
        })
    })

    console.log("count is " + (++count))

    socket.send("Hello!, Message From Server Express")
})