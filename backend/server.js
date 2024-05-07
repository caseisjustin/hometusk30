import express from "express"
import dotenv from "dotenv"
import mainRouter from "./router/index.router.js"
dotenv.config()



const port = process.env.PORT
const hostname = process.env.HOSTNAME




const app = express()
app.use(express.json())



app.use("/api", mainRouter)







app.listen(port, hostname, err=>{
    err?console.log("Server couldn't run"):
    console.log(`Server is running on port ${port}...`)
})