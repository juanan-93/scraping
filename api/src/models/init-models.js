var DataTypes = require("sequelize").DataTypes;
var _branches = require("./branches");
var _businesses = require("./businesses");
var _clients = require("./clients");
var _distributors = require("./distributors");
var _locale_seo = require("./locale_seo");
var _locale_slug_seo = require("./locale_slug_seo");
var _menu = require("./menu");
var _menu_items = require("./menu_items");
var _orders = require("./orders");
var _orders_details = require("./orders_details");
var _payment_methods = require("./payment_methods");
var _prices = require("./prices");
var _products = require("./products");
var _products_categories = require("./products_categories");
var _products_distributors = require("./products_distributors");
var _recipes = require("./recipes");
var _sales = require("./sales");
var _sales_details = require("./sales_details");
var _tables = require("./tables");
var _taxes = require("./taxes");
var _ubications = require("./ubications");
var _workers = require("./workers");

function initModels(sequelize) {
  var branches = _branches(sequelize, DataTypes);
  var businesses = _businesses(sequelize, DataTypes);
  var clients = _clients(sequelize, DataTypes);
  var distributors = _distributors(sequelize, DataTypes);
  var locale_seo = _locale_seo(sequelize, DataTypes);
  var locale_slug_seo = _locale_slug_seo(sequelize, DataTypes);
  var menu = _menu(sequelize, DataTypes);
  var menu_items = _menu_items(sequelize, DataTypes);
  var orders = _orders(sequelize, DataTypes);
  var orders_details = _orders_details(sequelize, DataTypes);
  var payment_methods = _payment_methods(sequelize, DataTypes);
  var prices = _prices(sequelize, DataTypes);
  var products = _products(sequelize, DataTypes);
  var products_categories = _products_categories(sequelize, DataTypes);
  var products_distributors = _products_distributors(sequelize, DataTypes);
  var recipes = _recipes(sequelize, DataTypes);
  var sales = _sales(sequelize, DataTypes);
  var sales_details = _sales_details(sequelize, DataTypes);
  var tables = _tables(sequelize, DataTypes);
  var taxes = _taxes(sequelize, DataTypes);
  var ubications = _ubications(sequelize, DataTypes);
  var workers = _workers(sequelize, DataTypes);

  ubications.belongsTo(branches, { as: "branch", foreignKey: "branch_id"});
  branches.hasMany(ubications, { as: "ubications", foreignKey: "branch_id"});
  workers.belongsTo(branches, { as: "branch", foreignKey: "branch_id"});
  branches.hasMany(workers, { as: "workers", foreignKey: "branch_id"});
  branches.belongsTo(businesses, { as: "business", foreignKey: "business_id"});
  businesses.hasMany(branches, { as: "branches", foreignKey: "business_id"});
  orders.belongsTo(clients, { as: "client", foreignKey: "client_id"});
  clients.hasMany(orders, { as: "orders", foreignKey: "client_id"});
  sales.belongsTo(clients, { as: "client", foreignKey: "client_id"});
  clients.hasMany(sales, { as: "sales", foreignKey: "client_id"});
  products_distributors.belongsTo(distributors, { as: "distributor", foreignKey: "distributor_id"});
  distributors.hasMany(products_distributors, { as: "products_distributors", foreignKey: "distributor_id"});
  recipes.belongsTo(distributors, { as: "product_distributor", foreignKey: "product_distributor_id"});
  distributors.hasMany(recipes, { as: "recipes", foreignKey: "product_distributor_id"});
  menu_items.belongsTo(menu_items, { as: "menu", foreignKey: "menuId"});
  menu_items.hasMany(menu_items, { as: "menu_items", foreignKey: "menuId"});
  menu_items.belongsTo(menu_items, { as: "localeSeo", foreignKey: "localeSeoId"});
  menu_items.hasMany(menu_items, { as: "localeSeo_menu_items", foreignKey: "localeSeoId"});
  menu_items.belongsTo(menu_items, { as: "localeSlug", foreignKey: "localeSlugId"});
  menu_items.hasMany(menu_items, { as: "localeSlug_menu_items", foreignKey: "localeSlugId"});
  orders_details.belongsTo(orders, { as: "order", foreignKey: "order_id"});
  orders.hasMany(orders_details, { as: "orders_details", foreignKey: "order_id"});
  sales.belongsTo(payment_methods, { as: "payment_method", foreignKey: "payment_method_id"});
  payment_methods.hasMany(sales, { as: "sales", foreignKey: "payment_method_id"});
  orders_details.belongsTo(prices, { as: "price", foreignKey: "price_id"});
  prices.hasMany(orders_details, { as: "orders_details", foreignKey: "price_id"});
  sales_details.belongsTo(prices, { as: "price", foreignKey: "price_id"});
  prices.hasMany(sales_details, { as: "sales_details", foreignKey: "price_id"});
  prices.belongsTo(products, { as: "product", foreignKey: "product_id"});
  products.hasMany(prices, { as: "prices", foreignKey: "product_id"});
  products.belongsTo(products_categories, { as: "category", foreignKey: "category_id"});
  products_categories.hasMany(products, { as: "products", foreignKey: "category_id"});
  recipes.belongsTo(products_distributors, { as: "product", foreignKey: "product_id"});
  products_distributors.hasMany(recipes, { as: "recipes", foreignKey: "product_id"});
  sales_details.belongsTo(sales, { as: "sale", foreignKey: "sale_id"});
  sales.hasMany(sales_details, { as: "sales_details", foreignKey: "sale_id"});
  orders.belongsTo(tables, { as: "table", foreignKey: "table_id"});
  tables.hasMany(orders, { as: "orders", foreignKey: "table_id"});
  sales.belongsTo(tables, { as: "table", foreignKey: "table_id"});
  tables.hasMany(sales, { as: "sales", foreignKey: "table_id"});
  prices.belongsTo(taxes, { as: "tax", foreignKey: "tax_id"});
  taxes.hasMany(prices, { as: "prices", foreignKey: "tax_id"});
  orders.belongsTo(workers, { as: "worker", foreignKey: "worker_id"});
  workers.hasMany(orders, { as: "orders", foreignKey: "worker_id"});
  sales.belongsTo(workers, { as: "worker", foreignKey: "worker_id"});
  workers.hasMany(sales, { as: "sales", foreignKey: "worker_id"});

  return {
    branches,
    businesses,
    clients,
    distributors,
    locale_seo,
    locale_slug_seo,
    menu,
    menu_items,
    orders,
    orders_details,
    payment_methods,
    prices,
    products,
    products_categories,
    products_distributors,
    recipes,
    sales,
    sales_details,
    tables,
    taxes,
    ubications,
    workers,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
