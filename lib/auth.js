import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const SECRET = process.env.JWT_SECRET

export const hashPassword = p => bcrypt.hash(p, 12)
export const verifyPassword = (p, h) => bcrypt.compare(p, h)

export function signToken(user) {
    return jwt.sign(
        { id: user.id, email: user.email },
        SECRET,
        { expiresIn: '7d' }
    )
}

export function verifyToken(token) {
    return jwt.verify(token, SECRET)
}
