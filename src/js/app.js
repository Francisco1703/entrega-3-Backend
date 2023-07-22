const express = require("express");
const PORT = 8080;
const app = express();
const { ProductManager } = require("./ProductManager");

const productManager = new ProductManager();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/products", async (req, res) => {
  try {
    const limit = Number(req.query.limit);
    const productsList = await productManager.getProducts();

    if (limit) {
      let arrayProds = [...productsList];
      const productsLimit = arrayProds.slice(0, limit);
      return res.send(productsLimit);
    } else {
      res.send(productsList);
    }
  } catch (error) {
    console.log(error);
  }
});

app.get("/products", async (req, res) => {
  try {
    const limit = Number(req.query.limit);
    const productsList = await productManager.getProducts();
    if (limit) {
      let arrayProds = [...productsList];
      const productsLimit = arrayProds.slice(0, limit);
      return res.send(productsLimit);
    } else {
      res.send(productsList);
    }
  } catch (error) {
    console.log(error);
  }
});

app.get("/products/:pid", async (req, res) => {
  try {
    const pid = req.params.pid;
    const products = await productManager.getProducts();
    const existProduct = products.find((prod) => prod.id === Number(pid));
    const response = existProduct
      ? existProduct
      : {
          error: `No se encontró el producto con el id ${pid} en nuestra base de datos`,
        };
    res.status(existProduct ? 200 : 400).send(response);
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log(`Servidor conectado al puerto: ${PORT}`);
});
