import 'dotenv/config'
/* eslint-disable @typescript-eslint/no-var-requires */
// import cors from "cors";
import cors from '@fastify/cors'
import fastifyEnv from '@fastify/env'
import swagger from '@fastify/swagger'
import Fastify from 'fastify'
import multer from 'fastify-multer'
import { router } from './src/routes/router'

async function main() {
  const fastify = Fastify({
    logger: true,
  })
  const port = process.env.PORT

  try {
    fastify.register(cors)
    fastify.register(fastifyEnv, {
      schema: {
        type: 'object',
        required: [
          'AWS_SECRET_ACCESS_KEY',
          'AWS_SECRET_ACCESS_KEY_ID',
          'OPENAI_API_KEY',
          'DATABASE_URL',
        ],
        properties: {
          AWS_SECRET_ACCESS_KEY: { type: 'string' },
          AWS_SECRET_ACCESS_KEY_ID: { type: 'string' },
          OPENAI_API_KEY: { type: 'string' },
          DATABASE_URL: { type: 'string' },
        },
      },
      data: process.env,
      dotenv: true,
    })

    fastify.register(multer.contentParser)
    fastify.register(router)
    fastify.register(swagger, {
      swagger: {
        info: {
          title: 'Test swagger',
          description: 'Testing the Fastify swagger API',
          version: '0.1.0',
        },
        externalDocs: {
          url: 'https://swagger.io',
          description: 'Find more info here',
        },
        host: 'localhost',
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json'],
        tags: [
          { name: 'user', description: 'User related end-points' },
          { name: 'code', description: 'Code related end-points' },
        ],
        definitions: {
          User: {
            type: 'object',
            required: ['id', 'email'],
            properties: {
              id: { type: 'string', format: 'uuid' },
              firstName: { type: 'string' },
              lastName: { type: 'string' },
              email: { type: 'string', format: 'email' },
            },
          },
        },
        securityDefinitions: {
          apiKey: {
            type: 'apiKey',
            name: 'apiKey',
            in: 'header',
          },
        },
      },
    })

    // fastify.get('/heath', (req, reply) => {
    //   return {
    //     ok: true,
    //   }
    // })

    // fastify.post('/add-image', addImage)
    // fastify.put('/change-order-image/:imageId', changeOrderImage)
    await fastify.ready()
    fastify.swagger()
    await fastify.listen({
      port: parseInt(port ?? '') || 8000,
    })
  } catch (err) {
    fastify.log.error(err)
  }
}

main()

// const app = express();
// const port = process.env.PORT || 8000;
// app.use(cors());
// app.use(express.json());
// app.use(statusMonitor())

// app.get("/api/createSession", async (request, response) => {
//   const sessionId = await createSessionHandler(request, response);
// });

// app.get("/api/getFaceLivenessResults", async (req, res) => {
//   const result = await getSessionResultHandler(req.query.sessionId);
//   res.json(result);
// });

// app.get("/api/checkInappropriateContent", async (req, res) => {
//   const objectKey = req.query.objectKey;
//   const result = await checkForInappropriateContent(objectKey);
//   res.json(result);
// });

// app.post("/api/text/moderations", textController)

// app.listen(port, () => {
//   console.log("Listen on the port " + port);
// });
