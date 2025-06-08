import express, { Response } from 'express';
import multer from 'multer';
import { bucket } from './firebaseAdmin';
import { v4 as uuidv4 } from 'uuid';
import { MulterRequest } from './types';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

async function handleUpload(req: MulterRequest, res: Response) {
  if (!req.file) return res.status(400).send('No file uploaded');

  const fileName = `vehicles/${uuidv4()}-${req.file.originalname}`;
  const file = bucket.file(fileName);

  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype,
    },
  });

stream.on('error', (err) => {
  console.error('🔥 Firebase Upload Error:', err); // 👈 more useful
  res.status(500).send({ error: err.message });
});



  stream.on('finish', async () => {
    await file.makePublic();
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${file.name}`;
    res.status(200).send({ imageUrl: publicUrl });
  });

  stream.end(req.file.buffer);
}

router.post('/upload', upload.single('image'), (req, res) => {
  void handleUpload(req as MulterRequest, res);
});

// ✅ Export as default so it can be imported cleanly in index.ts
export default router;
