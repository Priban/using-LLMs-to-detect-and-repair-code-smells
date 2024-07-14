class ProductCatalog {
  constructor() {
    this.products = [];
  }

  addProduct(product) {
    this.products.push(product);
  }

  removeProduct(productId) {
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === productId) {
        this.products.splice(i, 1);
        break;
      }
    }
  }

  updateProduct(updatedProduct) {
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === updatedProduct.id) {
        this.products[i] = updatedProduct;
        break;
      }
    }
  }

  findProductById(productId) {
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === productId) {
        return this.products[i];
      }
    }
    return null;
  }

  searchProducts(query) {
    let results = [];
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].name.includes(query) || this.products[i].description.includes(query)) {
        results.push(this.products[i]);
      }
    }
    return results;
  }

  listAllProducts() {
    return this.products;
  }

  sortProducts() {
    for (let i = 0; i < this.products.length; i++) {
      for (let j = 0; j < this.products.length - i - 1; j++) {
        if (this.products[j].price > this.products[j + 1].price) {
          let temp = this.products[j];
          this.products[j] = this.products[j + 1];
          this.products[j + 1] = temp;
        } else if (this.products[j].price === this.products[j + 1].price) {
          if (this.products[j].name > this.products[j + 1].name) {
            let temp = this.products[j];
            this.products[j] = this.products[j + 1];
            this.products[j + 1] = temp;
          }
        }
      }
    }
  }
}

class API {
  constructor() {
    this.productCatalog = new ProductCatalog();
  }

  addProduct(product) {
    this.productCatalog.addProduct(product);
  }

  removeProduct(productId) {
    this.productCatalog.removeProduct(productId);
  }

  updateProduct(updatedProduct) {
    this.productCatalog.updateProduct(updatedProduct);
  }

  findProductById(productId) {
    return this.productCatalog.findProductById(productId);
  }

  searchProducts(query) {
    return this.productCatalog.searchProducts(query);
  }

  listAllProducts() {
    return this.productCatalog.listAllProducts();
  }

  sortProducts() {
    this.productCatalog.sortProducts();
  }
}

module.exports = { API };