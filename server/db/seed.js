const sqlCon = require("./connection");
const DateTimeService = require('../services/DateTimeService');

const categories = [
    {
        name: "Electronic",
        price_per_kg: 100.00,
    },
    {
        name: "Furniture",
        price_per_kg: 80.00,
    },
    {
        name: "Plastic",
        price_per_kg: 60.00,
    },
    {
        name: "Stationery",
        price_per_kg: 40.00,
    },
    {
        name: "Other",
        price_per_kg: 20.00,
    }
]

class Seed {

    constructor() {
        this.createAllTables();
        categories.forEach(category => {
            this.insertCategory(category);
        });

        // // seed an order and a product temporarily
        var currentLocalTime = new DateTimeService().getLocalDateTime(new Date());

        // sqlCon.query(
        //     `INSERT INTO products (name, brand, weight, usage_time, status, image, holder_id, category_id, created_at, updated_at)
        //     SELECT ?,?,?,?,?,?,?,?,?,?
        //     FROM DUAL
        //     WHERE NOT EXISTS(
        //         SELECT 1
        //         FROM products
        //         WHERE name = 'Laptop'
        //     )
        //     LIMIT 1;`,
        //     [
        //         'Laptop',
        //         "Dell",
        //         2.3,
        //         12,
        //         "available",
        //         "",
        //         1,
        //         1,
        //         currentLocalTime,
        //         currentLocalTime,
        //     ]
        // , (err, results) => {
        //     if (err) {
        //         console.log(err.message);
        //     }
        // });

        sqlCon.query(
            `INSERT INTO products (name, brand, weight, usage_time, status, image, holder_id, category_id, created_at, updated_at)
            SELECT ?,?,?,?,?,?,?,?,?,?
            FROM DUAL
            WHERE NOT EXISTS(
                SELECT 1
                FROM products
                WHERE name = 'Table'
            )
            LIMIT 1;`,
            [
                'Table',
                "Damro",
                3.2,
                5,
                "available",
                "",
                1,
                3,
                currentLocalTime,
                currentLocalTime,
            ]
        , (err, results) => {
            if (err) {
                console.log(err.message);
            }
        });

        // sqlCon.query(
        //     `INSERT INTO orders (status, collector_id, product_id, price, created_at, updated_at)
        //     SELECT ?,?,?,?,?,?
        //     FROM DUAL
        //     WHERE NOT EXISTS(
        //         SELECT 1
        //         FROM orders
        //         WHERE collector_id = 1 AND product_id = 2
        //     )
        //     LIMIT 1;`,
        //     [
        //         'pending',
        //         1,
        //         2,
        //         120.50,
        //         currentLocalTime,
        //         currentLocalTime,
        //     ]
        // , (err, results) => {
        //     if (err) {
        //         console.log(err.message);
        //     }
        // });

        sqlCon.query(
            `INSERT INTO orders (status, collector_id, product_id, price, created_at, updated_at)
            SELECT ?,?,?,?,?,?
            FROM DUAL
            WHERE NOT EXISTS(
                SELECT 1
                FROM orders
                WHERE collector_id = 1 AND product_id = 3
            )
            LIMIT 1;`,
            [
                'completed',
                1,
                3,
                210.00,
                currentLocalTime,
                currentLocalTime,
            ]
        , (err, results) => {
            if (err) {
                console.log(err.message);
            }
        });
    }

    insertCategory(category) {
        var currentLocalTime = new DateTimeService().getLocalDateTime(new Date());
        sqlCon.query(
            `INSERT INTO categories (name, price_per_kg, created_at, updated_at)
            SELECT ?,?,?,?
            FROM DUAL
            WHERE NOT EXISTS(
                SELECT 1
                FROM categories
                WHERE name = '${category.name}'
            )
            LIMIT 1;`,
            [
                category.name,
                category.price_per_kg,
                currentLocalTime,
                currentLocalTime,
            ]
        , (err, results) => {
            if (err) {
                console.log(err.message);
            }
        });
    }



    createAllTables() {
        let createTables = 
        `    
        CREATE TABLE if not exists collectors (
            id INT NOT NULL AUTO_INCREMENT,
            name VARCHAR(100),
            address VARCHAR(100),
            email VARCHAR(100),
            phone VARCHAR(100),
            password VARCHAR(100),
            created_at DATETIME,
            updated_at DATETIME,
            PRIMARY KEY (id)
        );

        CREATE TABLE if not exists holders (
            id INT NOT NULL AUTO_INCREMENT,
            name VARCHAR(100),
            address VARCHAR(100),
            email VARCHAR(100),
            phone VARCHAR(100),
            password VARCHAR(100),
            created_at DATETIME,
            updated_at DATETIME,
            PRIMARY KEY (id)
        );

        CREATE TABLE if not exists categories (
            id INT NOT NULL AUTO_INCREMENT,
            name VARCHAR(100),
            price_per_kg DECIMAL(13,2),
            created_at DATETIME,
            updated_at DATETIME,
            PRIMARY KEY (id)
        );

        CREATE TABLE if not exists products (
            id INT NOT NULL AUTO_INCREMENT,
            name VARCHAR(100),
            brand VARCHAR(100),
            weight DECIMAL(13,2),
            usage_time VARCHAR(100),
            status VARCHAR(100),
            image VARCHAR(100),
            holder_id INT,
            category_id INT,
            created_at DATETIME,
            updated_at DATETIME,
            PRIMARY KEY (id),
            FOREIGN KEY (holder_id) REFERENCES holders(id),
            FOREIGN KEY (category_id) REFERENCES categories(id)
        );

        CREATE TABLE if not exists orders (
            id INT NOT NULL AUTO_INCREMENT,
            status VARCHAR(100),
            collector_id INT,
            product_id INT,
            price DECIMAL(13,2),
            created_at DATETIME,
            updated_at DATETIME,    
            PRIMARY KEY (id),
            FOREIGN KEY (collector_id) REFERENCES collectors(id),
            FOREIGN KEY (product_id) REFERENCES products(id)
        );
        `;

        sqlCon.query(createTables, function(err, results, fields) {
            if (err) {
                console.log(err.message);
            }
        });
    }
}

module.exports = Seed;