const express=require("express")
const { dbconnect } = require("./config/database")
const { router } = require("./routes/routes")
const cookieparse=require("cookie-parser")
const app=express()

app.use("/api/v1",router)
app.use(cookieparse())
app.use(express.json())

const PORT=8000
app.listen(PORT,()=>{
    console.log(`app is running on port ${ PORT}`)
})

dbconnect()
