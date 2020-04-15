const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

// const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [
];


app.get("/repositories", (request, response) => {
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const repositorie = {
    title,
    techs,
    url,
    id: uuid(),
    likes: 0
  }
  repositories.push(repositorie);
  return response.status(201).json(repositorie)
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const keys = ['title', 'techs', 'url']
  const params = request.body;
  const indexRepositorie = repositories.findIndex(repositorie => repositorie.id === id);
  const oldRepositorie = repositories[indexRepositorie];

  if (indexRepositorie < 0) {
    return response.status(400).json({ error: 'Repositorie not found' });
  }

  Object.entries(params).map(item => {
    if (keys.includes(item[0])) {
      repositories[indexRepositorie][item[0]] = item[1];
    }
  })

  return response.status(200).json(repositories[indexRepositorie])

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const indexRepositorie = repositories.findIndex(repositorie => repositorie.id === id);
  if (indexRepositorie < 0) {
    return response.status(400).json({ error: 'Repositorie not found' });
  }
  repositories.splice(indexRepositorie, 1);
  response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const indexRepositorie = repositories.findIndex(repositorie => repositorie.id === id);
  if (indexRepositorie < 0) {
    return response.status(400).json({ error: 'Repositorie not found' });
  }
  repositories[indexRepositorie]['likes'] = repositories[indexRepositorie]['likes'] + 1;
  return response.status(200).json(repositories[indexRepositorie])
});

module.exports = app;
