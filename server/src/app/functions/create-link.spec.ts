import { randomUUID } from 'node:crypto'
import { eq } from 'drizzle-orm'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { createLink } from './create-link'

const shortenedUrl = `${randomUUID()}`

describe('create-link', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('deve criar um link com sucesso', async () => {
		const sut = await createLink({
			originalUrl: 'https://google.com',
			shortenedUrl: shortenedUrl,
		})

		const result = await db
			.select()
			.from(schema.links)
			.where(eq(schema.links.shortenedUrl, shortenedUrl))

		expect(sut).toEqual(result[0])
	})

	it('deve retornar undefined se o link já existe (conflito)', async () => {
		const sut = await createLink({
			originalUrl: 'https://google.com',
			shortenedUrl: shortenedUrl,
		})

		expect(sut).toBeUndefined()
	})
})
