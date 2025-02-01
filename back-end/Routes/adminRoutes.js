import express  from "express";
import { addVendorPage, deleteVendorEntry, fetchVendorData, getSingleVendorDetails, updateVendorDetails } from "../Controllers/adminController.js";
const adminRouter = express.Router();

adminRouter
.post("/addvendor",addVendorPage)
.get("/vendors",fetchVendorData)
.delete("/vendor/:id", deleteVendorEntry)
.get("/vendor/:id", getSingleVendorDetails)
.put("/vendor/:id", updateVendorDetails)
export default adminRouter;