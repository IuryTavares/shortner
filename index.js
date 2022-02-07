import express from "express";
import crypto from "crypto";

const app = express();

// 1
// 07e5098a-58c1-4bb1-8102-b2f2f69501a6

const users = [
  {
    id: crypto.randomUUID(),
    name: "Keven Leone",
    email: "keven123@hotmail.com",
  },
];

app.use(express.json());

app.get("/api/user", (request, response) => {
  response.send(users);
});

app.get("/api/user/:id", (request, response) => {
  const id = request.params.id;

  const user = users.find((user) => user.id === id);

  if (user) {
    return response.send({ user });
  }

  response.status(404).send({ message: "User not exist" });
});

app.post("/api/user", (request, response) => {
  const { email, name } = request.body;
  const user = { email, name, id: crypto.randomUUID() };

  users.push(user);

  response.send(user);
});

app.put("/api/user/:id", (request, response) => {
  const {id} = request.params;
  const {email, name} = request.body;

  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex < 0) {
    return response.status(400).json({error: 'user not found'});
  } 

  const user = {
    id,
    email,
    name,
  };

  users[userIndex] = user;

  return response.json(user);
});

app.delete("/api/user/:id", (request, response) => { 
  // Retornar status 200 caso o usuário seja removido
  // Retornar status 404 caso o usuário nao existe
  const {id} = request.params;

  
  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex < 0) {
    return response.status(400).json({error: 'user not found'});
  } 

  users.splice(userIndex, 1);

  return response.status(204).send();
});

app.listen(3000, () => {
  console.log("Server Running on PORT 3000");
});