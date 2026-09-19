import { PassThrough, Transform } from 'node:stream'
import { pipeline } from 'node:stream/promises'
import { stringify } from 'csv-stringify'
import { db, pg } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeRight } from '@/infra/shared/either'
import { uploadFileToStorage } from '@/infra/storage/upload-file-to-storage'

type ExportUploadsOutput = {
	reportUrl: string
}

export async function exportUploads(): Promise<
	Either<never, ExportUploadsOutput>
> {
	const { sql } = db
		.select({
			originalUrl: schema.links.originalUrl,
			shortenedUrl: schema.links.shortenedUrl,
			visitorCounter: schema.links.visitorCounter,
			createdAt: schema.links.createdAt,
		})
		.from(schema.links)
		.toSQL()

	const cursor = pg.unsafe(sql).cursor(10)

	const csv = stringify({
		delimiter: ',',
		header: true,
		columns: [
			{ key: 'original_url', header: 'Original URL' },
			{ key: 'shortened_url', header: 'Shortened URL' },
			{ key: 'visitor_counter', header: 'Visitor Counter' },
			{ key: 'created_at', header: 'Uploaded at' },
		],
	})

	const uploadToStorageStream = new PassThrough()

	const convertToCSVPipeline = pipeline(
		cursor,
		new Transform({
			objectMode: true,
			transform(chunks: unknown[], _encoding, callback) {
				for (const chunk of chunks) {
					this.push(chunk)
				}

				callback()
			},
		}),
		csv,
		uploadToStorageStream
	)

	const uploadToStorage = uploadFileToStorage({
		contentType: 'text/csv',
		folder: 'downloads',
		fileName: `${new Date().toISOString()}.csv`,
		contentStream: uploadToStorageStream,
	})

	const [{ url }] = await Promise.all([uploadToStorage, convertToCSVPipeline])

	return makeRight({ reportUrl: url })
}
