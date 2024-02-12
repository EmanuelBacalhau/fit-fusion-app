declare namespace Express {
  export interface Request {
    user: {
      id: string
      role: 'ADMIN' | 'CLIENT'
    }
    files: {
      cover: Multer.File[]
      gif: Multer.File[]
    }
  }
}
