declare namespace Express {
  export interface Request {
    user: {
      id: string | undefined
      role: string
    }
  }
}
