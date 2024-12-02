import { Request, Response, NextFunction } from "express";
import multer from "multer";
import fs from "fs";
import path from "path";


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Get project root directory (up from dist/infrastructure/routes)
        const projectRoot = path.resolve(__dirname, '..', '..', '..');
        let uploadPath = path.join(projectRoot, 'uploads');
        
        if (file.fieldname === 'files.avatar') {
            uploadPath = path.join(uploadPath, 'avatars');
        } else if (file.fieldname === 'files.cv') {
            uploadPath = path.join(uploadPath, 'documents');
        }
        
        // Create directory if it doesn't exist
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
    if (file.fieldname === 'files.avatar') {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed for avatar'));
        }
    } else if (file.fieldname === 'files.cv') {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF files are allowed for CV'));
        }
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 100 * 1024 * 1024 // 100MB limit
    }
}).fields([
    { name: 'files.avatar', maxCount: 1 },
    { name: 'files.cv', maxCount: 1 }
]);

export const uploadMiddleware = (req: Request, res: Response, next: NextFunction) => {
    upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ 
                success: false, 
                error: `Upload error: ${err.message}` 
            });
        } else if (err) {
            return res.status(500).json({ 
                success: false, 
                error: `Unknown error: ${err.message}` 
            });
        }

        // Process the uploaded files
        if (req.files) {
            const files = req.files as { [fieldname: string]: Express.Multer.File[] };
            
            if (!req.body.files) req.body.files = {};
            
            // Simply store the paths of the files that Multer already saved
            if (files['files.avatar']) {
                req.body.files.avatar = files['files.avatar'][0].path;
            }
            
            if (files['files.cv']) {
                req.body.files.cv = files['files.cv'][0].path;
            }
        }

        next();
    });
};