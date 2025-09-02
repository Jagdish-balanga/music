import { Router } from 'express';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const router = Router();
const s3 = new S3Client({ region: process.env.AWS_REGION });

router.post('/presign', async (req, res) => {
  const { filename, contentType } = req.body;
  if (!filename || !contentType) return res.status(400).json({ error: 'Missing filename/contentType' });
  const key = `tracks/${Date.now()}-${filename}`;
  const cmd = new PutObjectCommand({ Bucket: process.env.S3_BUCKET, Key: key, ContentType: contentType });
  try {
    const url = await getSignedUrl(s3, cmd, { expiresIn: Number(process.env.PRESIGN_EXPIRES || 300) });
    const publicUrl = `${process.env.S3_PUBLIC_BASE}/${key}`;
    res.json({ url, key, publicUrl });
  } catch (err) {
    res.status(500).json({ error: 'Could not create presigned url' });
  }
});

export default router;
