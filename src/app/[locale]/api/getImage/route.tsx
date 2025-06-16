import { NextResponse } from 'next/server';
import AWS from 'aws-sdk';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get('key');

  if (!key) {
    return NextResponse.json({ error: 'Key is required' }, { status: 400 });
  }

  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    region: process.env.AWS_REGION as string,
  });

  const s3 = new AWS.S3({
    endpoint: 'https://f422107f67f1f1e4da5fa8080e3349b8.r2.cloudflarestorage.com',
    s3ForcePathStyle: true,
    signatureVersion: 'v4'
  });

  const params: AWS.S3.GetObjectRequest = {
    Bucket: process.env.S3_BUCKET_NAME as string,
    Key: `image/${key}`
  };

  try {
    const command = s3.getSignedUrlPromise('getObject', params);
    const presignedUrl = await command;

    return NextResponse.json({ url: presignedUrl });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
