import { eq } from 'drizzle-orm'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'

export const deleteLinkRoute: FastifyPluginAsyncZod = async server => {
	server.delete(
		'/links/:id',
		{
			schema: {
				summary: 'Delete link by id',
				params: z.object({ id: z.string() }),
				response: {
					200: z.object({ message: z.string() }),
					404: z.object({ message: z.string() }),
				},
			},
		},
		async (request, reply) => {
			const result = await db
				.delete(schema.links)
				.where(eq(schema.links.id, request.params.id))
				.returning()

			if (result.length === 0)
				return reply.status(404).send({ message: 'Link not found' })

			return reply.send({ message: 'Link deleted successfully' })
		}
	)
}
