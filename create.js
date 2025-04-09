const { Console } = require("console");
const http = require("http");

const tasks = [];
const STATES = ["done", "onhold", "pending", "undone"];
let task;

function recup(req) {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });
  req.on("end", () => { 
    task = JSON.parse(body);
  })
};
function add(task, res){
  const isValidObject =
  typeof task === "object" &&
  task !== null

  const hasRequiredKeys =
      "id" in task &&
      "title" in task &&
      "status" in task;
    
    const isValidId = typeof task.id === "number";
    console.log(typeof task.id);
    const isValidTitle = typeof task.title === "string";
    console.log(isValidTitle)
    const isValidStatus =
      STATES.includes(task.status);

  if (isValidObject && hasRequiredKeys && isValidId && isValidTitle && isValidStatus) {
    tasks.push(task);
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(tasks));
  }else {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(   JSON.stringify({ error: "please printf valid object" }))
  }     

}

const server = http.createServer((req, res) => {
  if (req.url === "/tasks" && req.method === "POST") {
    recup(req, (err, task) => {
      if (err) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: err.message }));
      } else {
        add(task, res);
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
  console.log(`Server start on http://localhost:${port}`);
});