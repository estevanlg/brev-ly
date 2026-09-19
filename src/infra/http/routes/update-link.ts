import { eq, sql } from 'drizzle-orm'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'

export const updateVisitorCounterRoute: FastifyPluginAsyncZod =
	async server => {
		server.post(
			'/links/:id/visitor-counter',
			{
				schema: {
					summary: 'Increment visitor counter',
					params: z.object({ id: z.string() }),
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
				const [updated] = await db
					.update(schema.links)
					.set({ visitorCounter: sql`${schema.links.visitorCounter} + 1` })
					.where(eq(schema.links.id, request.params.id))
					.returning()

				if (!updated) return reply.status(404).send({ message: 'Link not found' })

				return reply.send(updated)
			}
		)
	}
