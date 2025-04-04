const http = require("http");

const tasks = [];

const server = http.createServer((req, res) => {
  if (req.url === "/task" && req.method === "POST") {
    let body = "";
    let task;
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      task = JSON.parse(body);

      tasks.push(task);
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(tasks));
    });
  } else if (req.url === "/tasks" && req.method === "GET") {
    res.writeHead(200, {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    });
    res.end(JSON.stringify(tasks));
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not Found" }));
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
