const expres = require("express")
const app = expres();
const cors = require("cors")
app.use(cors())

app.get("/",(req,res)=> {
    res.send("Foi, Matheuzinho")
})

app.listen("3000",() =>{
    console.log("Servidor rodando")
})


