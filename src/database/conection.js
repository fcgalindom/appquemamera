
const { Client } = require('pg')
const client = new Client({

  user: 'izhzgcmjaxmlio',

  host: 'ec2-3-234-131-8.compute-1.amazonaws.com',

  database: 'd799kpf0bgcv9h',

  password: 'fc7410e2032ae45651d6f3341c38b7ca8a09a8729a4737c726a9190b52f89a91',

  port: 5432,

  ssl: {
    rejectUnauthorized: false
  }

})



client.connect();



// const getProductos = async () => {

//   try {
//     const res = await client.query('select * from products');

//     data = res.rows;
//     return data;
//     client.end();
//   } catch (e) {
//     console.log(e);
//   }
// };

const fs = require("fs/promises");

const path = require("path");
const console = require('console');
const { default: axios } = require('axios');

const pathJson = path.join(__dirname, "./productos.json")
const pathFacturaJson = path.join(__dirname, "./factura.json")
const pathJsonFacturas = path.join(__dirname, "./facturas.json");
const pathClienteJson = path.join(__dirname, "./clients.json");



const getClients = () =>{
 
    axios.get('https://infinite-basin-30570.herokuapp.com/api/clientes').then(res=>{
  

       console.log(res.data);
        writeJsonClientes(res.data);
       
    })


    // return JSON.parse(dataCliente);
}

const getFacturas = () =>{
 
  axios.get('https://infinite-basin-30570.herokuapp.com/api/vFactura').then(res=>{


     console.log(res.data);
     writeJsonFacturas(res.data);
    
  })


  // return JSON.parse(dataCliente);
}

const getProductos = () =>{
  
  axios.get('https://infinite-basin-30570.herokuapp.com/api/productos').then(res=>{


     writeJsonProductos(res.data);
  })


  // return JSON.parse(dataCliente);
}

const getFactura = () =>{


  axios.get('https://infinite-basin-30570.herokuapp.com/api/vFactura').then(res=>{


     writeJsonProductos(res.data);
  })


  // return JSON.parse(dataCliente);
}



const readFactura = () => {

  const data = fs.readFile(pathFacturaJson, "utf-8")
  return data;
}
const writeJsonProductos = async (escribir) => {

  fs.writeFile(pathJson, JSON.stringify(escribir, null, 4), "utf-8");

}

const writeJsonFacturas = async (escribir)=>{

  fs.writeFile(pathJsonFacturas, JSON.stringify(escribir, null, 4), "utf-8");
    
    
    
      
}


const writeJsonFactura = (escribir) => {


  fs.writeFile(pathFacturaJson, JSON.stringify(escribir, null, 4), "utf-8");



}

const writeJsonClientes = (escribir) => {


  fs.writeFile(pathClienteJson, JSON.stringify(escribir, null, 4), "utf-8");



}

getClients();




getProductos();


getFacturas();











// getProductos().then((data) => {
//   console.log(data);
//   writeJson(data);
// });











//// Arreglar




















