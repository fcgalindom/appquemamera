

const fs = require("fs/promises");
const path = require("path");
const pathJson = path.join(__dirname, "../database/productos.json")
const pathJsonFatura = path.join(__dirname, "../database/factura.json")
let productos = [];
let totalReal = 0;
const readJson = async () => {

  const data = await fs.readFile(pathJson, "utf-8")
  return data;
}


function fillSelector(options_list) {
  var options = JSON.parse(options_list);

  var modelList = document.getElementById("producto");
  datas = []
  for (var i = 0; i < options_list.length; i++) {

    // creamos un elemento de tipo option
    var opt = document.createElement("option");
    // le damos un valor
    opt.value = [options[i].cod_product, options[i].price, options[i].name_product];
    // le ponemos un texto
    opt.textContent = options[i].name_product;
    // lo agregamos al selec
    modelList.options.add(opt);
  }

}

readJson().then((data) => {

  fillSelector(data)

});

let cantidad = document.getElementById("cantidad");
let nombre = document.getElementById("producto");
const productoform = document.getElementById("productosform");


productoform.addEventListener('submit', (e) => {
  let arr = nombre.value.split(',')


  e.preventDefault();
 ;
  productos.push({
    id: productos.length,
    nombre: arr[2].replaceAll(' ', ''),
    cantidad: parseInt(cantidad.value, 10),
    precio: parseInt(arr[1], 10),
    total: parseInt(cantidad.value, 10) * parseInt(arr[1], 10),

    idProducto: parseInt(arr[0], 10)

  });

  var cuerpoTabla = document.getElementById("equipos-tabla");
  var tablaLlena = "";
  for (var i = 0; i < productos.length; i++) {
    tablaLlena += "<tr><td>" + productos[i].nombre + "</td>";
    tablaLlena += "<td>" + productos[i].cantidad + "</td>";
    tablaLlena += "<td>" + productos[i].precio + "</td>";
    tablaLlena += "<td>" + productos[i].total + "</td>";
    tablaLlena += "<td><form action='./dos.html' method='get' id= " + "data"+productos[i].id  +"><input type='hidden' value="+productos[i].id+" name='producto'><input type='hidden' value="+JSON.stringify(productos)+" name='productos'><button  class='btn btn-danger data'>Eliminar</button></form></tr>"







    totalReal += productos[i].total;

  }

 



  cuerpoTabla.innerHTML = tablaLlena;
  document.getElementById("valorTotal").innerHTML = "$ " + totalReal;
}

);




const writeJsonFactura = (escribir) => {

  fs.writeFile(pathJsonFatura, JSON.stringify(escribir, null, 4), "utf-8");

}



guardarFactura.addEventListener('submit', (e) => {

  e.preventDefault();

  var factura = [];

  factura.push({

    productos: productos,
    cliente: 1,
    total: totalReal,

  })

  writeJsonFactura(factura);
  alert("Guardado Correctamente")

})
object.onclick = function () { console.log("entro") };
















