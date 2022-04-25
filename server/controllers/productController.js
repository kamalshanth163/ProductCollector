const sqlCon = require("../db/connection");
const DateTimeService = require('../services/DateTimeService');

const getAllProducts = (req, res) => {
    sqlCon.query("SELECT * FROM products", (err, results) => {
        if(err) return res.sendStatus(400);
        return res.send(results);
    })
};

const getProductById = (req, res) => {
    sqlCon.query(`SELECT * FROM products WHERE id = ${req.params.id}`, (err, results) => {
        if(err) return res.sendStatus(400);
        return res.send(results);
    })
}

const uploadProductImages = (req, res) => {

    // console.log("productId", productId);
    // console.log("files: ", files[0].name);

    if(files == null) return res.sendStatus(400).json({ msg: 'No files uploaded' });

    // for(i=)
    console.log(files);
}

const postProduct = (req, res) => {
    var currentLocalTime = new DateTimeService().getLocalDateTime(new Date());

    // var images = uploadProductImages(req.body.image);
    // req.body.image = "";

    sqlCon.query(
        `INSERT INTO products (name, brand, weight, usage_time, description, image, holder_id, category_id, created_at, updated_at)
        SELECT ?,?,?,?,?,?,?,?,?,?
        FROM DUAL
        WHERE NOT EXISTS(
            SELECT 1
            FROM products
            WHERE name = '${req.body.name}' AND brand = '${req.body.brand}'
        )
        LIMIT 1;`,
        [
            req.body.name,
            req.body.brand,
            req.body.weight,
            req.body.usage_time,
            req.body.description,
            req.body.image,
            req.body.holder_id,
            req.body.category_id,
            currentLocalTime,
            currentLocalTime,
        ]
    , (err, results) => {
        if(err) {
            console.log(err);
            return res.sendStatus(400)
        };
        return res.send(results); 
    })
}

const updateProduct = (req, res) => {
    var currentLocalTime = new DateTimeService().getLocalDateTime(new Date());
    var updatedAt = new Date(currentLocalTime).toISOString();
  
    sqlCon.query(
        `
        SET SQL_MODE='ALLOW_INVALID_DATES';
        UPDATE products 
        SET 
        name = '${req.body.name}',
        brand = '${req.body.brand}',
        weight = '${req.body.weight}',
        usage_time = '${req.body.usage_time}',
        description = '${req.body.description}',
        image = '${req.body.image}',
        holder_id = '${req.body.holder_id}',
        category_id = '${req.body.category_id}',
        updated_at = '${updatedAt}'
        WHERE id = '${req.body.id}';`
    , (err, results) => {
        if(err) return res.sendStatus(400);
        return res.send(results); 
    })
}

const deleteProduct = (req, res) => {
    sqlCon.query(
        `DELETE FROM products WHERE id = ${req.params.id};`
    , (err, results) => {
        if(err) return res.sendStatus(400);
        return res.send(results); 
    })
}

module.exports = {
    getAllProducts,
    getProductById,
    postProduct,
    updateProduct,
    deleteProduct,
    uploadProductImages
};

