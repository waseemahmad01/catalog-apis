import express from "express";
import path from "path";
import { errorHandler } from "./app";
import passport from "passport";
import cors from "cors";
import morgan from "morgan";
import socket from "socket.io";

// DB connection
import "./app/config/connection";

// Assets
global.appRoot = path.resolve(__dirname);

// App config
const app = express();
app.use(passport.initialize());
app.use(passport.session());

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// All router
import {
	fbUser,
	goUser,
	store,
	subStore,
	user,
	product,
	category,
	discount,
	chat,
	admin,
	cart,
	favorite,
	notification,
	customer,
} from "./routes";
app.use("/api", user);
app.use("/api", notification);
app.use("/api", customer);
app.use("/api", favorite);
app.use("/api", admin);
app.use("/api", store);
app.use("/api", subStore);
app.use("/api", product);
app.use("/api", category);
app.use("/api", discount);
app.use("/api", chat);
app.use("/api", cart);
app.use("/", fbUser);
app.use("/", goUser);

// Middleware
app.use(errorHandler);
app.use("/uploads", express.static("uploads"));
app.get("/:id/:cid", (req, res) => {
	res.send(req.params.id + req.params.cid);
});
// create a server
import http from "http";
import { PORT } from "./app/config";
const server = http.createServer(app);

const io = socket(server);

let users = [];

const addUser = (userId, socketId) => {
	!users.some((user) => user.userId === userId) &&
		users.push({ userId, socketId });
};

const removeUser = (socketId) => {
	users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
	console.log(userId);
	return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
	//when ceonnect
	console.log("a user connected.");

	//take userId and socketId from user
	socket.on("signin", (userId) => {
		addUser(userId, socket.id);
		io.emit("getUsers", users);
	});

	//send and get message
	socket.on("sendMessage", ({ senderId, receiverId, text }) => {
		const user = getUser(receiverId);
		console.log("this is user", user);
		console.log("this is user", user.socketId);
		console.log(user.socketId);
		io.to(user.socketId).emit("getMessage", {
			senderId,
			text,
		});
	});

	//when disconnect
	socket.on("disconnect", () => {
		console.log("a user disconnected!");
		removeUser(socket.id);
		io.emit("getUsers", users);
	});
});

// const clients = {};

// console.log(clients);
// io.on("connection", (socket) => {
//     // console.log("connetetd");
//     // console.log(socket.id, "has joined");
//     // socket.on("signin", (id) => {
//     //     console.log('hello');
//     //     console.log(id);
//     //     clients[id] = socket;
//     //     console.log('clients id', clients[id]);
//     //     console.log(clients);
//     // });
//     socket.on("message", (msg) => {
//          console.log(msg);
//         let targetId = msg.targetId;
//         console.log(targetId);
//         if (clients[targetId]) clients[targetId].emit("message", msg);
//     });
// });
// app.get("/", (req, res) => {
// 	res.send(ok);
// });

server.listen(PORT, "0.0.0.0", () => {
	console.log(`Server is listening http://localhost:${PORT}`);
});

// server.listen(PORT, '0.0.0.0', () => {
//     console.log(`Server is listening http://localhost:${PORT}`);
// });
