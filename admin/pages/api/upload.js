import multiparty from 'multiparty'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import fs from 'fs'
import mime from 'mime-types'


export default async function handler(req, res) {
    const form = new multiparty.Form()

    const { fields, files } = await new Promise((resolve, reject) => {
        form.parse(req, function (err, fields, files) {
            if (err) reject(err)
            resolve({ fields, files })
        })
    })
    const client = new S3Client({
        region: process.env.AWS_REGION,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
    })
    const links = []
    for (const file of files.file) {
        const ext = file.originalFilename.split('.').pop()
        const fileName = `${file.originalFilename}-${Date.now()}.${ext}`
        await client.send(
            new PutObjectCommand({
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: fileName,
                Body: fs.readFileSync(file.path),
                ACL: 'public-read',
                ContentType: mime.lookup(file.path),
            })
        )
        links.push(`https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`)
    }
    res.json({ links })

}

export const config = {
    api: {
        bodyParser: false,
    },
}
