const http =require("http")
const tasks = [
    { id: 1, title: "Acheter du lait", done: false},
    { id: 2, title: "Finir le projet", done: true },
    { id: 3, title: "Aller à la salle de sport", done: false }
]

const server = http.createServer((req, res) => {
    if (req.url === "/task" && req.method === "GET") {
        res.writeHead(200, { "content-type": "application/json", "cache-control": "no-store" });
        res.end(JSON.stringify(tasks))
           
        return;
    } 
    if(req.url==="/hello" && req.method === "GET"){
        res.writeHead(200,{"content-type":"text/plain"})
        res.end(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=, initial-scale=1.0">
                <title>Document</title>
            </head>
            <body>
                <div>
                    <h1>ceci est un titre</h1>
                    <p>ceci est un paragraphe</p>
                </div>
            </body>
            </html>
        `);
    }else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Route non trouvée");
    }
});

const port = 3000;
server.listen(port, () => {
    console.log(`Serveur lancé sur http://localhost:${port}`);
});
