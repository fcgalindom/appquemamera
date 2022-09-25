<template>
  <div class="azulOscuro">
    <nav class="navbar navbar-light navegar">
      <div class="left" role="menu">
        <!-- <a class="navbar-brand" href="#"><img src="./logolavamar.png" class=" img rounded-start mx-2" alt="..." /></a> -->
      </div>
      <div class="right">
        <button class="menubar-btn letraBlanca" id="minimize-btn">Crear Factura</button>
        <button class="menubar-btn letraBlanca" id="max-unmax-btn">Ver Facturas</button>
      </div>
    </nav>
  </div>

  <div class="container">
    <div class="fondoBlanco">
      <div class="row">
        <div class="col-3">
          <form id="productosform">

            <div class="form-group">
              <Label required="1"> Tel Cliente </Label>
              <Input type="number" />
            </div>

            <div class="form-group">
              <label for="">Producto</label>
              <Select2 :options="products" />
              <!-- <select id="producto" step="any" class="form-select">
                <option value="">Seleccione</option>
              </select> -->
            </div>

            <div class="form-group">
              <label for="">Cantidad</label>
              <input id="cantidad" type="number" class="form-control" />
            </div>

            <div class="form-group">
              <button class="btn btn-primary form-control">
                Agregar
              </button>
            </div>
          </form>
        </div>


        <div class="col-9">
          <div class="cont my-4">
            <div class="row m-4 table-wrapper-scroll-y my-custom-scrollbar">
              <table class="tableNueva table-hover table-sm bg-primary">
                <thead>
                  <tr>
                    <th scope="col">Nombre</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Precio Unidad</th>
                    <th scope="col">Total</th>
                    <th scope="col">Eliminar</th>
                  </tr>
                </thead>
                <tbody id="equipos-tabla">

                </tbody>
              </table>
            </div>
            <div class="container">
              <div class="row centrado">
                <div class="col-6 col-md-3">
                  <div class="form-group">
                    <label class="form-control" id="valor" for="">Valor Total</label>
                  </div>
                </div>
                <div class="col-6 col-md-6">
                  <div class="form-group">
                    <label for="" id="valorTotal" class="form-control">$ </label>

                  </div>
                </div>
                <!-- <div class="col-6 col-md-3">
                    <form id="eliminarProductos">
                    <div class="form-group">
                      <button  class="btn btn-danger">Eliminar</button>
                    </div>
                    </form>
                  </div>-->
                <div class="col-6 col-md-3">
                  <form id="guardarFactura">
                    <div class="form-group">
                      <button class="btn btn-primary">Pedir Domicilio</button>
                    </div>
                  </form>
                  <div class="col-6 col-md-3">
                    <form id="eliminarProductos">
                      <div class="form-group">
                        <button class="btn btn-danger">Eliminar</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Select2 from 'vue3-select2-component'
import json from '../database/productos.json'
import Input from '@/components/ComponentsVuexy/Input.vue'
import Label from '@/components/ComponentsVuexy/Label.vue'
export default {
  data() {
    return {
      products: json,
    }
  },
  created() {
    this.map_productos_json()
  },
  methods: {
    map_productos_json() {
      let products = this.products
      this.products = []

      products.forEach(item => {
        this.products.push({ id: item.cod_product, text: item.name_product })
      });
    }
  },
  components: {
    Select2,
    Input,
    Label
  }
}
</script>