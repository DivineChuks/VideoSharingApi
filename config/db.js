import mongoose from 'mongoose'



export const connectDb = async () => {

    try {
        const conn = await mongoose.connect(process.env.MONGO_URI) 
        console.log(`Database Connected: ${conn.connection.host}`)
    } catch (error) {
        console.error(error.message)
        process.exit(1)
    }
   
}