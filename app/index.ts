import express from "express";
import session from "express-session";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import moment from "moment";
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

    function makeid(length) {
      let result = "";
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const charactersLength = characters.length;
      let counter = 0;
      while (counter < length) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
        counter += 1;
      }
      return result;
    }

    app.use("/auth", require("./router/auth"));

    function checkuser(req) {
      return new Promise((resolve, reject) => {
        const token = req.cookies.token;
        try {
          // اینجا می‌توانید جواب توکن را بررسی کنید و در صورت معتبر بودن ادامه دهید
          const verified = jwt.verify(token, "secretsystemverygood");

          connection.query(
            "SELECT * FROM users WHERE email = ?;",
            [verified.email],
            function (err, res2) {
              if (err) {
                reject(err);
              } else {
                resolve(res2[0]);
              }
            }
          );
        } catch (err) {
          reject(err);
        }
      });
    }

    app.get("/dashboard", async (req, res) => {
      try {
        const userinfo = await checkuser(req);
        return res.render("./dashboard/index", {
          name: process.env.PN,
          userInfo: userinfo,
        });
      } catch (err) {
        console.error(err);
        return res.redirect("/auth/login");
      }
    });

    app.get("/dashboard/tools", async (req, res) => {
      try {
        const userinfo = await checkuser(req);
        return res.render("./dashboard/tools", {
          name: process.env.PN,
          userInfo: userinfo,
        });
      } catch (err) {
        console.error(err);
        return res.redirect("/auth/login");
      }
    });

    app.get("/dashboard/tools/alert", async (req, res) => {
      try {
        const userinfo = await checkuser(req);
        return res.render("./dashboard/tools/alert", {
          name: process.env.PN,
          userInfo: userinfo,
        });
      } catch (err) {
        console.error(err);
        return res.redirect("/auth/login");
      }
    });
    app.get("/dashboard/tools/donate", async (req, res) => {
      try {
        const userinfo = await checkuser(req);
        return res.render("./dashboard/tools/donate", {
          name: process.env.PN,
          userInfo: userinfo,
        });
      } catch (err) {
        console.error(err);
        return res.redirect("/auth/login");
      }
    });
    app.post("/dashboard/tools/donate", async (req, res) => {
      const postinfo = req.body;
      try {
        const userinfo = await checkuser(req);
        connection.query(
          `UPDATE users SET goaltitle = ?, goalmoney = ?, goalmaxmoney = ?  WHERE username = '${userinfo.username}'`,
          [postinfo.goaltitle, postinfo.goalmoney, postinfo.goalmaxmoney],
          function (err) {
            if (err) return res.json({ success: false });
            io.sockets.emit("newgoal-" + userinfo.goallink, postinfo);
          }
        );
        return res.json({ success: true });
      } catch (err) {
        console.error(err);
        return res.redirect("/auth/login");
      }
    });

    app.post("/dashboard/tools/revokeurl", async (req, res) => {
      const postinfo = req.body;
      try {
        const userinfo = await checkuser(req);
          var randomletter = makeid(50);
          connection.query(
            `UPDATE users SET ${postinfo.type} = ?  WHERE ${postinfo.type} = ?`,
            [randomletter, postinfo.link],
            function (err) {
              if (err) return res.json({ success: false });
            }
          );
          return res.json({ success: true, randomletter: randomletter });
        } catch (err) {
          console.error(err);
          return res.redirect("/auth/login");
        }
    });

    app.get("/dashboard/donates", async (req, res) => {
      try {
        const userinfo = await checkuser(req);
          connection.query(
            "SELECT * FROM donates WHERE streamer = ? ORDER BY id DESC;",
            [userinfo.username],
            function (err, res2s) {
              return res.render("./dashboard/donates", {
                name: process.env.PN,
                userInfo: userinfo,
                donates: res2s,
                moment: moment,
              });
            }
          );
        } catch (err) {
          console.error(err);
          return res.redirect("/auth/login");
        }
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

    app.post("/fakedonate", (req, res) => {
      const info = req.body;
      connection.query(
        "SELECT * FROM users WHERE username = ?",
        [info.streamer],
        function (err, ress2) {
          if (!ress2[0]) return;
          io.sockets.emit("alert-" + ress2[0].alertlink, {
            donator: "حمایت تست",
            desc: "این هشدار برای تست است",
            money: info.money,
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
          io.sockets.emit("goal-" + ress[0].goallink, money);
          io.sockets.emit("alert-" + ress[0].alertlink, {
            donator: req.body.donator,
            desc: req.body.descs,
            money: money,
          });
          return res.send("<h1>Done</h1>");
        }
      );
    });

    server.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  }
}
