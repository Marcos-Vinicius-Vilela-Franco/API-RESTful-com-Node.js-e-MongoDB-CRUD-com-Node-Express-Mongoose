require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()

app.use(
    express.urlencoded({
        extended:true,
    }),
)

app.use(express.json())
//user bd: MarcosV

//rotas da API
const personRoutes = require('./routes/personRoutes');

app.use('/person',personRoutes)

// rota inicial/ endpoint
app.get('/',(req,res)=>{
    //mostrar req

    res.json({message:'olá mundo!'})
})

//entregar uma porta
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

//mongodb+srv://MarcosV:<password>@cluster0.lxvxfxz.mongodb.net/?retryWrites=true&w=majority
mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.lxvxfxz.mongodb.net/?retryWrites=true&w=majority`)
.then(()=>{
    console.log("conectamos ao MongoDB!");
    app.listen(3000)
})
.catch((err)=> console.log(err))


