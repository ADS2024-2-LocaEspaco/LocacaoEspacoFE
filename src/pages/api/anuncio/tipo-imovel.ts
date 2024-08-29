import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        const tipoImoveis = await prisma.tipoImovel.findMany()
        res.status(200).json(tipoImoveis)
      } catch (error) {
        res.status(500).json({ error: 'Error fetching tipo imoveis' })
      }
      break

    case 'POST':
      try {
        const tipoImovel = await prisma.tipoImovel.create({
          data: req.body,
        })
        res.status(201).json(tipoImovel)
      } catch (error) {
        res.status(500).json({ error: 'Error creating tipo imovel' })
      }
      break

    case 'PUT':
      try {
        const { id, ...data } = req.body
        const tipoImovel = await prisma.tipoImovel.update({
          where: { id },
          data,
        })
        res.status(200).json(tipoImovel)
      } catch (error) {
        res.status(500).json({ error: 'Error updating tipo imovel' })
      }
      break

    case 'DELETE':
      try {
        const { id } = req.body
        await prisma.tipoImovel.delete({
          where: { id },
        })
        res.status(204).end()
      } catch (error) {
        res.status(500).json({ error: 'Error deleting tipo imovel' })
      }
      break

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}