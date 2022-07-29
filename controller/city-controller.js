const City = require("../model/city");
const fs = require("fs");
const qs = require("qs");

class CityController {
  constructor() {
    this.city = new City();
  }

  showCityListPage(req, res) {
    fs.readFile("views/city/list.html", "utf-8", async (err, data) => {
      if (err) {
        console.log("File NotFound!");
      } else {
        let cities = await this.city.getCities();
        let tbody = "";
        for (let index = 0; index < cities.length; index++) {
          tbody += `<tr>
                                            <td>${cities[index].id}</td>
                                            <td>${cities[index].name}</td>
                                            <td>${cities[index].area}</td>
                                            <td>${cities[index].population}</td>
                                            <td>${cities[index].gdp}</td>
                                            <td>${cities[index].description}</td>
                                            <td>
                                                <a href="/city/edit?id=${cities[index].id}" class="action-icon btn btn-primary text-white"> EDIT </a>
                                                <a href="/city/delete?id=${cities[index].id}" class="action-icon btn btn-danger text-white"> DELETE </a>
                                            </td>
                                        </tr>`;
        }
        data = data.replace("{city}", tbody);
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        return res.end();
      }
    });
  }

  showCityFormCreate(req, res) {
    fs.readFile("views/city/create.html", "utf-8", (err, data) => {
      if (err) {
        console.log("File NotFound!");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        return res.end();
      }
    });
  }

  createCity(req, res) {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", () => {
      let city = qs.parse(data);
      this.city.createCity(city);
      res.writeHead(301, {
        location: "/city",
      });
      return res.end();
    });
  }

  showCityEditForm(req, res, idUpdate) {
    fs.readFile("views/city/edit.html", "utf-8", async (err, data) => {
      if (err) {
        console.log("File NotFound!");
      } else {
        let city = await this.city.getCity(idUpdate);
        if (city.length > 0) {
          data = data.replace("{id}", city[0].id);
          data = data.replace("{name}", city[0].name);
          data = data.replace("{area}", city[0].area);
          data = data.replace("{population}", city[0].population);
          data = data.replace("{gdp}", city[0].gdp);
          data = data.replace("{description}", city[0].description);
        }
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        return res.end();
      }
    });
  }

  editCity(req, res, id) {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", () => {
      let city = qs.parse(data);
      this.city.updateCity(id, city).then(() => {
        res.writeHead(301, {
          location: "/city",
        });
        return res.end();
      });
    });
  }

  deleteCity(req, res, id) {
    this.city.deleteCity(id).then(() => {
      res.writeHead(301, {
        location: "/city",
      });
      return res.end();
    });
  }
}

module.exports = CityController;
