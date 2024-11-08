const authRouter = require("./auth.router");
const mailRouter = require("./mail.router")

const router = (app) => {
  app.use("/auth", authRouter);

  app.use("/mailer", mailRouter);
};

module.exports = router;
