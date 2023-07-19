<template>
    <div class="card">
        <div class="p-col-12">
            <BarraMenu :id_company="id_company"></BarraMenu>
        </div>
        <div class="p-col-12">
            <Toast />

            <div class="p-grid">
                <div class="p-col">
                    <span class="align-text-bottom">
                        <h6>
                            Rácios Financeiros</h6>
                            <div class="p-grid">
                                <div class="p-col-12">
                                    Rácio de Endividamento: <InputText  class="p-inputtext" disabled  v-model="Racio_Endividamento" />
                                </div>
                                <div class="p-col-12">
                                    Rácio de Recuperação de Dívida: <InputText  class="p-inputtext" disabled  placeholder="2º fase" />
                                </div>
                                <div class="p-col-12">
                                    Rácio de Liquidez: <InputText  class="p-inputtext" disabled  v-model="Racio_Liquidez" />
                                </div>
                                <div class="p-col-12">
                                    Rácio de Solvabilidade: <InputText  class="p-inputtext" disabled  v-model="Racio_Solvabilidade" />
                                </div>
                                <div class="p-col-12">
                                    Rácio de Autonomia Financeira: <InputText  class="p-inputtext" disabled  v-model="Racio_Autonomia_Financeira" />
                                </div>
                            </div>
                        
                    </span>
                </div>
                <div class="p-col-6">
                    <h6>
                        Rácios Económicos </h6>
                        <div class="p-grid">
                                <div class="p-col-12">
                                    Rentabilidade das Vendas: <InputText  class="p-inputtext" disabled  v-model="Rentabilidade_de_Vendas" />
                                </div>
                                <div class="p-col-12">
                                    Rentabilidade dos Capitais Próprios: <InputText  class="p-inputtext" disabled  v-model="Rentabilidade_dos_Capitais_Próprios"/>
                                </div>
                                <div class="p-col-12">
                                   Prazo Médio de Recebimentos: <InputText  class="p-inputtext" disabled  v-model="Prazo_Medio_Recebimentos" />
                                </div>
                                <div class="p-col-12">
                                   Prazo Médio de Pagamentos: <InputText  class="p-inputtext" disabled  v-model="Prazo_Medio_Pagamentos" />
                                </div>
                                <div class="p-col-12">
                                    Prazo Médio de Stocks: <InputText  class="p-inputtext" disabled  v-model="Prazo_Medio_Stocks" />
                                </div>
                            </div>
                   
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import axios from 'axios';
import BarraMenu from '../components/BarraMenuCompany.vue';

