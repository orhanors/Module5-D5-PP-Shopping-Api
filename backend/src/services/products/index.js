const express = require("express");
const fs = require("fs"); //import to read and write file
const path = require("path"); //for relative pathing to json file
const uniqid = require("uniqid"); //for generating unique id for each student
const { check, validationResult, body } = require("express-validator");
const router = express.Router();
const multer = require("multer");
const Joi = require("joi");
const { writeDB, readDB } = require("../../lib/utilities");

const productsFilePath = path.join(__dirname, "products.json");
const reviewsFilePath = path.join(__dirname, "reviews.json");

/**
 * 
 *  {
        "_id": "5d318e1a8541744830bef139", //SERVER GENERATED
        "name": "app test 1",  //REQUIRED
        "description": "somthing longer", //REQUIRED
        "brand": "nokia", //REQUIRED
        "imageUrl": "https://drop.ndtv.com/TECH/product_database/images/2152017124957PM_635_nokia_3310.jpeg?downsize=*:420&output-quality=80",
        "price": 100, //REQUIRED
        "category": "smartphones"
        "createdAt": "2019-07-19T09:32:10.535Z", //SERVER GENERATED
        "updatedAt": "2019-07-19T09:32:10.535Z", //SERVER GENERATED
    }
 
 */
const validateInput = (dataToValidate) => {
	const schema = Joi.object().keys({
		name: Joi.string().min(3).max(30).required(),
		description: Joi.string().min(3).max(200).required(),
		brand: Joi.string().min(3).required(),
		price: Joi.number().required(),
		category: Joi.string().min(2),
	});

	console.log(schema.validate(dataToValidate));
	return schema.validate(dataToValidate); //error,value
};

// "/" GET ALL PRODUCTS
router.get("/", async (req, res, next) => {
	try {
		const productsDB = await readDB(productsFilePath);
		if (req.query && req.query.category) {
			const filteredData = productsDB.filter(
				(product) =>
					product.hasOwnProperty("category") &&
					product.category
						.toLowerCase()
						.includes(req.query.category.toLowerCase())
			);
			res.send(filteredData);
		}
		res.send(productsDB);
	} catch (error) {
		console.log(error);
		next(error);
	}
});

// "/" POST A PRODUCT
router.post("/", async (req, res, next) => {
	try {
		const { error } = validateInput(req.body);

		if (error) {
			let err = new Error();
			err.message = error.details[0].message;
			err.httpStatusCode = 400;
			next(err);
		} else {
			let newProduct = {
				...req.body,
				_id: uniqid(),
				createdAt: new Date(),
			};

			const allProducts = await readDB(productsFilePath);
			allProducts.push(newProduct);

			await writeDB(productsFilePath, allProducts);
			res.status(200).send(newProduct);
		}
	} catch (error) {
		console.log(error);
		next(error);
	}
});

// "/:id" GET A SINGLE PRODUCT
router.get("/:id", async (req, res, next) => {
	try {
		const allProducts = await readDB(productsFilePath);
		let product = allProducts.find((p) => p._id === req.params.id);
		if (!product) {
			const err = new Error();
			err.htttpStatusCode = 404;
			next(err);
		} else {
			res.send(product);
		}
	} catch (err) {
		console.log(err);
		next(err);
	}
});

// "/:id" UPDATE A PRODUCT
router.put("/:id", async (req, res, next) => {});

// "/:id" REMOVE A PRODUCT
router.delete("/:id", async (req, res, next) => {});

// "/:id/reviews" GET ALL REVIEWS FOR A SINGLE PRODUCT
router.get("/:id/reviews", async (req, res, next) => {});

// "/:id/reviews" POST A REVIEW FOR A PRODUCT
router.post("/:id/reviews", async (req, res, next) => {});

// "/:id/reviews" DELETE A REVIEW FOR A PRODUCT
router.delete("/:id/reviews", async (req, res, next) => {});

// "/:id/image" POST IMAGE
router.post("/:id/image", async (req, res, next) => {});

module.exports = router;
