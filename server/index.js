require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')


const authRouter = require('./routers/auth')
const postRouter = require('./routers/post')


const connectDB = async() => {
    try {
        await mongoose.connect('mongodb+srv://tuankiet:kiet1812@mern-learnit.fmcxc.mongodb.net/mern-learnit?retryWrites=true&w=majority' , {
            //useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //useFindAndModify: false
        })
        console.log('MongooDB connected')
    } catch (error) {
        console.log(error.message)
        process.exit(1)        
    }
}

connectDB()

const app = express()
app.use(express.json())
app.use(cors())


app.use('/api/auth' , authRouter)
app.use('/api/posts' , postRouter)


const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server  started on port ${PORT}`))