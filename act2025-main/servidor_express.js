//Escribe un comentario explicando para qué sirve http
//http nos permite inicializar un servidor web local
import http from "http";
//Escribe un comentario explicando para qué sirve fs
//fs nos permite leer archivos del sistema de archivos
import fs from "fs";
import express from "express";

const servidor = express();

//Esta función deberá mostrar deberá mostrar una página HTML
//con la bienvenida a tu proyecto

servidor.get("/", (req, res) => {
  //Agrega lo mínimo necesario en bienvenida.html
  //Agrega un enlace en bienvenida a la página de escuelas
  //Agrega un enlace en bienvenida a la página de donantes
  fs.readFile("bienvenida.html", "utf8", (error, data) => {
    if (error) {
      //Escribe qué significa el 500
      //Error 500 = Internal Server Error (Error interno del servidor, es un error genérico)
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Oh no!!!!");
      return;
    }
    //Escribe qué significa el 200
    //200 = OK (Respuesta estándar para solicitudes correct)
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  });
});

//Esta función deberá enviar un json con los datos de las escuelas
servidor.get("/api/escuelas", (req, res) => {
  //Esto representa un objeto JSON de una escuela
  //Agrega otra escuela
  const escuelas = {
    nombres: ["Escuela Benito Juárez", "Escuela Miguel Hidalgo"],
    direcciones: [
      "Av. Principal 123, Ciudad de México",
      "Calle Secundaria 456, Ciudad de México",
    ],
  };
  res.writeHead(200, { "Content-Type": "application/json" });
  //Escribe qué hace la función stringify y por qué la tenemos que usar
  //Stringify convierte un objeto JavaScript en una cadena de texto JSON, esto es necesario para enviar respuestas en formato JSON
  res.end(JSON.stringify(escuelas));
});

servidor.get("/api/equipo", (req, res) => {
  const equipo = {
    nombres: [
      "Jesus Eduardo Escobar Meza",
      "Angel Gabriel Camacho Perez",
      "Emilio Hernandez Flores",
      "Eloy Rodriguez Bonilla",
      "Alejandro Gutierrez Zamudio",
      "Jose Pedro Gastelum Beltran",
    ],
    cualidades: [
      "Dedicado y responsable",
      "Trabajador y comprometido",
      "Creativo y proactivo",
      "Analítico y metódico",
      "colaborativo",
      "visionario",
    ],
  };

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(equipo));
});

//Agrega un enlace a bienvenida y a donantes en escuelas.html
servidor.get("/escuelas", (req, res) => {
  fs.readFile("escuelas.html", "utf8", (error, data) => {
    if (error) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Oh no!!!!");
      return;
    }
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  });
});

//Agrega un enlace a bienvenida y a escuelas en donantes.html
servidor.get("/equipo", (req, res) => {
  //Construye una página básica donantes.html
  fs.readFile("donantes.html", "utf8", (error, data) => {
    if (error) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Oh no!!!!");
      return;
    }
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  });
});

servidor.get("/opinion", (req, res) => {
  fs.readFile("opinion.html", "utf8", (error, data) => {
    if (error) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Oh no!!!!");
      return;
    }
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  });
});

//Esta función deberá enviar un json con los datos de las donantes
servidor.get("/api/donantes", (req, res) => {
  const donantes = [
    {
      nombre: "Thom York",
      donaciones: "45.00 MXN",
    },
    {
      nombre: "Dr Gregory House",
      donaciones: "918,351,000.00 MXN",
    },
  ];
  //Tienes que corregir varias cosas en esta sección
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(donantes));
});

servidor.get('/equipo"', (req, res) => {
  fs.readFile("equipo.html", "utf8", (error, data) => {
    if (error) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Oh no!!!!");
      return;
    }
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  });
});

servidor.get("/servidor.js", (req, res) => {
  fs.readFile("servidor.js", "utf8", (error, data) => {
    if (error) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Oh no!!!!");
      return;
    }
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(data);
  });
});

// Middleware to handle non-existent routes and showcase a 404
servidor.use((req, res) => {
  res.status(404)
  res.send("Uh oh! No se encontró la página. Para la próxima, sin falta.");
});

const puerto = 1984;
servidor.listen(puerto, () => {
  console.log(`Servidor escuchando en el puerto http://localhost:${puerto}`);
});

//Importante
//En esta actividad deberás agregar en supertarea un enlace a servidor.js y al resto de los html
