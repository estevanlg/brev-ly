import { fastifyCors } from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { fastify } from 'fastify'
import {
	hasZodFastifySchemaValidationErrors,
	jsonSchemaTransform,
	serializerCompiler,
	validatorCompiler,
} from 'fastify-type-provider-zod'
import { createLinkRoute } from './routes/create-link'
import { deleteLinkRoute } from './routes/delete-link'
import { exportLinksRoute } from './routes/export-links'
import { getLinksRoute } from './routes/get-links'
import { updateVisitorCounterRoute } from './routes/update-link'

const server = fastify()

server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

server.setErrorHandler((error, _request, reply) => {
	if (hasZodFastifySchemaValidationErrors(error)) {
		return reply.status(400).send({
			message: 'Validation Error',
			issues: error.validation,
		})
	}

	console.error(error)
	return reply.status(500).send({ message: 'Internal Server Error' })
})

server.register(fastifyCors, { origin: '*' })

server.register(fastifySwagger, {
	openapi: {
		info: {
			title: 'Brev.ly API Documentation',
			version: '1.0.0',
		},
	},
	transform: jsonSchemaTransform,
})
server.register(fastifySwaggerUi, {
	routePrefix: '/docs',
})

server.register(createLinkRoute)
server.register(getLinksRoute)
server.register(deleteLinkRoute)
server.register(updateVisitorCounterRoute)
server.register(exportLinksRoute)

server.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
	console.log('HTTP server running!')
})
