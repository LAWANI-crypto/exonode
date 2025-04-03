const http = require('http');
const Tasks = [];

const server = http.createServer((req, res) => {
    if (req.url === "/task" && req.method === "POST") {
 
    const newTask = {
        id: tasks.length + 1, 
        title,
        completed: false, 
    };
    Tasks.push(newTask); 
    res.writeHead(201,{ "content-type": "application/json"})
    res.end(JSON(newTask))
}
});
server => {
    if (req.url === "/tasks" && req.method === "POST") {
        res.writeHead(200, { "content-type": "application/json", "cache-control": "no-store" });
        res.end(JSON.stringify(Tasks))
    }
};

const port = 3000;
server.listen(port, () => {
    console.log(`Serveur demarree sur http://localhost:${port}`);
});

