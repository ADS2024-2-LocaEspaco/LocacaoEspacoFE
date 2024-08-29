import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        const tipoEspacos = await prisma.tipoEspaco.findMany()
        res.status(200).json(tipoEspacos)
      } catch (error) {
        res.status(500).json({ error: 'Error fetching tipo espacos' })
      }
      break

    case 'POST':
      try {
        const tipoEspaco = await prisma.tipoEspaco.create({
          data: req.body,
        })
        res.status(201).json(tipoEspaco)
      } catch (error) {
        res.status(500).json({ error: 'Error creating tipo espaco' })
      }
      break

    case 'PUT':
      try {
        const { id, ...data } = req.body
        const tipoEspaco = await prisma.tipoEspaco.update({
          where: { id },
          data,
        })
        res.status(200).json(tipoEspaco)
      } catch (error) {
        res.status(500).json({ error: 'Error updating tipo espaco' })
      }
      break

    case 'DELETE':
      try {
        const { id } = req.body
        await prisma.tipoEspaco.delete({
          where: { id },
        })
        res.status(204).end()
      } catch (error) {
        res.status(500).json({ error: 'Error deleting tipo espaco' })
      }
      break

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}