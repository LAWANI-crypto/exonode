const http =require("http")
const tasks = [
    { id: 1, title: "Acheter du lait", done: false},
    { id: 2, title: "Finir le projet", done: true },
    { id: 3, title: "Aller à la salle de sport", done: false }
]
const server = http.createServer((req, res) => {
   
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Route non trouvée");
    });


const port = 3000;
server.listen(port, () => {
console.log(`Serveur lancé sur http://localhost:${port}`);
});