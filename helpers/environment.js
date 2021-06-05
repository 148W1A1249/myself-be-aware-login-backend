const dotenv = require('dotenv').config();

const DBURL = process.env.DBURL || process.env.DB_URL;
const port = process.env.PORT || 8000;

module.exports = {DBURL,port}