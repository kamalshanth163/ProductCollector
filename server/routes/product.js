const express = require('express');
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);

router.post("/upload-images/:productId", productController.uploadProductImages);

router.post("/", productController.postProduct);

router.put("/", productController.updateProduct);

router.delete("/:id", productController.deleteProduct);

module.exports = router;


