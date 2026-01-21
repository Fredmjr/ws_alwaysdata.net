//alwaysdata.net service websocket
import { WebSocketServer } from "ws";
import dotenv from "dotenv";

dotenv.config();
const ws_port = 8301;
console.log(ws_port);
const server = new WebSocketServer({
  port: ws_port,
  host: "::", // This is the 'bind to ::' part from alwaysdata docs
});
const clients = new Set();

server.on("connection", (ws) => {
  clients.add(ws);
  console.log("connected: " + clients.size);

  console.log(
    `Server is running on services-jetstorrent.alwaysdata.net:${ws_port}`,
  );

  ws.on("message", (message) => {
    for (const client of clients) {
      if (client !== ws && client.readyState === client.OPEN) {
        //res'
        if (clients.size === 3) {
          console.log("server kill 3rd participant!");
          //kill code logic here
        } else {
          client.send(
            JSON.stringify({ type: "chat", msg: message.toString() }),
          );
        }
      }
    }
  });

  ws.on("close", () => {
    clients.delete(ws);
    console.log("closed" + clients.size);
  });
  ws.send(JSON.stringify({ type: "system_online", msg: "welcome" }));
});

// error checks
server.on("error", (err) => {
  console.log("CRITICAL SERVER ERROR:", err);
});

process.on("uncaughtException", (err) => {
  console.log("NODEJS EXCEPTION:", err);
});
