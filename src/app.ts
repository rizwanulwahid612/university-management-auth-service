import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import usersService from './app/modules/users/users.service'
import usersRoute from './app/modules/users/users.route'
const app: Application = express()

app.use(cors())
//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//application router
app.use('/api/v1/users/', usersRoute)

app.get('/', async (req: Request, res: Response) => {
  await usersService.createUser({
    id: '199',
    password: '123456',
    role: 'student',
  })
  res.send('Hello World!')
})

export default app
