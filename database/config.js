const dotenv = require("dotenv");
dotenv.config({ path: "../config.env" });

module.exports = {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'dc5dkev52c711h',
    ssl: {    
        require: true,
        rejectUnauthorized: false 
      },
    define: {
        timestam: true,
        uderscored: true        
    }
}