const Connection = require("./connection");

class City {
  constructor() {
    this.connection = Connection.createConnection();
    this.connection.connect((err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Connect success!");
      }
    });
  }

  getCities() {
    return new Promise((resolve, reject) => {
      this.connection.query("select * from city_list", (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  createCity(city) {
    let insertQuery = `insert into city_list(name, area, population, gdp, description)
                           VALUES ('${city.name}', ${city.area}, ${city.population}, ${city.gdp}, '${city.description}')`;
    this.connection.query(insertQuery, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Insert success");
      }
    });
  }

  getCity(id) {
    return new Promise((resolve, reject) => {
      let query = `select * from city_list where id = ${id}`;
      this.connection.query(query, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  updateCity(id, city) {
    return new Promise((resolve, reject) => {
      let query = `update city_list set name = '${city.name}', area = ${city.area}, population = ${city.population}, gdp = ${city.gdp}, description = '${city.description}'  where id = ${city.id}`;
      this.connection.query(query, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
  }

  deleteCity(id) {
    return new Promise((resolve, reject) => {
      let query = `delete from city_list where id = ${id}`;
      this.connection.query(query, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
          console.log("Delete success");
        }
      });
    });
  }
}

module.exports = City;
