import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        const feedbacks = await prisma.feedback.findMany()
        res.status(200).json(feedbacks)
      } catch (error) {
        res.status(500).json({ error: 'Error fetching feedbacks' })
      }
      break

    case 'POST':
      try {
        const feedback = await prisma.feedback.create({
          data: req.body,
        })
        res.status(201).json(feedback)
      } catch (error) {
        res.status(500).json({ error: 'Error creating feedback' })
      }
      break

    case 'PUT':
      try {
        const { id, ...data } = req.body
        const feedback = await prisma.feedback.update({
          where: { id },
          data,
        })
        res.status(200).json(feedback)
      } catch (error) {
        res.status(500).json({ error: 'Error updating feedback' })
      }
      break

    case 'DELETE':
      try {
        const { id } = req.body
        await prisma.feedback.delete({
          where: { id },
        })
        res.status(204).end()
      } catch (error) {
        res.status(500).json({ error: 'Error deleting feedback' })
      }
      break

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}