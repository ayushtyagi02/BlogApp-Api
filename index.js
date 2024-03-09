const express= require("express");
const app = express();

require('dotenv').config();

app.use(express.json());

const blogs= require('./routes/blogs')
app.use('/api/v1',blogs);

const PORT = process.env.PORT || 5000;

const dbConnect= require('./config/database')
dbConnect();
app.listen(PORT, ()=>{
     
        console.log(` App is listening on ${PORT}`);
     
})
app.get("/", (req, res)=>{
    res.send("This is a homepage")

})