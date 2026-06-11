const PDFDocument = require("pdfkit");

const Contract = require("../models/Contract");


// ✅ DOWNLOAD INVOICE
exports.downloadInvoice = async (req, res) => {
  try {

    const contract = await Contract.findById(req.params.id)
      .populate("buyerId", "name email")
      .populate("farmerId", "name email")
      .populate("cropId");

    if (!contract) {
      return res.status(404).json({
        message: "Contract not found",
      });
    }

    // PDF setup
    const doc = new PDFDocument();

    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=invoice-${contract._id}.pdf`
    );

    doc.pipe(res);

    // Title
    doc
      .fontSize(24)
      .text("AgriConnect Invoice", {
        align: "center",
      });

    doc.moveDown();

    // Contract Details
    doc.fontSize(16).text("Contract Details");

    doc.moveDown();

    doc.text(`Invoice ID: ${contract._id}`);

    doc.text(`Crop: ${contract.cropId?.cropName}`);

    doc.text(`Quantity: ${contract.quantity}`);

    doc.text(`Price: ₹${contract.price}`);

    doc.text(`Status: ${contract.status}`);

    doc.text(`Payment: ${contract.paymentStatus}`);

    doc.moveDown();

    // Buyer Details
    doc.fontSize(16).text("Buyer Details");

    doc.moveDown();

    doc.text(`Name: ${contract.buyerId?.name}`);

    doc.text(`Email: ${contract.buyerId?.email}`);

    doc.moveDown();

    // Farmer Details
    doc.fontSize(16).text("Farmer Details");

    doc.moveDown();

    doc.text(`Name: ${contract.farmerId?.name}`);

    doc.text(`Email: ${contract.farmerId?.email}`);

    doc.moveDown();

    doc.text("Thank you for using AgriConnect ❤️", {
      align: "center",
    });

    doc.end();

  } catch (err) {

    res.status(500).json({
      error: err.message,
    });

  }
};