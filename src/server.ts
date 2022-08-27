import http from "http";
import express, { ErrorRequestHandler, Express } from "express";
import morgan from "morgan";
import routes from "./routes";
import errorHandler from "./middleware/error-handler";


const app: Express = express();



/** Logging */
app.use(morgan("dev"));
/** Parse the request */
app.use(express.urlencoded({ extended: false }));
/** Takes care of JSON data */
app.use(express.json());

app.use((req, res, next) => {
  // set the CORS policy
  res.header("Access-Control-Allow-Origin", "*");
  // set the CORS headers
  res.header(
    "Access-Control-Allow-Headers",
    "origin, X-Requested-With,Content-Type,Accept, Authorization"
  );
  // set the CORS method headers
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET PATCH PUT DELETE POST");
    return res.status(200).json({});
  }
  next();
});

app.use("/", routes);
app.use(errorHandler);

/** Server */
const httpServer = http.createServer(app);
const PORT: any = process.env.PORT ?? 6060;
httpServer.listen(PORT, () =>
  console.log(`The server is running on port ${PORT}`)
);
