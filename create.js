const http = require("http");

const tasks = [];
const STATES = ["done", "onhold", "pending", "undone"];

const server = http.createServer((req, res) => {
  if (req.url === "/tasks" && req.method === "POST") {
    let body = "";
    let task;
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => { 
     try {
      task = JSON.parse(body);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'JSON reçu !' }));
    } catch (error) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'JSON invalide' }));
    }
      

      const isValidObject =
      typeof task === "object" &&
      task !== null

      const hasRequiredKeys =
          "id" in task &&
          "title" in task &&
          "status" in task;

        const isValidStatus =
          STATES.includes(task.status);

      if (isValidObject && hasRequiredKeys && isValidStatus ) {
        tasks.push(task);
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(tasks));
      }else {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(   JSON.stringify({ error: "Objet invalide" }))
      }     
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
