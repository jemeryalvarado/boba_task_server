require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const routes = require("./routes/routes.js");
const knex = require("./database.js");

app.use(cors());
app.use(express.json());
app.use("/projects", routes);

app.get("/", (req, res) => {
  res.send("Hello");
});

async function startServer() {
  try {
    await knex.raw('SELECT 1+1 AS result'); // Simple test query
    console.log('✅ Connected to database');
    app.listen(port, () => {
      console.log(`🚀 Server is live on port: ${port}`);
    });
  } catch (error) {
    console.error('❌ Failed to connect to database:', error);
    process.exit(1); // Stop the server from starting
  }
}

startServer();
