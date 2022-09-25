
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



const getProductos = async () => {

  try {
    const res = await client.query('select * from products');

    data = res.rows;
    return data;
    client.end();
  } catch (e) {
    console.log(e);
  }
};

const fs = require("fs/promises");
const path = require("path");
const console = require('console');

const pathJson = path.join(__dirname, "./productos.json")
const pathFacturaJson = path.join(__dirname, "./factura.json")

const readFactura = () => {

  const data = fs.readFile(pathFacturaJson, "utf-8")
  return data;
}
const writeJson = async (escribir) => {

  fs.writeFile(pathJson, JSON.stringify(escribir, null, 4), "utf-8");

}

const writeJsonFactura = (escribir) => {


  fs.writeFile(pathFacturaJson, JSON.stringify(escribir, null, 4), "utf-8");



}









getProductos().then((data) => {
  console.log(data);
  writeJson(data);
});





function sumar() {

  console.log("dos");
}





module.exports = {
  sumar,
  client
};
//// Arreglar

let identificadorIntervaloDeTiempo;

function repetirCadaSegundo() {
  identificadorIntervaloDeTiempo = setInterval(mandarMensaje, 1000);
}

function mandarMensaje() {

  readFactura().then((data) => {
    ;

    if (data == 1) {

      console.log("ojala");
    }
    else {




      var bills = JSON.parse(data);
      var total = bills[0].total;
      var productos = bills[0].productos;
      


      const text = 'INSERT INTO bills(cod_client, cod_employee , cod_state , cod_bill_type , address , price_delivery , total_bill) VALUES($1, $2,$3,$4,$5,$6,$7) RETURNING *'
      const values = [1, 1, 1, 1, "calle 170", 1,total]
      // callback
      client.query(text, values, (err, res) => {
        if (err) {
          console.log(err.stack)
        } else {
          console.log(res.rows[0])
          
          

          console.log()
          // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
          for (let index = 0; index < productos.length; index++) {
            const element = productos[index];

            console.log(element)
            console.log(res.rows[0].cod_bill)
        
         


            const text2 = 'INSERT INTO detail_bill_products(cod_product, cod_bill , num_product , val_product) VALUES($1, $2,$3,$4) RETURNING *'
            const values2 = [element.idProducto, res.rows[0].cod_bill, element.cantidad, element.precio]
            client.query(text2, values2, (err, res) => {
              if (err) {
                console.log(err.stack)
              } else {
                console.log(res.rows[0])
                
               
              }
            })
            
            
           
            
          }

         

        }
      })
    
     



      
      writeJsonFactura(1);

    };
  });

}

repetirCadaSegundo();




















