import { resolve } from 'path'
import { randomBytes } from 'crypto'
import multer, { diskStorage } from 'multer'

const storage = (path: string) => {
  return diskStorage({
    destination: resolve(__dirname, '../../uploads', path),
    filename: (request, file, cb) => {
      const hash = randomBytes(16).toString('hex')

      const filename = `${hash}-${file.originalname}`

      return cb(null, filename)
    },
  })
}

export const multerConfig = {
  user: multer({ storage: storage('avatars') }),
}
