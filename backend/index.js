const connection = require('./dataBase/connection');
const express = require('express');
const cors = require('cors');
const router = require('./routes/ropaRouter');

console.log('app de arranque de backend');

connection();

const app = express();
const puerto = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/',router);

app.listen(puerto,()=>{
    console.log("El servidor esta corriendo en el puerto " + puerto);
})
