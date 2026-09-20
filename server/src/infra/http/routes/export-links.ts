import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { exportUploads } from '@/app/functions/export-uploads'
import { unwrapEither } from '@/infra/shared/either'

export const exportLinksRoute: FastifyPluginAsyncZod = async server => {
	server.get(
		'/links/export',
		{
			schema: {
				summary: 'Export links to CSV',
				response: {
					200: z.object({
						reportUrl: z.url().describe('Public URL to download CSV'),
					}),
				},
			},
		},
		async (_request, reply) => {
			const result = await exportUploads()
			const { reportUrl } = unwrapEither(result)

			return reply.status(200).send({ reportUrl })
		}
	)
}
