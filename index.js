import express from 'express'
import dotenv from 'dotenv'
import { connectDb } from './config/db.js'
import authRoute from './routes/auth.js'
import userRoute from './routes/users.js'
import cookieParser from 'cookie-parser'
import errorHandler from './middlewares/errorHandler.js'

const app = express()
dotenv.config()
connectDb()


app.use(express.json())
app.use(cookieParser())
app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)

app.use(errorHandler)


const PORT = process.env.PORT || 5000

app.listen(5000, () => {
    console.log(`App is running on port ${PORT}`)
})