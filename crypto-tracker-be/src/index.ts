import express from 'express';
import { json, urlencoded } from 'body-parser';
import { configure as cryptoApis } from './routes/crypto/routes';
import cors from "cors";
import helmet from 'helmet';
import { getService } from './container';
import { Server } from 'socket.io';
import http from 'http';
import { getEnv } from './env';

(global as any).__basedir = __dirname + "/.";

const app = express();
const server = http.createServer(app);
const FE_URL = getEnv().FE_URL;
export const io = new Server(server, {
  cors: {
    origin: FE_URL,
    methods: ["GET", "POST"]
}
});

app.use(cors());


app.use(json({ limit: '50mb' }));
app.use(urlencoded({ extended: true, limit: '50mb' }));
app.use(helmet({
  frameguard: { action: "deny" }
}));
app.set("port", process.env.PORT || 3000);

app.get("/", (req, res) => {
  res.json({ status: "up" })
});


export const baseRouter = express.Router();

cryptoApis(baseRouter, getService());

app.use("/v1", baseRouter);



//handle not found routes
app.use(function (req, res, next) {
  res.status(404).json({ message: "Route not found" })
});

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('subscribe', (cryptoName) => {
      socket.join(cryptoName);
      console.log(`Client subscribed to ${cryptoName}`);
  });

  socket.on('unsubscribe', (cryptoName) => {
      socket.leave(cryptoName);
      console.log(`Client unsubscribed from ${cryptoName}`);
  });

  socket.on('disconnect', () => {
      console.log('Client disconnected');
  });
});

server.listen(app.get("port"), () => {
  console.log("Backend is running at http://localhost:%d", app.get("port"));
});


process.on('uncaughtException', (e) => {
    console.log("process uncaughtException " + e);
});

process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Closing http server.');
  });
});

process.on("unhandledRejection", () => {
  console.log("UNHANDLED REJECTION ================>")
})


export default app;