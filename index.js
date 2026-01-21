import { WebSocketServer } from "ws";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();
app.use(express.json());

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

//server

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.join(__filename);
app.set("view engine", "hbs");
app.set("/views", path.join(__dirname, "views", "components"));
app.get("/", (req, res) => {
  res.render("index");
});

/* server.close(); */
/* console.log("server running on port 1"); */
app.listen(process.env.APP_PORT, () => {
  console.log("application running: " + process.env.APP_PORT);
});
