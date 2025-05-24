import express from "express";
import path from "path";
import { engine } from "express-handlebars";
import { __dirname } from "./utils.js";
import { mainRouter } from "./routes/mainRouter.js";
import './database/database.js'

console.clear();
console.log("⌛ Inicializando servidor...");

const app = express();

// Configuracion de Handlebars
app.engine("handlebars", engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

// Configuracion de Middlewares
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Ruta principal
app.use("/api/v1", mainRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🥟 El servidor está arriba y en el puerto ${PORT}`);
});
