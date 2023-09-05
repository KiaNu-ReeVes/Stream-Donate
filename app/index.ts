import express from "express";
import session from "express-session";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import connection from "./router/mysql";
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const port = parseInt(process.env.PORT || 3000);

const app = express();
import http from "http";
const server = http.createServer(app);
import { Server } from "socket.io";
const io = new Server(server);

export default class Application {
  constructor() {
    this.websiteConfig();
  }

  private websiteConfig(): void {
    app.use(express.static(__dirname + "/public"));
    app.set("view engine", "ejs");
    app.set("views", path.join(__dirname, "views"));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.set("trust proxy", 1);
    app.use(cookieParser("87H49CBh0E"));
    app.use(
      session({
        secret: "abcdefg",
        resave: true,
        saveUninitialized: false,
      })
    );
    var sio = {};
    const hadaf = {
      ["KiaN"]: {
        name: "سلام",
        now: 582987,
        goal: 1000000,
      },
    };

    app.get("/overlay/:user/hadaf", (req, res) => {
      const goalconfig = hadaf[req.params.user];
      console.log(goalconfig);
      console.log(io.sockets.emit());
      res.render("overlays/hadaf", {
        name: process.env.PN,
        title: goalconfig.name,
        progbar: parseInt((goalconfig.now / goalconfig.goal) * 100),
        minmoney: goalconfig.now,
        maxmoney: goalconfig.goal,
      });
    });

    io.on("connection", (socket) => {
      console.log("A user connected " + socket.id);
      socket.on("disconnect", () => {
        console.log("User disconnected");
      });
    });

    server.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  }
}
