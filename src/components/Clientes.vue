<template>
    <AppLayoutVuexy>
        <div class="container mb-3">
            <div class="row my-3">
                <div class="col-sm-12 col-md-10">
                    <h5 class="mb-3"><strong>Crear Factura</strong></h5>
                </div>
                <div class="col-sm-12 col-md-2">
                    <Button @click="vaciarModal()" data-bs-toggle="modal" data-bs-target="#crear_cliente">
                        <font-awesome-icon icon="fa-solid fa-plus" />
                        Crear Cliente
                    </Button>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12 col-md-6">
                <div class="form-group">
                    <Label class="me-3">Valor Total</Label>
                    <Label>{{parseVillegas(calcular_total())}}</Label>
                </div>
            </div>
        </div>

        <Modal id="crear_cliente" title="Cliente">
            <div class="row">
                <div class="container">
                    <div class="col-12 mb-3">
                        <Label required="1">Nombre</Label>
                        <Input v-model="form.nombre" :error="errors.nombre" />
                    </div>
                    <div class="col-12 mb-3">
                        <Label required="1">Telefono</Label>
                        <Input type="number" v-model="form.telefono" :error="errors.telefono"
                            @keypress="isNumber($event, form.telefono)" />
                    </div>
                    <div class="col-12 mb-3">
                        <Label >Email</Label>
                        <Input v-model="form.correo" :error="errors.correo" />
                    </div>
                    <div class="d-flex justify-content-center">
                        <Button @click="storeCliente()"> Guardar </Button>
                    </div>
                </div>
            </div>
        </Modal>
    </AppLayoutVuexy>
</template>
<script>
import Modal from "./ComponentsVuexy/Modal.vue";
import Label from "./ComponentsVuexy/Label.vue";
import Button from "./ComponentsVuexy/Button.vue";
import Input from "./ComponentsVuexy/Input.vue";
import Select2 from 'vue3-select2-component';

export default {
    props: {
        clientes: Array,
        products: Array,
        domain: {
            type: String,
            required: true
        },
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
            form: { nombre: "", correo: "", telefono: "" },
            errors: {},
            cod_especial: '',
        };
    },
    components: {
        Modal,
        Select2,
        Label,
        Button,
        Input
    },
    mounted() {
        this.getDataTable()
    },
    methods: {
        getDataTable() {
            // this.$tablag('data-table')
        },
        parseVillegas(value = '0') {
            let response = parseInt(value).toLocaleString('es-CO')
            if (response) {
                return '$' + response
            } else {
                return '0'
            }
        },
        ver() {
            axios.post(route("administrador.cliente.index"), this.filters).then((res) => {
                this.clientes = res.data.clientes;
            });
        },
        storeCliente() {
            let url = this.domain + 'api/api-client-store'
            axios.post(url, this.form).then((res) => {
                if (res.data.status == 422) {
                    Swal.fire('Error', res.data.msg, 'error');
                } else if (res.data.status == 200) {
                    // this.ver();
                    Swal.fire('Éxito', res.data.msg, 'success');
                }
            }).catch(errors => {
                this.errors = errors.response.data.errors;
                this.isLoading = false
            });
        },
        vaciarModal() {
            this.form = { nombre: "", dir: "", telefono: "" }
            this.errors = {}
        },
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
            this.getDataTable()
        },
        limpiar_campos() {
            for (const key in this.pedido) this.pedido[key] = ''
        },
        destroy(index) {
            this.pedidos.splice(index, 1);
            this.getDataTable()
        },
        store() {
            if(this.pedidos.length == 0) {
                Swal.fire('error', 'Debe haber al menos un pedido', 'error')
                return
            }
            if(!this.cod_cliente) {
                Swal.fire('error', 'Selecciona un cliente', 'error')
                return
            }
            let factura = {
                pedidos: this.pedidos,
                cod_cliente: this.cod_cliente,
                total: this.total,
                cod_especial: this.cod_especial,
            };
            axios.post(route("empleados.factura.generar"), factura).then((res) => {
                if (res.data.status == 422) {
                    Swal.fire('Error', res.data.msg, 'error');
                } else if (res.data.status == 200) {
                    this.ver();
                    Swal.fire('Éxito', res.data.msg, 'success');
                    this.pedidos = [];
                    this.cod_client = "";
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
        isNumber(e, texto = [], cantidad = 20) {
            console.log('numero = ', texto);
            if (texto.length >= cantidad) e.preventDefault();

            let char = String.fromCharCode(e.keyCode); // Get the character
            if (/^[+0123456789]+$/.test(char)) return true;
            // Match with regex
            else e.preventDefault(); // If not match, don't add to input text
        }
        
    },
};
</script>