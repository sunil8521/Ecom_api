import express from "express";
import path from "path";
import multer from "multer";
import { Home, Upload,Addproduct,Allproduct,Delproduct,Updateproduct } from "./functions/function.js";
const router = express.Router();
router.get("/", Home);

const storage = multer.diskStorage({
    destination: "./upload/images",
    filename: (req, file, cb) => {
      return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    },
  });
  const uplaod = multer({ storage: storage });
router.post("/upload", uplaod.single("product"),Upload)
router.get("/allproduct",Allproduct)
router.post("/addproduct",Addproduct)
router.delete("/delproduct/:id",Delproduct)
router.patch("/updateproduct/:id",Updateproduct)
export default router;
