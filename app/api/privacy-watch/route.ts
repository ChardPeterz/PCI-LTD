import { readFile } from 'fs/promises'
import { join } from 'path'

export async function GET() {
  try {
    const filePath = join(process.cwd(), 'public/data/privacy-watch.json')
    const data = await readFile(filePath, 'utf-8')
    const items = JSON.parse(data)

    return Response.json(items)
  } catch (error) {
    console.error('Failed to load privacy watch items:', error)
    return Response.json({ error: 'Failed to load privacy watch items' }, { status: 500 })
  }
}
