import vendorModel from "../Models/vendorModel.js";

// Add vendor
const addVendorPage = async (req, res) => {
    try {
        const vendor = new vendorModel(req.body);
        const result = await vendor.save({ w: "majority", j: true });
        res.status(201).send(result); // Created status
    } catch (error) {
        console.error("Error adding vendor:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Fetch all vendors
const fetchVendorData = async (req, res) => {
    try {
        const vendors = await vendorModel.find();
        if (vendors.length > 0) {
            res.status(200).send(vendors); // OK status
        } else {
            res.status(404).json({ message: "No data found" });
        }
    } catch (error) {
        console.error("Error fetching vendor data:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Delete vendor entry
const deleteVendorEntry = async (req, res) => {
    try {
        const result = await vendorModel.deleteOne({ _id: req.params.id });
        if (result.deletedCount > 0) {
            res.status(200).json({ message: "Vendor deleted successfully" });
        } else {
            res.status(404).json({ message: "Vendor not found" });
        }
    } catch (error) {
        console.error("Error deleting vendor:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get single vendor details
const getSingleVendorDetails = async (req, res) => {
    try {
        const result = await vendorModel.findOne({ _id: req.params.id });
        if (result) {
            res.status(200).send(result); // OK status
        } else {
            res.status(404).json({ message: "Vendor not found" });
        }
    } catch (error) {
        console.error("Error fetching vendor details:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Update vendor details
const updateVendorDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        if (!updateData || Object.keys(updateData).length === 0) {
            return res.status(400).json({ message: "No data provided for update" });
        }

        const result = await vendorModel.updateOne(
            { _id: id },
            { $set: updateData }
        );

        if (result.nModified > 0) {
            res.status(200).json({ message: "Vendor updated successfully", result });
        } else {
            res.status(404).json({ message: "Vendor not found or no changes made" });
        }
    } catch (error) {
        console.error("Error updating vendor:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export { addVendorPage, fetchVendorData, deleteVendorEntry, getSingleVendorDetails, updateVendorDetails };
