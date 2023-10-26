import 'dotenv/config'
/* eslint-disable @typescript-eslint/no-var-requires */
// import cors from "cors";
// import cors from '@fastify/cors'
// import swagger from '@fastify/swagger'
// import Fastify from 'fastify'

import cors from 'cors'
import express from 'express'
import statusMonitor from 'express-status-monitor'
import { router } from './routes/router'

const port = process.env.PORT
const app = express()

// fastify.get('/heath', (req, reply) => {
//   return {
//     ok: true,
//   }
// })

// fastify.post('/add-image', addImage)
// fastify.put('/change-order-image/:imageId', changeOrderImage)

// const app = express();
// const port = process.env.PORT || 8000;
app.use(cors())
app.use(express.json())
app.use(statusMonitor())

app.use(router)

app.listen(port, () => {
  console.log('🚀Server running at port ' + port)
})
