import { Request, Response } from 'express'
import { openAiConfig } from '../configs/openai'

export async function checkTextContentController(req: Request, res: Response) {
  try {
    const { input } = req.body

    const response = await openAiConfig.moderations.create({
      input,
    })

    const flagged = response.results[0].flagged

    return res.json({ inappropriate: flagged })
  } catch (err) {
    return res.status(500).json(err)
  }
}
