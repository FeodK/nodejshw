const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;
const COUNTERS_FILE = path.join(__dirname, "counters.json");

function loadCounters() {
  if (fs.existsSync(COUNTERS_FILE)) {
    const data = fs.readFileSync(COUNTERS_FILE, "utf8");
    return JSON.parse(data);
  }
  return {};
}

function saveCounters(counters) {
  fs.writeFileSync(COUNTERS_FILE, JSON.stringify(counters), "utf8");
}

let counters = loadCounters();

app.get("/", (req, res) => {
  counters["/"] = (counters["/"] || 0) + 1;
  saveCounters(counters);
  res.send(
    `<h1>Главная страница</h1><p>Просмотров: ${counters["/"]}</p> <a href="/about">Перейти на страницу "О нас"</a>`
  );
});

app.get("/about", (req, res) => {
  counters["/about"] = (counters["/about"] || 0) + 1;
  saveCounters(counters);
  res.send(
    `<h1>О нас</h1><p>Просмотров: ${counters["/about"]}</p> <a href="/">Вернуться на главную страницу</a>`
  );
});

// Запускаем сервер
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