export default {
    name: 'Fatura',
    data() {
        return {
            valueChange: 0,
            hiddenInput: true,
            hiddenID: '',
            loading3: false,
            capitalProprio: [],
            saftID: '',
            passivo: [],
            token: '',
            error: null,
            user: [],
            company: [],
            username: '',
            expandedRows: [],
            expandedRowsNCorrente: [],
            expandedRowsCP: [],
            expandedRowsPassivoCorrente: [],
            expandedRowsPassivoNCorrente: [],
            id_company: '',
            display: true,
            getCompanyUrl: process.env.VUE_APP_URLBack + '/company/companyInfo',
            activo: [],
            companyName: '',
            accounts: null,

            balanco: null,
            dr: null,
            Racio_Endividamento: 0,
            Racio_Liquidez: 0,
            Racio_Solvabilidade: 0,
            Racio_Autonomia_Financeira: 0,
            Rentabilidade_de_Vendas: 0,
            Rentabilidade_dos_Capitais_Próprios: 0,
            Prazo_Medio_Recebimentos: 0,
            Prazo_Medio_Pagamentos: 0,
            Prazo_Medio_Stocks: 0,
        };
    },
    mounted() {
        this.id_company = this.$route.query.id_company;
        this.saftID = this.$route.query.saftid;
        this.token = JSON.parse(localStorage.getItem('token'));
        this.getRacios();
        this.callInfoCompany();
    },
    components: {
        BarraMenu,
    },
    methods: {
        callInfoCompany() {
            var token = this.token;
            var id_company = this.id_company;
            axios
                .get(this.getCompanyUrl, {
                    headers: { token: token, id_company: id_company },
                })
                .then(data => {
                    this.user = data.data.user;
                    this.company = data.data.company;
                    this.username = data.data.user.username;
                    this.companyName = data.data.company.name;
                })
                .catch(error => {
                    // Request failed.
                    console.log('error', error.response);
                    this.error = error.response.statusText;
                });
        },
        onRowExpand(event) {
            this.expandedRows = null;
            this.expandedRows = this.activoCorrente.filter(p => p.id == event.data.id);
            axios({
                url: process.env.VUE_APP_URLBack + '/balanco/getAccountsBalanco',
                data: {
                    file: this.saftID,
                    tipo: event.data.tipo,
                    tipoID: event.data.id,
                },
                method: 'POST',
            }).then(data => {
                console.log(data.data.accounts);
                this.accounts = data.data.accounts;
            });

            this.$toast.add({ severity: 'info', summary: 'Regra expandida', detail: event.data.name, life: 3000 });
        },
        rowClass(rowData) {
            return rowData.teste ? '' : 'no-expander';
        },
        onRowExpandNCorrente(event) {
            this.expandedRows = null;
            this.expandedRows = this.activoNaoCorrente.filter(p => p.id == event.data.id);
            axios({
                url: process.env.VUE_APP_URLBack + '/balanco/getAccountsBalanco',
                data: {
                    file: this.saftID,
                    tipo: event.data.tipo,
                    tipoID: event.data.id,
                },
                method: 'POST',
            }).then(data => {
                console.log(data.data.accounts);
                this.accounts = data.data.accounts;
            });

            this.$toast.add({ severity: 'info', summary: 'Regra expandida', detail: event.data.name, life: 3000 });
        },
        onRowCollapse(event) {
            this.$toast.add({ severity: 'success', summary: 'Regra recolhida', detail: event.data.name, life: 3000 });
        },
        getRacios() {
            var saftID = this.saftID;
            var url = process.env.VUE_APP_URLBack + '/racios/getRacios';
            axios({
                url: url,
                data: {
                    file: saftID,
                },
                method: 'POST',
            })
                .then(data => {
                    console.log(data.data)
                    this.balnco = data.data.passivo;
                    this.dr = data.data.activo;
                    this.Racio_Endividamento = data.data.Racio_Endividamento + " €"
                    this.Racio_Liquidez = data.data.Racio_Liquidez + " €"
                    this.Racio_Solvabilidade = data.data.Racio_Solvabilidade + " €"
                    this.Racio_Autonomia_Financeira = data.data.Racio_Autonomia_Financeira + " €"
                    this.Rentabilidade_de_Vendas = data.data.Rentabilidade_de_Vendas + " €"
                    this.Rentabilidade_dos_Capitais_Próprios = data.data.Rentabilidade_dos_Capitais_Próprios + " €"
                    this.Prazo_Medio_Recebimentos = data.data.Prazo_Medio_Recebimentos + " dias"
                    this.Prazo_Medio_Pagamentos = data.data.Prazo_Medio_Pagamentos + " dias"
                    this.Prazo_Medio_Stocks = data.data.Prazo_Medio_Stocks + " dias"
                })
                .catch(err => {
                    console.log(err);
                    console.log('Cannot');
                });
        },
        round(value, precision) {
            if (Number.isInteger(precision)) {
                var shift = Math.pow(10, precision);
                // Limited preventing decimal issue
                return Math.round(value * shift + 1e-14) / shift;
            } else {
                return Math.round(value);
            }
        },
    },
};
</script>
<style>
.vl {
    border-left: 2px solid lightskyblue;
}
.p-datatable .p-datatable-tbody > tr.no-expander > td .p-row-toggler {
    display: none;
}
</style>