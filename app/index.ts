import express from "express";
import session from "express-session";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const port = parseInt(process.env.PORT || 3000);

const app = express();
import http from "http";
const server = http.createServer(app);
import { Server } from "socket.io";
const io = new Server(server);
import connection from "./router/mysql";

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
    app.use("/auth", require("./router/auth"));

    app.get("/dashboard", (req, res) => {
      connection.query(
        "SELECT * FROM users WHERE email = ?",
        ["kian.rabiei1387@gmail.com"],
        function (err, ress) {
          return res.render("./dashboard/index", {
            name: process.env.PN,
            userInfo: ress[0],
          });
        }
      );
    });

    app.get("/dashboard/tools", (req, res) => {
      connection.query(
        "SELECT * FROM users WHERE email = ?",
        ["kian.rabiei1387@gmail.com"],
        function (err, ress) {
          return res.render("./dashboard/tools", {
            name: process.env.PN,
            userInfo: ress[0],
          });
        }
      );
    });

    app.get("/overlay/goal", (req, res) => {
      const goallink = req.query.link;
      connection.query(
        "SELECT * FROM users WHERE goallink = ?",
        [goallink],
        function (err, ress) {
          if (!ress[0]) return res.redirect("/");
          if (err) {
            console.error(err);
            return;
          }
          const goalconfig = ress[0];
          const progbarsdas =
            (goalconfig.goalmoney / goalconfig.goalmaxmoney) * 100;
          return res.render("overlays/goal", {
            name: process.env.PN,
            goallink: goallink,
            title: goalconfig.goaltitle,
            progbar: Math.trunc(progbarsdas),
            minmoney: goalconfig.goalmoney,
            maxmoney: goalconfig.goalmaxmoney,
          });
        }
      );
    });

    app.get("/overlay/alert", (req, res) => {
      const alertlink = req.query.link;
      connection.query(
        "SELECT * FROM users WHERE alertlink = ?",
        [alertlink],
        function (err, ress) {
          if (!ress[0]) return res.redirect("/");
          if (err) {
            console.error(err);
            return;
          }
          const alertconfig = ress[0];
          return res.render("overlays/alert", {
            name: process.env.PN,
            alertlink: alertlink,
          });
        }
      );
    });

    io.on("connection", (socket) => {
      console.log("A user connected " + socket.id);
      socket.on("disconnect", () => {
        console.log("User disconnected");
      });
    });

    app.get("/:link", (req, res) => {
      const link = req.params.link;
      connection.query(
        "SELECT * FROM users WHERE link = ?",
        [link],
        function (err, ress) {
          if (!ress[0]) return res.redirect("/");
          return res.render("donate", {
            name: process.env.PN,
            streamer: ress[0].username,
          });
        }
      );
    });

    app.post("/donate/:streamer", (req, res) => {
      const streamer = req.params.streamer;
      connection.query(
        "SELECT * FROM users WHERE username = ?",
        [streamer],
        function (err, ress) {
          if (err) {
            console.error(err);
            return;
          }
          // تبدیل نتیجه به شکل مورد نیاز
          const goalconfig = ress[0];
          const money = parseInt(req.body.money);
          connection.query(
            `INSERT INTO donates (streamer, donator, price, descs) VALUES (?,?,?,?)`,
            [streamer, req.body.donator, money, req.body.descs],
            function (err) {
              console.log(err);
            }
          );
          connection.query(
            `UPDATE users SET goalmoney = '${
              money + parseInt(goalconfig.goalmoney)
            }' WHERE username = '${streamer}'`
          );
          connection.query(
            "SELECT * FROM users WHERE username = ?",
            [streamer],
            function (err, ress2) {
              if (!ress2[0]) return res.redirect("/");
              io.sockets.emit("goal-" + ress2[0].goallink, money);
              io.sockets.emit("alert-" + ress2[0].alertlink, {
                donator: req.body.donator,
                desc: req.body.descs,
                money: money,
              });
            }
          );
          return res.send("<h1>Done</h1>");
        }
      );
    });

    server.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  }
}
