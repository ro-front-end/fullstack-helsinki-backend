const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

let persons = [
  {
    id: 1,
    name: "Rodrigo",
    number: 12345678,
  },

  {
    id: 2,
    name: "Roberto",
    number: 2345678,
  },

  {
    id: 3,
    name: "Atala",
    number: 34567890,
  },
];

const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map((p) => p.id)) : 0;
  return maxId + 1;
};

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).json();
  }
});

app.post("/api/persons", (request, response) => {
  const { name, number } = request.body;

  if (!name || !number) {
    response.status(400).json({
      error: "Name or number is missing.",
    });
  }
  const newPerson = {
    id: generateId(),
    name,
    number,
  };

  persons = persons.concat(newPerson);

  response.status(201).json(newPerson);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const initialLength = persons.length;

  persons = persons.filter((person) => person.id !== id);

  if (persons.length < initialLength) {
    response.status(204).end();
  } else {
    response.status(404).json();
  }
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
