

import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { getRepository } from 'typeorm'
import authConfig from '../config/auth'
import AppError from '../errors/AppError'
import User from '../models/User'
interface RequestDTO {
  email: string
  password: string
}

interface Response {
  user: User
  token: string
}
class AuthenticateUserService {
  /**
   * execute
   */
  async execute({ email, password }: RequestDTO): Promise<Response> {
    const usersRepository = getRepository(User)

    const user = await usersRepository.findOne({ email })

    if (!user) throw new AppError('Incorrect email/password combination.', 401)

    const passwordMatched = await compare(password, user.password)

    if (!passwordMatched) throw new AppError('Incorrect email/password combination.', 401)

    const { expiresIn, secret } = authConfig.jwt

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    })

    return {
      user,
      token,
    }
  }
}
export default AuthenticateUserService
