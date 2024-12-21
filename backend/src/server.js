import express from "express";
import mqtt from "mqtt";
import sqlite3 from "sqlite3";
import cors from "cors";

const app = express();
const port = 3000;

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

const db = new sqlite3.Database("./sistem-mendeteksi-air.sqlite");

db.run(`
    CREATE TABLE IF NOT EXISTS sistemMendeteksiAir (
      temperature REAL NOT NULL,
      dissolvedOxygen REAL NOT NULL,
      pH REAL NOT NULL,
      turbidity REAL NOT NULL
    )
  `);

const client = mqtt.connect("mqtt://rduha3c.localto.net", { port: 8443 });

client.on("connect", () => {
  console.log("Connected to MQTT Broker");
  client.subscribe("sistemPendeteksiAirSungai");
});

client.on("message", (topic, message) => {
  try {
    const data = JSON.parse(message.toString());
    console.log("Received MQTT message:", data);
    const currentTime = new Date().toISOString();

    // Save data to SQLite database
    db.run(
      "INSERT INTO sistemMendeteksiAir (temperature, dissolvedOxygen, pH, turbidity) VALUES (?, ?, ?, ?)",
      [data.temperature, data.dissolvedOxygen, data.pH, data.turbidity],
      (err) => {
        if (err) {
          console.error("Error inserting data:", err);
        }
      }
    );
  } catch (error) {
    console.error("Error parsing MQTT message:", error);
  }
});

app.get("/api/data", (req, res) => {
  db.all("SELECT * FROM sistemMendeteksiAir ORDER BY rowid DESC LIMIT 1", (err, rows) => {
    if (err) {
      res.status(500).send("Error fetching data");
    } else {
      res.json(rows[0]);
    }
  });
});

app.get('/api/data', (req, res) => {
    res.json({ message: 'Data received successfully' });
  });
  
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });