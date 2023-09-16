const express = require("express");
const router = express.Router();
import jwt from "jsonwebtoken";
import connection from "./mysql";

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

router.get("/", (req, res) => {
  return res.redirect("/auth/login");
});

router.get("/login", (req, res) => {
  return res.render("./auth/login", {
    name: process.env.PN,
  });
});

router.get("/register", function (req, res) {
  const userinfo = req.cookies.newacc;
  if (!userinfo) return res.redirect("/auth/login")
  return res.render("./auth/register", {
    name: process.env.PN,
  });
})

router.post("/login", function (req, res) {
  connection.query(
    "SELECT * FROM users WHERE email = ?;",
    [req.body.infoPost.email],
    function (err, firstRes) {
      if (err) return res.json({ success: false, message: "مشکلی به وجود امده است لطفا با پشتیبانی صحبت کنید !" })
      const userinfo = firstRes[0]
      if (!userinfo) {
        const payload = {
          userinfo: req.body.infoPost,
        };
        res.cookie("newacc", payload, {
          maxAge: 1000 * 60 * 60 * 24 * 1,
          httpOnly: true,
        });
        return res.json({
          newacc: true,
          success: false,
          message: "اکانتی با این ایمیل وجود ندارد !",
        });
      } else {
        if (userinfo.password === req.body.infoPost.password) {
          if (req.body.infoPost.rememberme) {
            const payload = {
              userinfo: userinfo,
            };

            const token2 = jwt.sign(payload, "secretsystemverygood");

            res.cookie("token", token2, {
              maxAge: 1000 * 60 * 60 * 24 * 6,
              httpOnly: true,
            });
          } else {
            const payload = {
              userinfo: userinfo,
            };

            const token2 = jwt.sign(payload, "secretsystemverygood");

            res.cookie("token", token2, {
              maxAge: 5000 * 60,
              httpOnly: true,
            });
          }
          return res.json({
            newacc: false,
            success: true,
            message: "خوش امدید !",
          });
        } else {
          return res.json({
            newacc: false,
            success: false,
            message: "رمز وارد شده اشتباه است",
          });
        }
      }
    }
  );
});

router.post("/register", function (req, res) {
  if (!req.cookies.newacc) {
    return res.json({
      success: false,
      message: "مشکلی در مرحله قبل به وجود امده لطفا دوباره تلاش کنید!",
    });
  } else {
    connection.query(
      "SELECT * FROM users WHERE email = ?",
      [req.cookies.newacc.userinfo.email],
      function (err, resallacc) {
        if (resallacc[0] == undefined) {
          connection.query(
            "SELECT * FROM users WHERE phone_number = ?",
            [req.body.infoPost.phonenumber],
            function (err, phonenumbercheck) {
              if (phonenumbercheck[0]) {
                res.json({
                  success: false,
                  message: "شماره تلفن وارد شده در سیستم وجود دارد",
                });
              } else {
                // اگر شماره تلفن وارد شده در سیستم وجود نداشت، ادامه کد را اجرا کنید.
                connection.query(
                  "SELECT * FROM users WHERE link = ?",
                  [req.body.infoPost.link],
                  function (err, linkcheck) {
                    if (linkcheck[0]) {
                      res.json({
                        success: false,
                        message: "لینک درگاه وارد شده در سیستم وجود دارد",
                      });
                    } else {
                      // اگر هیچ خطایی رخ نداده باشد، ادامه کد را اجرا کنید و پاسخ موفقیت‌آمیز را ارسال کنید
                      connection.query(
                        "INSERT INTO users (username, email, password, firstname, lastname, phone_number, link, alertlink, goallink) VALUES (?,?,?,?,?,?,?,?,?);",
                        [
                          req.body.infoPost.username,
                          req.cookies.newacc.userinfo.email,
                          req.cookies.newacc.userinfo.password,
                          req.body.infoPost.firstname,
                          req.body.infoPost.lastname,
                          req.body.infoPost.phonenumber,
                          req.body.infoPost.link,
                          makeid(50),
                          makeid(50),
                        ],
                        function (err, rese) {
                          if (err) {
                            return res.json({
                              success: false,
                              message: "مشکلی به وجود امده است لطفا بعدا تلاش کنید",
                            });
                          }
                          connection.query(
                            "SELECT * FROM users WHERE email = ?",
                            [req.cookies.newacc.userinfo.email],
                            function (err, usedsaij) {
                              if (req.cookies.newacc.userinfo.rememberme == "on") {
                                const payload = {
                                  userinfo: usedsaij[0],
                                };
                              
                                const token2 = jwt.sign(payload, "secretsystemverygood");
                              
                                res.cookie("token", token2, {
                                  maxAge: 1000 * 60 * 60 * 24 * 6,
                                  httpOnly: true,
                                });
                              } else {
                                const payload = {
                                  userinfo: usedsaij[0],
                                };
                              
                                const token2 = jwt.sign(payload, "secretsystemverygood");
                              
                                console.log(payload)
                                res.cookie("token", token2, {
                                  maxAge: 5000 * 60,
                                  httpOnly: true,
                                });
                              }
                              res.json({
                                success: true,
                                message: "اکانت شما با موفقیت ساخته شد !",
                              });
                            }
                          );
                        }
                      );
                    }
                  }
                );
              }
            }
          );
        } else {
          res.json({
            success: false,
            message: "ایمیل وارد شده در سیستم وجود دارد",
          });
        }
      }
    );
  }  
});

module.exports = router;
