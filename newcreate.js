//chargement du module express apres son installation par la commande npm install express
const express = require("express");

//creation d'une instance d'application
const app = express();

//creation du tableau qui contiendra les taches
const tasks = [];

//creation d'un tableau qui contiendra les statuts que peuvent prendre une tache
const STATES = ["done", "onhold", "pending", "undone"];

//Middleware(function intermediaire qui permet a mon server de comprendre les donnes json qu'il recoit)
app.use(express.json()); 


//Ajout d'une tache dans le tableau tasks
app.post("/tasks", (req, res) => {
  const task = req.body;

  const isValidObject = typeof task === "object" && task !== null;
  const hasRequiredKeys = "id" in task && "title" in task && "status" in task;
  const isValidId = typeof task.id === "number";
  const isValidTitle = typeof task.title === "string";
  const isValidStatus = STATES.includes(task.status);

  if (isValidObject && hasRequiredKeys && isValidId && isValidTitle && isValidStatus) {
    tasks.push(task);
    res.status(201).json(tasks);
  } else {
    res.status(400).json({ error: "please provide a valid object" });
  }
});

//Affichage du tableau de taches
app.get("/tasks", (req, res) => {
  res.status(200).json(tasks);
});

//intercepte l'erreur lors d'une connexion au mauvais serveur
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});


//Server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
