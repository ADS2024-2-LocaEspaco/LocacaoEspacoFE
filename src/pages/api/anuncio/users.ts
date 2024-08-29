import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        const users = await prisma.user.findMany()
        res.status(200).json(users)
      } catch (error) {
        res.status(500).json({ error: 'Error fetching users' })
      }
      break

    case 'POST':
      try {
        const user = await prisma.user.create({
          data: req.body,
        })
        res.status(201).json(user)
      } catch (error) {
        res.status(500).json({ error: 'Error creating user' })
      }
      break

    case 'PUT':
      try {
        const { id, ...data } = req.body
        const user = await prisma.user.update({
          where: { id },
          data,
        })
        res.status(200).json(user)
      } catch (error) {
        res.status(500).json({ error: 'Error updating user' })
      }
      break

    case 'DELETE':
      try {
        const { id } = req.body
        await prisma.user.delete({
          where: { id },
        })
        res.status(204).end()
      } catch (error) {
        res.status(500).json({ error: 'Error deleting user' })
      }
      break

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}