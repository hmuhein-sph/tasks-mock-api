const jsonServer = require("json-server");
const path = require("node:path");

const server = jsonServer.create();
const dbPath = path.join(__dirname, "db.json");
const router = jsonServer.router(dbPath);

server.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PATCH, PUT, DELETE, OPTIONS",
	);
	res.setHeader("Access-Control-Allow-Headers", "Content-Type");
	if (req.method === "OPTIONS") return res.sendStatus(200);
	next();
});
server.use(jsonServer.bodyParser);

server.use((req, res, next) => {
	if (req.method === "POST" && req.path === "/tasks") {
		req.body.completed = req.body.completed ?? false;
	}
	next();
});

server.use(router);

const PORT = process.env.PORT || 4001;
server.listen(PORT, () => {
	console.log(`Mock API running at http://localhost:${PORT}`);
	console.log("  GET    /tasks     - list all tasks");
	console.log(
		'  POST   /tasks     - create task (body: { "title": "string" })',
	);
	console.log("  PATCH  /tasks/:id - update task");
	console.log("  DELETE /tasks/:id - delete task");
});
