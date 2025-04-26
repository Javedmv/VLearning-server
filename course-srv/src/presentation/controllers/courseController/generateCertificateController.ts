import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies";
import PDFDocument from "pdfkit";
import fetch from "node-fetch";
import { createResponse, StatusCode } from "../../../_lib/constants";


export const generateCertificateController = (dependencies: IDependencies) => {
  const { useCases: { getEnrollmentUseCase } } = dependencies;

  return async (req: Request, res: Response,next:NextFunction) => {
    try {
      const user = req.user;
      const { id } = req.params;
      const username = req.query.username as string;

      if (!user?._id) {
        res.status(401).json({ success: false, message: "User not authenticated" });
        return
      }

      if (!username || !id) {
        res.status(400).json({ success: false, message: "Username and enrollment ID are required" });
        return
      }

      const enrollment = await getEnrollmentUseCase(dependencies).execute(id);
      if (!enrollment) {
        res.status(404).json({ success: false, message: "Enrollment not found" });
        return
      }

      const doc = new PDFDocument({
        size: "A4",
        layout: "landscape",
        margin: 50,
      });

      // Set headers
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${enrollment.courseId.basicDetails.title}_Certificate.pdf"`
      );
      res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
      res.setHeader("Access-Control-Allow-Credentials", "true");
      res.setHeader("Access-Control-Expose-Headers", "Content-Disposition");

      doc.pipe(res);

      // Certificate design
      doc
        .fontSize(30)
        .text("Certificate of Completion", { align: "center" })
        .moveDown(2);
      doc
        .fontSize(20)
        .text("This certifies that", { align: "center" })
        .moveDown(0.5);
      doc
        .fontSize(25)
        .font("Helvetica-Bold")
        .text(username, { align: "center" })
        .font("Helvetica")
        .moveDown(0.5);
      doc
        .fontSize(18)
        .text("has successfully completed the course", { align: "center" })
        .moveDown(1);
      doc
        .fontSize(22)
        .font("Helvetica-Bold")
        .text(`${enrollment.courseId.basicDetails.title}`, { align: "center" })
        .font("Helvetica")
        .moveDown(1);
      doc
        .fontSize(16)
        .text(`Date: ${new Date().toLocaleDateString()}`, { align: "center" });
      doc
        .lineWidth(2)
        .rect(20, 20, doc.page.width - 40, doc.page.height - 40)
        .stroke();

      const thumbnail = enrollment.courseId.basicDetails.thumbnail;
      if (thumbnail) {
        try {
          let imageBuffer: Buffer;

          if (typeof thumbnail === "string" && thumbnail.startsWith("http")) {
            const imageResponse = await fetch(thumbnail);
            if (!imageResponse.ok) {
              throw new Error(`Failed to fetch image: ${imageResponse.statusText}`);
            }
            imageBuffer = Buffer.from(await imageResponse.arrayBuffer());
          } else if (Buffer.isBuffer(thumbnail)) {
            imageBuffer = thumbnail;
          } else {
            console.warn("Thumbnail is not a valid URL or Buffer, skipping image");
            doc.end();
            return;
          }

          doc.image(imageBuffer, 50, 50, { width: 100 });
        } catch (imageError) {
          console.error("Error adding image to PDF:", imageError);
        }
      }

      doc.end();
    } catch (error: unknown) {
      if (error instanceof Error) {
          console.error("Certificate generation error:", error.stack);
          if (!res.headersSent) {
            res.status(StatusCode.INTERNAL_SERVER_ERROR).json(
              createResponse(
                  StatusCode.INTERNAL_SERVER_ERROR,
                  undefined,
                  error.message || "Internal server error while generating certificate" // Custom error message
              )
            );
          }
      } else {
          console.error("Certificate generation error: An unknown error occurred");
          if (!res.headersSent) {
            res.status(StatusCode.INTERNAL_SERVER_ERROR).json(
              createResponse(
                  StatusCode.INTERNAL_SERVER_ERROR,
                  undefined,
                  "Internal server error while generating certificate" // Custom error message
              )
            );
          }
      }
  }
  
  };
};