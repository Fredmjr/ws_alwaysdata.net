import { WebSocketServer } from "ws";
import dotenv from "dotenv";

dotenv.config();
const ws_port = process.env.WS_SERVER;
const server = new WebSocketServer({
  port: ws_port,
});
const clients = new Set();

server.on("connection", (ws) => {
  clients.add(ws);
  console.log("connected: " + clients.size);

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

/* server.close(); */
/* console.log("server running on port 1");
app.listen(process.env.APP_PORT, () => {
  console.log("Server running on port: " + process.env.APP_PORT);
});
 */
