import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        const anuncios = await prisma.anuncio.findMany()
        res.status(200).json(anuncios)
      } catch (error) {
        res.status(500).json({ error: 'Error fetching anuncios' })
      }
      break

    case 'POST':
      try {
        const anuncio = await prisma.anuncio.create({
          data: req.body,
        })
        res.status(201).json(anuncio)
      } catch (error) {
        res.status(500).json({ error: 'Error creating anuncio' })
      }
      break

    case 'PUT':
      try {
        const { id, ...data } = req.body
        const anuncio = await prisma.anuncio.update({
          where: { id },
          data,
        })
        res.status(200).json(anuncio)
      } catch (error) {
        res.status(500).json({ error: 'Error updating anuncio' })
      }
      break

    case 'DELETE':
      try {
        const { id } = req.body
        await prisma.anuncio.delete({
          where: { id },
        })
        res.status(204).end()
      } catch (error) {
        res.status(500).json({ error: 'Error deleting anuncio' })
      }
      break

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}