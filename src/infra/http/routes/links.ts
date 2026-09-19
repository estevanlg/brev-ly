import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { createLink } from '@/app/functions/create-link'

export const registerLinksRoutes: FastifyPluginAsyncZod = async server => {
	server.post(
		'/links',
		{
			schema: {
				summary: 'Create a new link',
				body: z.object({
					originalUrl: z.url(),
					shortenedUrl: z.string().regex(/^[a-zA-Z0-9_-]+$/, {
						message:
							'shortenedUrl deve conter apenas letras e números, sem espaços ou caracteres especiais',
					}),
				}),
				response: {
					201: z.object({
						id: z.string(),
						originalUrl: z.url(),
						shortenedUrl: z.string().regex(/^[a-zA-Z0-9_-]+$/, {
							message:
								'shortenedUrl deve conter apenas letras e números, sem espaços ou caracteres especiais',
						}),
						visitorCounter: z.number(),
						//createdAt: z.string().datetime(),
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
			const link = await createLink(request.body)

			if (!link) {
				return reply.status(409).send({ message: 'Link already exists' })
			}

			return reply.status(201).send(link)
		}
	)
}
