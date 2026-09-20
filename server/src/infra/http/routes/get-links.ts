import { eq } from 'drizzle-orm'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'

export const getLinksRoute: FastifyPluginAsyncZod = async server => {
	server.get(
		'/links',
		{
			schema: {
				summary: 'Get all links',
				response: {
					200: z.array(
						z.object({
							id: z.string(),
							originalUrl: z.string().url(),
							shortenedUrl: z.string(),
							visitorCounter: z.number(),
							createdAt: z.date(),
						})
					),
				},
			},
		},
		async (_request, reply) => {
			const links = await db.select().from(schema.links)

			return reply.status(200).send(links)
		}
	)

	server.get(
		'/links/:shortenedUrl',
		{
			schema: {
				summary: 'Get link by shortenedUrl',
				params: z.object({ shortenedUrl: z.string() }),
				response: {
					200: z.object({
						id: z.string(),
						originalUrl: z.url(),
						shortenedUrl: z.string(),
						visitorCounter: z.number(),
						createdAt: z.date(),
					}),
					404: z.object({ message: z.string() }),
				},
			},
		},
		async (request, reply) => {
			const [link] = await db
				.select()
				.from(schema.links)
				.where(eq(schema.links.shortenedUrl, request.params.shortenedUrl))

			if (!link) {
				return reply.status(404).send({ message: 'Link not found' })
			}

			return reply.status(200).send(link)
		}
	)
}
