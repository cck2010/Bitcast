import express, { Request} from "express";
import multer from "multer";
import path from "path";
import { productsController } from "../server";

const productsRoutes = express.Router();

//-------------------  for submit LiveStreaming upload picture ---------------------//


const submitLiveStorage = multer.diskStorage({
    destination: function (req: Request, file: any, cb: any) {
      cb(null, path.resolve('./submitLivePicture'));
    },
    filename: function (req: Request, file: any, cb: any) {
      cb(null, `${file.fieldname}-${Date.now()}.${file.mimetype.split('/')[1]}`);
    }
  })
  const submitLiveUpload = multer({ storage: submitLiveStorage })
  const submitLiveMulter = submitLiveUpload.single('liveImage');
  
  
// ^^^^^^^^^^^^^^^^^^ for  submit LiveStreaming upload picture  ^^^^^^^^^^^^^^^^^^^^//

//-------------------  for submit products upload picture ---------------------//


const submitProductsStorage = multer.diskStorage({
    destination: function (req: Request, file: any, cb: any) {
      cb(null, path.resolve('./submitProductsPicture'));
    },
    filename: function (req: Request, file: any, cb: any) {
      cb(null, `${file.fieldname}-${Date.now()}.${file.mimetype.split('/')[1]}`);
    }
  })
  const submitProductsUpload = multer({ storage: submitProductsStorage })
  const submitProductsMulter = submitProductsUpload.single('productImage');
  
  
  // ^^^^^^^^^^^^^^^^^^ for submit products upload picture  ^^^^^^^^^^^^^^^^^^^^//







productsRoutes.get("/categories",(req,res)=> productsController.getCategories(req,res));
// productsRoutes.get("/categories/:id/products",(req,res)=> productsController.getProducts(req,res));


// Bids Panel
productsRoutes.post("/createBids/submitBid/submitLive",submitLiveMulter,(req,res)=>productsController.submitBidLiveInfo(req,res));
productsRoutes.post("/createBids/submitBid/submitProduct",submitProductsMulter,(req,res)=>productsController.submitProductInfo(req,res));

export default productsRoutes;