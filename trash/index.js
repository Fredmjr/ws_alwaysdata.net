import { WebSocketServer } from "ws";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();
app.use(express.json());

//server

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.join(__filename);
app.set("view engine", "hbs");
app.set("/views", path.join(__dirname, "views", "components"));
app.get("/", (req, res) => {
  res.render("index");
});

app.use(express.static("public"));
app.listen(process.env.APP_PORT, () => {
  console.log("application running: " + process.env.APP_PORT);
});
