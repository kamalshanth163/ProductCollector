const sqlCon = require("./connection");
const DateTimeService = require('../services/DateTimeService');

const vehicles = [
    {
        name: "Car",
        type: "Car",
        charge_per_meter: 1.0,
        capacity: 4
    },
    {
        name: "Minivan",
        type: "Minivan",
        charge_per_meter: 2.0,
        capacity: 6
    },
    {
        name: "Van",
        type: "Van",
        charge_per_meter: 5.0,
        capacity: 8
    }
]

class Seed {

    constructor() {
        this.createAllTables();
        this.insertAdmins();
        vehicles.forEach(vehicle => {
            this.insertVehicle(vehicle);
        });
    }

    insertAdmins() {
        var currentLocalTime = new DateTimeService().getLocalDateTime(new Date());
        sqlCon.query(
        `
        INSERT INTO admins (name, phone, email, password, created_at)
        SELECT ?,?,?,?,?
        FROM DUAL
        WHERE NOT EXISTS(
            SELECT 1
            FROM admins
            WHERE email = 'admin@gmail.com'
        )
        LIMIT 1;`, 
        [
            "Admin",
            "0812223333",
            "admin@gmail.com",
            "password",
            currentLocalTime
        ]
        , (err, results) => {
            if (err) {
                console.log(err.message);
            }
        });
    }

    insertVehicle(vehicle) {
        var currentLocalTime = new DateTimeService().getLocalDateTime(new Date());
        sqlCon.query(
            `INSERT INTO vehicles (name, type, charge_per_meter, capacity, created_at, updated_at)
            SELECT ?,?,?,?,?,?
            FROM DUAL
            WHERE NOT EXISTS(
                SELECT 1
                FROM vehicles
                WHERE name = '${vehicle.name}' AND type = '${vehicle.type}'
            )
            LIMIT 1;`,
            [
                vehicle.name,
                vehicle.type,
                vehicle.charge_per_meter,
                vehicle.capacity,
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
        CREATE TABLE if not exists admins (
            id INT NOT NULL AUTO_INCREMENT,
            name VARCHAR(100),
            email VARCHAR(100),
            phone VARCHAR(100),
            password VARCHAR(100),
            created_at DATETIME,
            updated_at DATETIME,
            PRIMARY KEY (id)
        );

        CREATE TABLE if not exists users (
            id INT NOT NULL AUTO_INCREMENT,
            name VARCHAR(100),
            email VARCHAR(100),
            phone VARCHAR(100),
            password VARCHAR(100),
            created_at DATETIME,
            updated_at DATETIME,
            PRIMARY KEY (id)
        );

        CREATE TABLE if not exists drivers (
            id INT NOT NULL AUTO_INCREMENT,
            name VARCHAR(100),
            email VARCHAR(100),
            phone VARCHAR(100),
            password VARCHAR(100),
            license_id VARCHAR(100),
            availability BOOLEAN,
            created_at DATETIME,
            updated_at DATETIME,
            PRIMARY KEY (id)
        );

        CREATE TABLE if not exists vehicles (
            id INT NOT NULL AUTO_INCREMENT,
            name VARCHAR(100),
            type VARCHAR(100),
            charge_per_meter DECIMAL(13,2),
            capacity INT,
            created_at DATETIME,
            updated_at DATETIME,
            PRIMARY KEY (id)
        );

        CREATE TABLE if not exists bookings (
            id INT NOT NULL AUTO_INCREMENT,
            start_location VARCHAR(100),
            end_location VARCHAR(100),
            distance DECIMAL(13,2),
            total_charge DECIMAL(13,2),
            status VARCHAR(100),
            duration DECIMAL(13,2),
            user_id INT,
            driver_id INT,
            vehicle_id INT,
            created_at DATETIME,
            updated_at DATETIME,
            PRIMARY KEY (id),
            FOREIGN KEY (user_id) REFERENCES users(id),
            FOREIGN KEY (driver_id) REFERENCES drivers(id),
            FOREIGN KEY (vehicle_id) REFERENCES vehicles(id)
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