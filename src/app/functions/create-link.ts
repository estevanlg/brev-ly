import { z } from 'zod'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'

const createLinkInput = z.object({
	originalUrl: z.url(),
	shortenedUrl: z.string().regex(/^[a-zA-Z0-9_-]+$/, {
		message:
			'shortenedUrl deve conter apenas letras e números, sem espaços ou caracteres especiais',
	}),
})

type CreateLinkInput = z.infer<typeof createLinkInput>

export async function createLink(input: CreateLinkInput) {
	const { originalUrl, shortenedUrl } = createLinkInput.parse(input)

	const [link] = await db
		.insert(schema.links)
		.values({
			originalUrl: originalUrl,
			shortenedUrl: shortenedUrl,
		})
		.onConflictDoNothing()
		.returning()

	return link
}
