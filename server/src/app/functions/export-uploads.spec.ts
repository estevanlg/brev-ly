import { randomUUID } from 'node:crypto'
import { describe, expect, it, vi } from 'vitest'
import { exportUploads } from '@/app/functions/export-uploads'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { isRight, unwrapEither } from '@/infra/shared/either'
import * as upload from '@/infra/storage/upload-file-to-storage'

describe('export uploads', () => {
	it('should be able to export uploads', async () => {
		const uploadStub = vi
			.spyOn(upload, 'uploadFileToStorage')
			.mockImplementationOnce(async () => {
				return {
					key: `${randomUUID()}.csv`,
					url: 'http://example.com/file.csv',
				}
			})

		const sut = await exportUploads()

		const generatedCSVStream = uploadStub.mock.calls[0][0].contentStream
		const csvAsString = await new Promise<string>((resolve, reject) => {
			const chunks: Buffer[] = []

			generatedCSVStream.on('data', (chunk: Buffer) => {
				chunks.push(chunk)
			})

			generatedCSVStream.on('end', () => {
				resolve(Buffer.concat(chunks).toString('utf-8'))
			})

			generatedCSVStream.on('error', err => {
				reject(err)
			})
		})

		const csvAsArray = csvAsString
			.trim()
			.split('\n')
			.map(row => row.split(','))

		expect(isRight(sut)).toBe(true)
		expect(unwrapEither(sut).reportUrl).toBe('http://example.com/file.csv')

		console.log('csvAsArray', csvAsArray)

		const result = await db.select().from(schema.links)

		for (const r of result) {
			expect(csvAsArray).toContainEqual([
				r.originalUrl,
				r.shortenedUrl,
				String(r.visitorCounter),
				expect.any(String),
			])
		}
	})
})
