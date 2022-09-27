<template>
    <AppLayoutVuexy>
        <div class="container mb-3">
            <div class="row mt-4 mb-3">
                <div class="col-9 col-sm-8 col-md-10">
                    <h5 class="text-start  letraAzul"><strong>Ver Facturas</strong></h5>
                </div>
                <div class="col-3 col-sm-4 col-md-2 text-end">
                    <div class="d-grid gap-2"></div>
                </div>
            </div>
            <div class="container">
                <div class="row mb-3">
                    <div class="col-12 col-md-3">
                        <div class="form-group">
                            <label for="">Cliente</label>
                            <input type="text" class="form-control" v-model="filters.cliente" />
                        </div>
                    </div>
                    <div class="col-12 col-md-3">
                        <div class="form-group">
                            <label for="">Empleado</label>
                            <input type="text" class="form-control" v-model="filters.empleado" />
                        </div>
                    </div>
                    <div class="col-12 col-md-3">
                        <div class="form-group">
                            <label for="">Fecha</label>
                            <input type="date" class="form-control" v-model="filters.fecha" />
                        </div>
                    </div>
                    <div class="col-12 col-md-3">
                        <div class="form-group">
                            <label for="">Estado</label>
                            <Select2 v-model="filters.estado" :options="states"
                                :settings="{ width: '100%', placeholder: 'Seleccione' }" />
                        </div>
                    </div>
                </div>
                <div class="col-12 d-flex justify-content-center align-items-center mb-3">
                    <Button @click="getResults()">Buscar</Button>
                </div>
            </div>
        </div>
        <div class="container-fluid mb-1">
            <strong class="text-start">Se encontraron un total de {{ conteo }} registros</strong>
        </div>

        <div class="container-fluid table-responsive bg-table-gen" style="font-size: 0.9rem">
            <table class="table text-center" id="data-table">
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Empleado</th>
                        <th>Valor Total</th>
                        <th>Estado</th>
                        <th>Fecha</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                        <th>Ver</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(i, index) in facturas" v-bind:key="index">
                        <td>{{ i?.cliente?.usuario?.name }}</td>
                        <td>{{ i?.empleado?.usuario?.name }}</td>
                        <td>{{ (i?.total_bill) }}</td>
                        <td>{{ i?.estado?.name_state }}</td>
                        <td>{{ i?.created_at }}</td>
                        <td>
                            <ButtonSinFondo @click="llenarModal(i)">
                                <font-awesome-icon icon="fa-solid fa-pencil" />
                            </ButtonSinFondo>
                        </td>
                        <td>
                            <ButtonSinFondo @click="eliminar(i)">
                                <font-awesome-icon icon="fa-solid fa-trash-can" />
                            </ButtonSinFondo>
                        </td>
                        <td>
                            <ButtonSinFondo @click="detalles(i)">
                                <font-awesome-icon icon="fa-solid fa-eye" />
                            </ButtonSinFondo>
                        </td>
                    </tr>
                </tbody>
            </table>
            <!-- <pagination :users="patients" @pagi="getResults($event)" /> -->
        </div>

        <foot />
        <!-- </section> -->




    </AppLayoutVuexy>
</template>


<script>
// import ButtonSinFondo from "@/ComponentsVuexy/ButtonSinFondo.vue";
import Select2 from "vue3-select2-component";
import { defineComponent } from "vue";
import facturas_json from '@/database/facturas.json'
import "datatables.net-bs4";
export default defineComponent({
    props: {
        // empleados: Array,
        // clientes: Array,
        // states: Array,
        // types: Array,
    },
    components: {
        // Modal,
        Select2,
        // AppLayoutVuexy,
        // ButtonSinFondo,
        // Button,
    },
    data() {
        return {
            form: {
                cod_bill: '',
                cod_client: '',
                cod_employee: '',
                valor: '',
                cod_state: '',
                cod_bill_type: '',
                created_at: '',
                price_delivery: '',
                address: '',
            },
            facturas: facturas_json.facturas,
            filters: { cliente: '', empleado: '', fecha: '', estado: '' },
            conteo: facturas_json.conteo,
            details: []
        };
    },
    mounted() {
        this.getResults();
    },
    methods: {
        getResults() {
            this.tabla('data-table')
            // axios
            //     .post(route("administrador.factura.list"), this.filters)
            //     .then((res) => {
            //         this.facturas = res.data.facturas;
            //         this.conteo = res.data.conteo;
            //     });
        },
        editar() {
            axios.post(route("administrador.factura.update"), this.form).then((res) => {
                this.$alert(res.data)
                this.$closeModal('exampleModal')
                this.getResults();
            });
        },
        llenarModal(i) {
            for (const key in this.form) this.form[key] = i[key]
            this.$openModal('exampleModal')
        },

        vaciarModal() {
            for (const key in this.form) this.form[key] = ''
        },
        eliminar(i) {
            Swal.fire({
                title: '¿Estás seguro de eliminar esta factura?',
                showCancelButton: true,
                cancelButtonColor: this.$cancelButtonColor(),
                confirmButtonColor: this.$confirmButtonColor(),
                confirmButtonText: "SI",
                cancelButtonText: "NO",
                allowOutsideClick: false,
            }).then(async (result) => {
                if (result.isConfirmed) {
                    axios.post(route("administrador.factura.delete"), { cod_bill: i.cod_bill }).then((res) => {
                        this.$alert(res.data)
                        this.getResults();
                    });
                }
            })
        },
        detalles(i) {
            axios.post(route('administrador.factuas.show'), { id: i.cod_bill }).then(res => {
                this.details = res.data
                this.$openModal('show_bill')
            })
        },
        eliminar(i) {
            axios
                .post(route("administrador.factura.delete"), { cod_bill: i.cod_bill })
                .then((res) => {
                    this.$alert(res.data);
                    this.getResults();
                });
        },

        llenarModal(i) {
            for (const key in this.form) this.form[key] = i[key];
            this.$openModal("exampleModal");
        },
        parseVillegas(value = '0') {
            let response = parseInt(value).toLocaleString('es-CO')
            if (response) {
                return '$' + response
            } else {
                return '0'
            }
        },
        tabla(tablaId) {
            $("#" + tablaId).DataTable().destroy();
            this.$nextTick(() => {
                $("#" + tablaId).DataTable({
                    //    destroy:true,
                    searching: true,
                    language: {
                        "sProcessing": "Procesando...",
                        "sLengthMenu": "Mostrar _MENU_ registros",
                        "sZeroRecords": "No se encontraron resultados",
                        "sEmptyTable": "Ningún dato disponible en esta tabla",
                        "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                        "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
                        "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
                        "sInfoPostFix": "",
                        "sSearch": "Buscar:",
                        "sUrl": "",
                        "sInfoThousands": ",",
                        "sLoadingRecords": "Cargando...",
                        "oPaginate": {
                            "sFirst": "Primero",
                            "sLast": "Último",
                            "sNext": "Siguiente",
                            "sPrevious": "Anterior"
                        },
                        "oAria": {
                            "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                            "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                        }
                    },
                    initComplete: function () {
                        $("#tabla_contacts_wrapper > .row").addClass("w-100");
                        $("#tabla_contacts_wrapper > .row > .col-xs-12.col-md-6").addClass(
                            "col-lg-6 text-left"
                        );
                        $("#tabla_contacts_wrapper .row")
                            .eq(1)
                            .find(".col-xs-12")
                            .addClass("w-100");
                    },
                });
            });
        },
    },

});
</script>
