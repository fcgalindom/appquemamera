<template>
  <AppLayoutVuexy>
   <div class="container mt-4  ">
    <div class="container  ">
      <div class="row ">
        <div class="col-9 col-sm-8 col-md-10 ">
          <h5 class="text-start "><strong>Crear Facturas</strong></h5>
        </div>
        <div class="container ">
          <div class="row">
            <div class="col-12 col-md-6">
              <div class="form-group">
                <Select2 v-model="cod_cliente" :options="clients" :settings="{placeholder: 'Clientes', width: '100%'}"
                  @select="cliente=$event.id" />
              </div>
            </div>

            <div class="col-12 col-md-6">
              <div class="form-group">
                <Select2 v-model="pedido.cod_product" :options="products"
                  :settings="{placeholder: 'Productos', width: '100%'}" @select="productod=$event.id" />
              </div>
            </div>
            <div class="col-12 col-md-6">

            </div>
            <div class="col-12 col-md-5">
              <div class="form-group">
                <Input type="number" v-model="pedido.quantity" placeholder="Cantidad" />
              </div>
            </div>
            <div class="col-12 col-md-1 ">
              <div class="">
                <Button @click="agregarP()" class="botones"> Agregar </Button>
              </div>
            </div>


          </div>


        </div>
      </div>

    </div>





    <div class="container table-responsive text-center  bg-table-gen " style="font-size: 0.9rem">
      <table class="table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio Unidad</th>
            <th>Total</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(i, index) in pedidos" :key="index">
            <td>{{ i.nom_product }}</td>
            <td>{{ i.quantity }}</td>
            <td>{{ parseVillegas(i.price) }}</td>
            <td>{{ parseVillegas(i.total) }}</td>
            <td> <Button @click="destroy(index)" class="botonRojo"> Eliminar </Button> </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="row">
      <div class="col-12 col-md-6">
        <div class="form-group">
          <Label class="me-3">Valor Total</Label>
          <Label>{{(calcular_total())}}</Label>
        </div>
      </div>
      <div class="d-flex justify-content-center mt-2">
        <Button @click="store()" class="botones">Generar factura</Button>
      </div>
    </div>
   </div>
  </AppLayoutVuexy>
</template>
<script>
import Label from "./ComponentsVuexy/Label.vue";
import Button from "./ComponentsVuexy/Button.vue";
import Input from "./ComponentsVuexy/Input.vue";
import Select2 from 'vue3-select2-component';
import json_products from '@/database/productos.json'
import json_clients from '@/database/clients.json'
// import '@/database/conection.js'

export default {
  props: {
  },
  data() {
    return {
      cantidad: 0,
      id: 0,
      pedido: { cod_product: '', quantity: '' },
      pedidos: [],
      total: 0,
      cod_cliente: 0,
      factura: {},
      products: json_products,
      clients: json_clients,
    };
  },
  components: {
    Select2,
    Label,
    Button,
    Input
  },
  created() {
    this.map_productos_json()
    this.map_clients_json()
  },

  methods: {
    agregarP() {
      let pedido = {}
      for (const key in this.pedido) {
        if (this.pedido[key]) pedido[key] = this.pedido[key]
        else {
          Swal.fire('error', 'Completa todos los campos', 'error')
          return
        }
      }
      pedido.price = this.params_product(pedido.cod_product, 'price')
      pedido.nom_product = this.params_product(pedido.cod_product, 'text')
      pedido.total = pedido.price * pedido.quantity
      this.pedidos.push(pedido)
      this.limpiar_campos()
    },
    limpiar_campos() {
      for (const key in this.pedido) this.pedido[key] = ''
    },
    destroy(index) {
      this.pedidos.splice(index, 1);
    },

    store() {
      let factura = {

        pedidos: this.pedidos,

        cod_cliente: this.cod_cliente,

        total: this.total,

      };

      if (this.pedidos.length == 0) {
        alert('Debe haber al menos un pedido')
        // Swal.fire('error', 'Debe haber al menos un pedido', 'error')
        return
      }

      if (!this.cod_cliente) {
        // Swal.fire('error', 'Selecciona un cliente', 'error')
        alert('Selecciona un cliente')
        return
      }

      axios.post("https://infinite-basin-30570.herokuapp.com/api/cFactura", factura).then((res) => {
        if (res.data.status == 422) {
          alert(res.data.msg);
        } else if (res.data.status == 200) {
          alert(res.data.msg);
        }
      });
    },
    params_product(cod_product, column) {
      let response = ''
      this.products.filter((item) => {
        if (item.id == cod_product) {
          response = item[column]
        }
      });
      return response
    },
    calcular_total() {
      let total = 0
      this.pedidos.forEach(element => {
        console.log('element ==> ', element)
        total += element.total
      });
      this.total = total
      return total
    },
    map_productos_json() {
      let products = this.products
      this.products = []

      products.forEach(item => {
        this.products.push({ id: item.cod_product, text: item.name_product, price: item.price })
      });
    },
    map_clients_json() {
      let clients = this.clients
      this.clients = []

      clients.forEach(item => {
        this.clients.push({ id: item.cod_client, text: item.usuario?.name })
      });
    },
    parseVillegas(value = '0') {
      let response = parseInt(value).toLocaleString('es-CO')
      if (response) {
        return '$' + response
      } else {
        return '0'
      }
    }
  },
};
</script>
