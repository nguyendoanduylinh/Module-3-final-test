const http = require("http");
const url = require("url");
const fs = require("fs");
const qs = require("qs");

const ErrorController = require("./controller/error-controller");
const HomeController = require("./controller/home-controller");
const CityController = require("./controller/city-controller");

let errorController = new ErrorController();
let homeController = new HomeController();
let cityController = new CityController();

const mimeTypes = {
  html: "text/html",
  js: "text/javascript",
  css: "text/css",
  "min.js": "text/javascript",
  "js.map": "text/javascript",
  "css.map": "text/css",
  "min.css": "text/css",
  jpg: "image/jpg",
  png: "image/png",
  gif: "image/gif",
  woff: "text/html",
  ttf: "text/html",
  woff2: "text/html",
  eot: "text/html",
};

let server = http.createServer((req, res) => {
  let path = url.parse(req.url);
  let pathUrl = path.pathname;
  let method = req.method;

  switch (pathUrl) {
    case "/": {
      homeController.showHomePage(req, res);
      break;
    }

    case "/city": {
      cityController.showCityListPage(req, res);
      break;
    }

    case "/city/create": {
      if (method === "GET") {
        cityController.showCityFormCreate(req, res);
      } else {
        cityController.createCity(req, res);
      }
      break;
    }

    case "/city/edit": {
      let query = qs.parse(path.query);
      let idUpdate = query.id;
      if (method === "GET") {
        cityController.showCityEditForm(req, res, idUpdate);
      } else {
        cityController.editCity(req, res, idUpdate);
      }
      break;
    }

    case "/city/delete": {
      let query = qs.parse(path.query);
      let idUpdate = query.id;
      if (method === "GET") {
        cityController.deleteCity(req, res, idUpdate);
      } else {
        cityController.showCityListPage(req, res);
      }
      break;
    }

    default:
      const filesDefences = req.url.match(/\.js|\.css|\.png|\.jpg/);
      if (filesDefences) {
        const extension = mimeTypes[filesDefences[0].toString().split(".")[1]];
        res.writeHead(200, { "Content-Type": extension });
        fs.createReadStream(__dirname + "/" + req.url).pipe(res);
      } else {
        res.end();
      }

      // errorController.showError404Page(req,res);
      break;
  }
});

server.listen(8002, () => {
  console.log("Server is running http//:localhost:8002");
});
