import WebSocket, { WebSocketServer } from "ws";
import http from 'http';

const server = http.createServer(function (req: any, res: any) {
    console.log(`${new Date()} Received request for ${req.url}`)
    res.end("hi there");
});
let count = 0;

const wss = new WebSocketServer({ server });

wss.on("connection", function connection(socket) {

    socket.on("error", console.error);

    socket.on("message", function message(data, isBinary) {
        wss.clients.forEach(function each(client) {
            if(client.readyState === WebSocket.OPEN) {
                client.send(data, {binary: isBinary});
            }
        })
    })

    console.log(++count);
    socket.send("Hello! Message From Server!");
});

server.listen(8080, () => {
    console.log(`${new Date()} Server is listening on port 8080`);
});
