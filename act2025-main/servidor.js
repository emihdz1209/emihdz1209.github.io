//Escribe un comentario explicando para qué sirve http
//http nos permite inicializar un servidor web local
import http from "http";
//Escribe un comentario explicando para qué sirve fs
//fs nos permite leer archivos del sistema de archivos
import fs from "fs";

//Esta función deberá mostrar deberá mostrar una página HTML
//con la bienvenida a tu proyecto
function darBienvenida(req, res) {
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
}

//Esta función deberá enviar un json con los datos de las escuelas
function getEscuelas(req, res) {
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
}

function getEquipo(req, res) {
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
}

//Agrega un enlace a bienvenida y a donantes en escuelas.html
function mostrarEscuelas(req, res) {
  fs.readFile("escuelas.html", "utf8", (error, data) => {
    if (error) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Oh no!!!!");
      return;
    }
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  });
}

//Agrega un enlace a bienvenida y a escuelas en donantes.html
function mostrarDonantes(req, res) {
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
}

function mostrarOpinion(req, res) {
  fs.readFile("opinion.html", "utf8", (error, data) => {
    if (error) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Oh no!!!!");
      return;
    }
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  });
}

//Esta función deberá enviar un json con los datos de las donantes
function getDonantes(req, res) {
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
}

function mostrarEquipo(req, res) {
  fs.readFile("equipo.html", "utf8", (error, data) => {
    if (error) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Oh no!!!!");
      return;
    }
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  });
}

function mostrarJS(req, res) {
  fs.readFile("servidor.js", "utf8", (error, data) => {
    if (error) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Oh no!!!!");
      return;
    }
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(data);
  });
}

function manejarRuta404(req, res) {
  res.writeHead(404, { "Content-Type": "text/plain" });
  //Cambia el mensaje por algo más divertido
  res.end("Uh oh! No se encontró la página. Para la proxima, sin falta.");
}

//incluye el enlace a la documentación de createServer
const servidor = http.createServer((req, res) => {
  const url = req.url;

  if (url === "/") {
    darBienvenida(req, res);
  } else if (url === "/api/escuelas") {
    getEscuelas(req, res);
  } else if (url === "/api/donantes") {
    getDonantes(req, res);
  } else if (url === "/api/equipo") {
    getEquipo(req, res);
  } else if (url === "/escuelas") {
    mostrarEscuelas(req, res);
  } else if (url === "/donantes") {
    mostrarDonantes(req, res);
  } else if (url === "/equipo") {
    mostrarEquipo(req, res);
  } else if (url === "/opinion") {
    mostrarOpinion(req, res);
  } else if (url === "/servidor.js") {
    mostrarJS(req, res);
  }
  //Agrega una ruta /equipo y su función correspondiente para que muestre el equipo del proyecto
  //Haz una página equipo.html correspondiente
  //Escribe el nombre completo y una cualidad que valores en esa persona de tu equipo
  //Trata de agregar una imagen a opinion.html
  //Explica si la puedes ver, en caso negativo ¿qué crees que pase?

  //Agrega una ruta /opinion
  //Haz una página opinion.html
  // Lee el siguiente artículo y responde ¿Crees que el colonialismo digital es un riesgo para tu carrera profesionl? ¿Para tu vida persona?
  //¿Qué es el freedombox?
  //https://www.aljazeera.com/opinions/2019/3/13/digital-colonialism-is-threatening-the-global-south
  else {
    manejarRuta404(req, res);
  }
});

const puerto = 1984;
servidor.listen(puerto, () => {
  console.log(`Servidor escuchando en el puerto http://localhost:${puerto}`);
});

//Importante
//En esta actividad deberás agregar en supertarea un enlace a servidor.js y al resto de los html
