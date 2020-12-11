const express = require("express");
const fs = require("fs"); //import to read and write file
const path = require("path"); //for relative pathing to json file
const uniqid = require("uniqid"); //for generating unique id for each student
const { check, validationResult, body } = require("express-validator");
const router = express.Router();
const multer = require("multer");
const { writeDB, readDB } = require("../../lib/utilities");

const productsFilePath = path.join(__dirname, "products.json");
const reviewsFilePath = path.join(__dirname, "reviews.json");

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
    next(error);
  }
});

// "/" POST A PRODUCT
router.post("/", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

// "/:id" GET A SINGLE PRODUCT
router.get("/:id", async (req, res, next) => {});

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
