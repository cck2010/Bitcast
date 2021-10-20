import express, { Request } from "express";
import multer from "multer";
import path from "path";
import { productsController } from "../server";

const productsRoutes = express.Router();

//-------------------  for createBids upload profile ---------------------//

const createBidsStorage = multer.diskStorage({
    destination: function (req: Request, file: any, cb: any) {
        cb(null, path.resolve("./createBidsPicture"));
    },
    filename: function (req: Request, file: any, cb: any) {
        cb(
            null,
            `${file.fieldname}-${Date.now()}.${file.mimetype.split("/")[1]}`
        );
    },
});
const createBidsUpload = multer({ storage: createBidsStorage });
const createBidsMulter = createBidsUpload.single("image");

// ^^^^^^^^^^^^^^^^^^ for createBids upload profile ^^^^^^^^^^^^^^^^^^^^//

productsRoutes.get("/categories", (req, res) =>
    productsController.getCategories(req, res)
);
// productsRoutes.get("/categories/:id/products",(req,res)=> productsController.getProducts(req,res));

// Bids Panel
productsRoutes.post("/createBids/submitBid", createBidsMulter, (req, res) =>
    productsController.submitBid(req, res)
);

export default productsRoutes;

//-------------------  for update products info ---------------------//

productsRoutes.put("/liveStream/products/currentPrice", (req, res) =>
    productsController.putBidIncrement(req, res)
);

productsRoutes.put("/liveStream/products/isSelected", (req, res) =>
    productsController.selectProduct(req, res)
);

productsRoutes.put("/liveStream/products/productTime", (req, res) =>
    productsController.startBid(req, res)
);
