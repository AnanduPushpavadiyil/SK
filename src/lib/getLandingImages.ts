import fs from 'fs'
import path from 'path'

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg']

export function getLandingImages() {
  const directory = path.join(process.cwd(), 'public/images/gallery')

  return fs
    .readdirSync(directory)
    .filter(
      (file) =>
        IMAGE_EXTENSIONS.includes(path.extname(file).toLowerCase()) &&
        !file.startsWith('.')
    )
    .map((file) => ({
    image: `/images/gallery/${file}`,
    name: file.split('.')[1]?.slice(0, 9),
    width: 300,
    height: 400,
  }))
}