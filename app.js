require("dotenv").config();
require("express-async-errors");

// extra security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

// Swagger
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");

const express = require("express");
const app = express();

const connectDB = require("./db/connect");

// routers
const ticketsRouter = require("./routes/tickets");
const usersRouter = require("./routes/users");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

app.get("/", (req, res) => {
  res.send("<h1>Turff Support API</h1>");
});

// routes

app.use("/api/v1/tickets", ticketsRouter);
app.use("/api/v1/users", usersRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = 5000;
const start = async () => {
  connectDB.connect((err) => {
    if (err) {
      console.log("Connection error message: " + err.message);

      return;
    }

    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
    console.log("Database Connected!");
  });
};

start();
