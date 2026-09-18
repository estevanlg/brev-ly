import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'

export const registerLinksRoutes: FastifyPluginAsyncZod = async server => {
	server.post(
		'/links',
		{
			schema: {
				summary: 'Create a new link',
				body: z.object({
					originalUrl: z.url(),
					shortenedUrl: z.url(),
				}),
				response: {
					201: z.object({
						id: z.string(),
					}),
					409: z
						.object({
							message: z.string(),
						})
						.describe('Link already exists.'),
				},
			},
		},
		async (request, reply) => {
			await db.insert(schema.links).values({
				originalUrl: request.body.originalUrl,
				shortenedUrl: request.body.shortenedUrl,
			})

			return reply.status(201).send({ id: 'some-generated-id' })
		}
	)
}
