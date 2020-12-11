const cors = require("cors");
const express = require("express");
const listEndpoints = require("express-list-endpoints");
// const products = require("./services/products");

const hostname = "localhost";
const port = process.env.PORT || 3001;
const server = express();
server.use(cors());
server.use(express.json());
// server.use("/products", products);

//ERROR MIDDLEWARE GOES HERE

console.log(listEndpoints(server));

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
