<template>
    <AppLayoutVuexy>

        <div class="container ">
            <div class="container table-responsive bg-table-gen   my-4" style="font-size: 0.9rem">
            <div class="col-9 col-sm-8 col-md-10 mb-4">
                <h5 class="text-start  letraMuyAzul"><strong>Ver Facturas</strong></h5>
            </div>
            <table class="table text-center  mt-5" id="data-table">
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Empleado</th>
                        <th>Valor Total</th>
                        <th>Estado</th>
                        <th>Fecha</th>
                        
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(i, index) in facturas" v-bind:key="index">
                        <td>{{ i?.cliente?.usuario?.name }}</td>
                        <td>{{ i?.empleado?.usuario?.name }}</td>
                        <td>{{ (i?.total_bill) }}</td>
                        <td>{{ i?.estado?.name_state }}</td>
                        <td>{{ i?.created_at }}</td>
                       
                    </tr>
                </tbody>
            </table>
            <!-- <pagination :users="patients" @pagi="getResults($event)" /> -->
        </div>

        </div>

    
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
