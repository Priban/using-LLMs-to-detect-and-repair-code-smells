class ProductCatalog {
  constructor() {
    this.products = [];
  }

  addProduct(product) {
    this.products.push(product);
  }

  removeProduct(productId) {
    this.products = this.products.filter(product => product.id !== productId);
  }

  updateProduct(updatedProduct) {
    this.products = this.products.map(product =>
      product.id === updatedProduct.id ? updatedProduct : product
    );
  }

  findProductById(productId) {
    return this.products.find(product => product.id === productId) || null;
  }

  searchProducts(query) {
    return this.products.filter(product =>
      product.name.includes(query) || product.description.includes(query)
    );
  }

  listAllProducts() {
    return this.products;
  }

  sortProducts() {
    this.products.sort((a, b) => {
      if (a.price !== b.price) {
        return a.price - b.price;
      }
      return a.name.localeCompare(b.name);
    });
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