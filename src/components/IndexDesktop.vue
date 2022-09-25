<template>
  <AppLayoutVuexy>
    <div class="row">
      <div class="col-12 col-md-6">
        <Label required="1">Clientes</Label>
        <Select2 v-model="cod_cliente" :options="clients" :settings="{placeholder: 'Seleccione'}"
          @select="cliente=$event.id" />
      </div>
      <div class="col-12 col-md-6">
        <Label required="1">Producto</Label>
        <Select2 v-model="pedido.cod_product" :options="products" :settings="{placeholder: 'Seleccione'}"
          @select="productod=$event.id" />
      </div>

      <div class="col-12 col-md-6">
      </div>
      <div class="col-12 col-md-6">
        <Label required="1">Cantidad</Label>
        <Input type="number" v-model="pedido.quantity" />
      </div>
    </div>
    <div class="d-flex justify-content-center">
      <Button @click="agregarP()" class="mt-2"> Agregar </Button>
    </div>

    <div class="table-responsive my-4">
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
            <td> <Button @click="destroy(index)"> Eliminar </Button> </td>
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
        <Button @click="store()">Generar factura</Button>
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
      axios.post(route("empleados.factura.generar"), factura).then((res) => {
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
          console.log('item[column] ==> ', item[column]);
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
            if(response) {
                return '$' + response
            }else {
                return '0'
            }
    }
  },
};
</script>
