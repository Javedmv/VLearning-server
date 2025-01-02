import multer from "multer";
import fs from "fs";
import path from "path";
import { NextFunction, Request, Response } from "express";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const projectRoot = path.join(process.cwd());
      let uploadPath = path.join(projectRoot, 'uploads');
      console.log(projectRoot, 'here is hte path and ')
  
      if (file.fieldname === 'category') {
        uploadPath = path.join(uploadPath, 'category');
      }
      fs.mkdirSync(uploadPath, { recursive: true });
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const filename = `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`;
      cb(null, filename);
    }
  });
  
  const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (file.fieldname === 'category') {
      if (file.mimetype.startsWith('image/')) {
        cb(null, true);
      } else {
        cb(new Error("Only image files are allowed for category"));
      }
    } else {
        cb(null,false)
    }
  };
  
  const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
      fileSize: 100 * 1024 * 1024 // 100 MB limit
    }
  }).single("category");
  
  export const uploadMiddleware = (req: Request, res: Response, next: NextFunction) => {
    console.log("Middleware reached");
    upload(req, res, (err) => {
      console.log("Multer processing done");
      if (err instanceof multer.MulterError) {
        console.error('Multer error:', err);
        return res.status(400).json({
          success: false,
          message: `Upload error: ${err.message}`
        });
      } else if (err) {
        console.error('Unknown error:', err?.message);
        return res.status(500).json({
          success: false,
          message: `Unknown error: ${err.message}`
        });
      }
  
      // Process the uploaded files
      if (req.file) {
        const file = req.file as Express.Multer.File;
        if (!req.body.files) req.body.files = {};
        req.body.files.category = file.path;
    }
  
      console.log('Files processed successfully:', req.body.files);
      next();
    });
  };

// export const uploadMiddleware = multer({
//     storage: multer.diskStorage({
//       destination: function (req, file, cb) {
//         const uploadPath = path.join(process.cwd(), 'uploads');
//         cb(null, uploadPath);
//       },
//       filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname);
//       }
//     })
//   }).single('category');