const ARCHIVO = "products.json";
const fs = require("fs");

class ProductManager {
  constructor() {
    this.products = [];
    this.path = ARCHIVO;
    this.automaticId = 1;
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    try {
      const existentCode = this.products.find((prod) => prod.code === code);
      if (existentCode) {
        return console.log(
          `El código ${code} ya existe en nuestra base de datos, y le pertenece al producto ${existentCode.title}`
        );
      }
      const product = {
        id: this.automaticId++,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };

      const existentId = this.products.find(
        (prod) => prod.id === this.automaticId
      );

      if (existentId) {
        return console.log(
          `Ya existe un producto con el id ${this.automaticId} en nuestra base de datos`
        );
      }

      if (!title || !description || !price || !thumbnail || !code || !stock) {
        return console.log(`Por favor, complete todos los campos solicitados`);
      }

      this.products.push(product);
      console.log(
        `El producto ${product.title} se agregó correctamente a la base de datos`
      );

      let text = JSON.stringify(this.products, null, 2);

      fs.writeFileSync(ARCHIVO, text, (error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  }

  async getProducts() {
    try {
      return (this.products = readProducts(this.path));
    } catch (error) {
      console.log(error);
    }
  }

  async getProductById(id) {
    try {
      const existentProduct = this.products.find((prod) => prod.id === id);

      if (!existentProduct) {
        console.log(
          `Not Found: El producto con el id ${id} no existe en nuestra base de datos`
        );
      } else {
        console.log(
          `El producto con el id ${id} fue encontrado en nuestra base de datos`
        );
        return existentProduct;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateProduct(id, fieldUpdate, newValue) {
    try {
      const product = this.products.find((prod) => prod.id === id);
      if (!product) {
        console.log(`El producto con el id ${id} no fue encontrado`);
        return;
      }

      product[fieldUpdate] = newValue;

      fs.writeFile(
        this.path,
        JSON.stringify(this.products, null, 2),
        (error) => {
          if (error) {
            console.log("Error al guardar los cambios en el archivo");
          } else {
            console.log(
              `El producto con el id ${id} fue actualizado correctamente`
            );
            console.log(product);
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(id) {
    try {
      const productIndex = this.products.findIndex((prod) => prod.id === id);

      if (productIndex === -1) {
        console.log(
          `El producto con el id ${id} no se encuentra en nuestra base de datos`
        );
        return;
      } else {
        console.log(
          `El id ${id} fue eliminado exitosamente de nuestra base de datos`
        );
      }

      this.products.splice(productIndex, 1);

      fs.readFile(ARCHIVO, "utf-8", (error, data) => {
        if (error) {
          console.log("Ocurrió un error al leer el archivo");
        }

        let productsData = JSON.parse(data);

        productsData = this.products;
        const contenidoActualizado = JSON.stringify(productsData, null, 2);

        fs.writeFile(ARCHIVO, contenidoActualizado, (error) => {
          if (error) {
            console.log("Hubo un error al actualizar el archivo");
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
}

async function readProducts(file) {
  try {
    const data = await fs.promises.readFile(file, "utf-8");
    const products = JSON.parse(data);
    return products;
  } catch (error) {
    console.log("Error al leer los archivos");
  }
}

/* (async () => {
  try {
    let test = new ProductManager();
    //console.log(test.getProducts());
    test.addProduct(
      "Producto prueba",
      "Este es un producto prueba",
      200,
      "Sin imagen",
      "abc123",
      25
    );

    test.addProduct(
      "Producto prueba 2",
      "Este es un producto prueba 2",
      200,
      "Sin imagen",
      "abc124",
      25
    );
    //Me tiene que tirar en la consola que ese code ya existe
        test.addProduct(
      "Producto prueba 3",
      "Este es un producto prueba 3",
      200,
      "Sin imagen",
      "abc124",
      25
    );  
    test.addProduct(
      "Producto prueba 3",
      "Este es un producto prueba 3",
      200,
      "Sin imagen",
      "abc125",
      25
    );
    test.addProduct(
      "Producto prueba 4",
      "Este es un producto prueba 4",
      800,
      "Sin imagen",
      "ksk458",
      27
    );
    test.addProduct(
      "Producto prueba 5",
      "Este es un producto prueba 5",
      1200,
      "Sin imagen",
      "ksi584",
      38
    );
    test.addProduct(
      "Producto prueba 6",
      "Este es un producto prueba 6",
      485,
      "Sin imagen",
      "587cde",
      78
    );
    test.addProduct(
      "Producto prueba 7",
      "Este es un producto prueba 7",
      550,
      "Sin imagen",
      "kdu478",
      47
    );
    test.addProduct(
      "Producto prueba 8",
      "Este es un producto prueba 8",
      790,
      "Sin imagen",
      "drw834",
      15
    );
    console.log(test.getProducts());
      await test.getProductById(1);
    await test.getProductById(5);
    await test.updateProduct(2, "stock", 24);
    await test.deleteProduct(3);
    await test.deleteProduct(5); 
  } catch (error) {
    console.log(error);
  }
})(); */

module.exports = { ProductManager };
