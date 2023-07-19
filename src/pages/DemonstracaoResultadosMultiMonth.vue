<template>
        <div class="card">
           <BarraMenu :id_company="id_company"></BarraMenu>
            <div class="p-col-12">
                <DataTable :value="primeiraParte" :rowClass="rowClass" :loading="loading2">
                    <Column header="Descrição" field="name" :style="{width:'250px'}"></Column>
                    <Column header="Mês 12" field="valueMes12" :style="{width:'250px'}"></Column>
                    <Column header="Mês 13" field="valueMes13" :style="{width:'250px'}"></Column>
                    <Column header="Mês 14" field="valueMes14" :style="{width:'250px'}"></Column>
                    <Column header="Mês até 20" field="valueMes15" :style="{width:'250px'}"></Column>
                    <Column header="Total" field="value" :style="{width:'250px'}"></Column>
                </DataTable>
                <DataTable :value="segundaParte" :rowClass="rowClass2" :loading="loading2">
                    <Column field="name" :style="{width:'250px'}"></Column>
                    <Column field="valueMes12" :style="{width:'250px'}"></Column>
                    <Column field="valueMes13" :style="{width:'250px'}"></Column>
                    <Column field="valueMes14" :style="{width:'250px'}"></Column>
                    <Column field="valueMes15" :style="{width:'250px'}"></Column>
                    <Column field="value" :style="{width:'250px'}"></Column>
                </DataTable>
                <DataTable :value="terceiraParte" :rowClass="rowClass3" :loading="loading2">
                    <Column field="name" :style="{width:'250px'}"></Column>
                    <Column field="valueMes12" :style="{width:'250px'}"></Column>
                    <Column field="valueMes13" :style="{width:'250px'}"></Column>
                    <Column field="valueMes14" :style="{width:'250px'}"></Column>
                    <Column field="valueMes15" :style="{width:'250px'}"></Column>
                    <Column field="value" :style="{width:'250px'}"></Column>
                </DataTable>
                <DataTable :value="quartaParte" :rowClass="rowClass4" :loading="loading2">
                    <Column field="name" :style="{width:'250px'}"></Column>
                    <Column field="valueMes12" :style="{width:'250px'}"></Column>
                    <Column field="valueMes13" :style="{width:'250px'}"></Column>
                    <Column field="valueMes14" :style="{width:'250px'}"></Column>
                    <Column field="valueMes15" :style="{width:'250px'}"></Column>
                    <Column field="value" :style="{width:'250px'}"></Column>
                </DataTable>
            </div>
        </div>
</template>


<script>
import axios from 'axios';
import BarraMenu from '../components/BarraMenuCompany.vue';

import { mapState } from 'vuex';
import jsPDF from 'jspdf';
import domtoimage from 'dom-to-image';
export default {
    name: 'Fatura',
    data() {
        return {
            githubUrl: process.env.VUE_APP_URLBack + '/company/companyInfo',
            display: false,

            activo: [],
            primeiraParte: [
                {
                    name: 'Vendas e serviços prestados (71+72)',
                    valueMes12: 0,
                    valueMes13: 0,
                    valueMes14: 0,
                    valueMes15: 0,
                    value: 0,
                },
                {
                    name: 'Subsídios à exploração (75)',
                    valueMes12: 0,
                    valueMes13: 0,
                    valueMes14: 0,
                    valueMes15: 0,
                    value: 0,
                },
                {
                    name: 'Custos de matérias-primas(61)	',
                    valueMes12: 0,
                    valueMes13: 0,
                    valueMes14: 0,
                    valueMes15: 0,
                    value: 0,
                },
                {
                    name: 'Fornecimentos de serviços externos(62)	',
                    valueMes12: 0,
                    valueMes13: 0,
                    valueMes14: 0,
                    valueMes15: 0,
                    value: 0,
                },
                {
                    name: 'Gastos com o pessoal(63)	',
                    valueMes12: 0,
                    valueMes13: 0,
                    valueMes14: 0,
                    valueMes15: 0,
                    value: 0,
                },
                {
                    name: 'Outros rendimentos(78)	',
                    valueMes12: 0,
                    valueMes13: 0,
                    valueMes14: 0,
                    valueMes15: 0,
                    value: 0,
                },
                {
                    name: 'Outros gastos(68)	',
                    valueMes12: 0,
                    valueMes13: 0,
                    valueMes14: 0,
                    valueMes15: 0,
                    value: 0,
                },
                {
                    name: 'Resultado antes de declarações, gastos de financiamento e impostos',

                    value: 0,
                },
            ],
            segundaParte: [
                {
                    name: 'Gastos/reversões de depreciação e de amortização(64)	',
                    valueMes12: 0,
                    valueMes13: 0,
                    valueMes14: 0,
                    valueMes15: 0,
                    value: 0,
                },
                {
                    name: 'Resultado Operacional (antes de gastos de financiamento e impostos)',
                    valueMes12: 0,
                    valueMes13: 0,
                    valueMes14: 0,
                    valueMes15: 0,
                    value: 0,
                },
            ],
            terceiraParte: [
                {
                    name: 'Juros e rendimentos similares obtidos(79)	',
                    value: '0',
                },
                {
                    name: 'Juros e gastos similares suportados(69)',
                    value: '0',
                },
                {
                    name: 'Resultado antes de Impostos',
                    value: '73.621,29',
                },
            ],
            quartaParte: [
                {
                    name: 'Impostos sobre o rendimento do periodo	',
                    value: '- 14.673,26',
                },
                {
                    name: 'Resultado líquido do períodos',
                    value: '58.948,03',
                },
            ],
            capitalProprio: [],
            saftID: '9876543210_joao_1624026941295',
            passivo: [],
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvYW8iLCJlbWFpbCI6ImVtYWlsQHRlc3RlIiwiaWF0IjoxNjI2MTg3MTIxLCJleHAiOjE2MjY1NDcxMjF9.D2WzKAbaM5cV4_rhHnLWaoS2BnkO2G0sptIQ66lFEMk',
            cats: [],
            error: null,
            user: [],
            loading2: true,
            company: [],
            companyName: '',
            username: '',
            id_company: '',
            menuItems: [
                {
                    label: 'Balanço',
                    icon: 'pi pi-fw pi-check',
                    url: 'balanco',
                },
                {
                    label: 'Demonstração resultados',
                    icon: 'pi pi-fw pi-refresh',
                    url: '/demonstracaoResultados',
                },
                {
                    label: 'Download PDF',
                    icon: 'pi pi-fw pi-download',
                },
                {
                    label: 'Outros SAFT',
                    icon: 'pi pi-fw pi-trash',
                },
                {
                    label: 'Back',
                    icon: 'pi pi-fw pi-trash',
                    url: '/company',
                },
            ],
            demonstracaoResultados: [],
            totalResultadoLiquidoSemImpostos: 0,
            totalResultadoOperacional: 0,
            totalAntesImpostos: 0,
            resultadoLiquido: 0,
            valorTotal71: [],
            valorTotal72: [],
            contasCredit71: [],
            contasCredit72: [],
            contasDebit71: [],
            contasDebit72: [],
            valorfinal: [],
            loaded: false,
            datacollection: null,
            datacollection2: null,
            doughnutCollection: null,
            modal: 'demonstracaoResultados',
            // DR Mensal  antes de declarações, gastos de financiamento e impostos
            totalCreditoAntesImpostosMes12: 0,
            totalDebitoAntesImpostosMes12: 0,
            totalAntesImpostosMes12: 0,

            totalCreditoAntesImpostosMes13: 0,
            totalDebitoAntesImpostosMes13: 0,
            totalAntesImpostosMes13: 0,

            totalCreditoAntesImpostosMes14: 0,
            totalDebitoAntesImpostosMes14: 0,
            totalAntesImpostosMes14: 0,

            totalCreditoAntesImpostosMes20: 0,
            totalDebitoAntesImpostosMes2: 0,
            totalAntesImpostosMes20: 0,
            // DR Operacional
            totalCreditoOperacionalMes12: 0,
            totalDebitoOperacionalMes12: 0,
            totalOperacionalMes12: 0,

            totalCreditoOperacionalMes13: 0,
            totalDebitoOperacionalMes13: 0,
            totalOperacionalMes13: 0,

            totalCreditoOperacionalMes14: 0,
            totalDebitoOperacionalMes14: 0,
            totalOperacionalMes14: 0,

            totalCreditoOperacionalMes20: 0,
            totalDebitoOperacionalMes2: 0,
            totalOperacionalMes20: 0,

            //DR ANtes impostos

            totalCreditoAntesImpostosFinalMes12: 0,
            totalDebitoAntesImpostosFinalMes12: 0,
            totalAntesImpostosFinalMes12: 0,

            totalCreditoAntesImpostosFinalMes13: 0,
            totalDebitoAntesImpostosFinalMes13: 0,
            totalAntesImpostosFinalMes13: 0,

            totalCreditoAntesImpostosFinalMes14: 0,
            totalDebitoAntesImpostosFinalMes14: 0,
            totalAntesImpostosFinalMes14: 0,

            totalCreditoAntesImpostosFinalMes20: 0,
            totalDebitoAntesImpostosFinalMes2: 0,
            totalAntesImpostosFinalMes20: 0,

            // DR mensal liquido

            totalCreditoLiquidoMes12: 0,
            totalDebitoLiquidoMes12: 0,
            totalLiquidoMes12: 0,

            totalCreditoLiquidoMes13: 0,
            totalDebitoLiquidoMes13: 0,
            totalLiquidoMes13: 0,

            totalCreditoLiquidoMes14: 0,
            totalDebitoLiquidoMes14: 0,
            totalLiquidoMes14: 0,

            totalCreditoLiquidoMes20: 0,
            totalDebitoLiquidoMes2: 0,
            totalLiquidoMes20: 0,
        };
    },
    computed: {
        sortedCompareSaft: function() {
            let result = this.resultCompareSaft;
            result = result.filter(
                result =>
                    result.customer.toString().includes(this.searchCustomer) &&
                    result.invoiceNumber.toString().includes(this.searchInvoiceNumber) &&
                    result.invoiceDate.toString().includes(this.searchInvoiceDate) &&
                    result.invoiceAmount.toString().includes(this.searchInvoiceAmount) &&
                    result.transaction.toString().includes(this.searchTransaction)
            );

            return result;
        },

        ...mapState(['token']),
    },

    components: {
        BarraMenu,
    },
    methods: {
        callInfoCompany() {
            this.token = JSON.parse(localStorage.getItem('token'));
            var token = this.token;
            this.id_company = this.$route.query.id_company;
            var id_company = this.id_company;
            axios
                .get(this.githubUrl, {
                    headers: { token: token, id_company: id_company },
                })
                .then(data => {
                    //  console.log(data);
                    this.user = data.data.user;
                    this.company = data.data.company;
                    this.username = data.data.user.username;
                    this.companyName = data.data.company.name;
                    var id_company = this.id_company;
                    var username = this.username;
                    console.log('Teste id: ' + id_company + ' ' + username);
                })
                .catch(error => {
                    // Request failed.
                    console.log('error', error.response);
                    this.error = error.response.statusText;
                });
        },
        round(value, precision) {
            if (Number.isInteger(precision)) {
                var shift = Math.pow(10, precision);
                // Limited preventing decimal issue
                return Math.round(value * shift + 0.00000000000001) / shift;
            } else {
                return Math.round(value);
            }
        },
        toggle(event) {
            this.$refs.menu.toggle(event);
        },
        downloadPDF() {
            domtoimage
                .toPng(this.$refs.content)
                .then(function(dataUrl) {
                    var img = new Image();
                    img.src = dataUrl;
                    const doc = new jsPDF({
                        orientation: 'portrait',
                        // unit: "pt",
                        format: [350, 350],
                    });
                    doc.addImage(img, 'JPEG', 10, 10);
                    //const date = new Date();
                    const filename = 'demonstracaoResultados' + '.pdf';

                    doc.save(filename);
                })
                .catch(function(error) {
                    console.error('oops, something went wrong!', error);
                });
        },
        rowClass(data) {
            return data.name === 'Resultado antes de declarações, gastos de financiamento e impostos' ? 'last-row' : null;
        },
        rowClass2(data) {
            return data.name === 'Resultado Operacional (antes de gastos de financiamento e impostos)' ? 'last-row' : null;
        },
        rowClass3(data) {
            return data.name === 'Resultado antes de Impostos' ? 'last-row' : null;
        },
        rowClass4(data) {
            return data.name === 'Resultado líquido do períodos' ? 'last-row' : null;
        },
        getDemonstracaoResultados() {
            console.log(this.$route.query.saftID);
            // this.saftID = this.$route.query.saftID;
            var saftID = this.saftID;
            console.log(saftID);
            var url = process.env.VUE_APP_URLBack + '/demonstracaoResultados/checkDRFile/' + saftID;
            console.log(url);
            //  commit('auth_request')
            axios({
                url: url,
                method: 'GET',
            })
                .then(data => {
                    // console.log("teste")
                    console.log(data.data.demonstracaoResultados.somaContaCredit71mes12 + ' demonstracao resultado');
                    this.demonstracaoResultados = data.data.demonstracaoResultados;
                    console.log(this.demonstracaoResultados);
                    this.totalResultadoLiquidoSemImpostos +=
                        this.demonstracaoResultados.somaContaCredit71mes12 +
                        this.demonstracaoResultados.somaContaCredit72mes12 +
                        this.demonstracaoResultados.somaContaCredit71mes13 +
                        this.demonstracaoResultados.somaContaCredit72mes13 -
                        (this.demonstracaoResultados.somaContaDebit71mes12 + this.demonstracaoResultados.somaContaDebit72mes12 + this.demonstracaoResultados.somaContaDebit71mes13 + this.demonstracaoResultados.somaContaDebit72mes13);
                    this.totalResultadoLiquidoSemImpostos +=
                        this.demonstracaoResultados.somaContaCredit75mes12 + this.demonstracaoResultados.somaContaCredit75mes13 - (this.demonstracaoResultados.somaContaDebit75mes12 + this.demonstracaoResultados.somaContaDebit75mes13);
                    this.totalResultadoLiquidoSemImpostos +=
                        this.demonstracaoResultados.somaContaCredit61mes12 +
                        this.demonstracaoResultados.somaContaCredit62mes12 +
                        this.demonstracaoResultados.somaContaCredit61mes13 +
                        this.demonstracaoResultados.somaContaCredit62mes13 -
                        (this.demonstracaoResultados.somaContaDebit61mes12 + this.demonstracaoResultados.somaContaDebit62mes12 + this.demonstracaoResultados.somaContaDebit61mes13 + this.demonstracaoResultados.somaContaDebit62mes13);
                    this.totalResultadoLiquidoSemImpostos +=
                        this.demonstracaoResultados.somaContaCredit63mes12 + this.demonstracaoResultados.somaContaCredit63mes13 - (this.demonstracaoResultados.somaContaDebit63mes12 + this.demonstracaoResultados.somaContaDebit63mes13);
                    this.totalResultadoLiquidoSemImpostos +=
                        this.demonstracaoResultados.somaContaCredit78mes12 + this.demonstracaoResultados.somaContaCredit78mes13 - (this.demonstracaoResultados.somaContaDebit78mes12 + this.demonstracaoResultados.somaContaDebit78mes13);
                    this.totalResultadoLiquidoSemImpostos +=
                        this.demonstracaoResultados.somaContaCredit68mes12 + this.demonstracaoResultados.somaContaCredit68mes13 - (this.demonstracaoResultados.somaContaDebit68mes12 + this.demonstracaoResultados.somaContaDebit68mes13);

                    this.totalResultadoOperacional =
                        this.totalResultadoLiquidoSemImpostos +
                        (this.demonstracaoResultados.somaContaCredit64mes12 + this.demonstracaoResultados.somaContaCredit64mes13 - (this.demonstracaoResultados.somaContaDebit64mes12 + this.demonstracaoResultados.somaContaDebit64mes13));

                    this.totalAntesImpostos +=
                        this.totalResultadoOperacional +
                        (this.demonstracaoResultados.somaContaCredit79mes12 + this.demonstracaoResultados.somaContaCredit79mes13 - (this.demonstracaoResultados.somaContaDebit79mes12 + this.demonstracaoResultados.somaContaDebit79mes13));
                    this.totalAntesImpostos +=
                        this.demonstracaoResultados.somaContaCredit69mes12 + this.demonstracaoResultados.somaContaCredit69mes13 - (this.demonstracaoResultados.somaContaDebit69mes12 + this.demonstracaoResultados.somaContaDebit69mes13);

                    this.resultadoLiquido += this.totalAntesImpostos - (this.demonstracaoResultados.somaContaCredit812mes20 - this.demonstracaoResultados.somaContaDebit812mes20);

                    // DR MENSAL
                    // Resultado antes de declarações, gastos de financiamento e impostos
                    // Credito Mes 1 ao 12
                    this.totalCreditoAntesImpostosMes12 =
                        this.demonstracaoResultados.somaContaCredit71mes12 +
                        this.demonstracaoResultados.somaContaCredit72mes12 +
                        this.demonstracaoResultados.somaContaCredit75mes12 +
                        this.demonstracaoResultados.somaContaCredit61mes12 +
                        this.demonstracaoResultados.somaContaCredit62mes12 +
                        this.demonstracaoResultados.somaContaCredit63mes12 +
                        this.demonstracaoResultados.somaContaCredit78mes12 +
                        this.demonstracaoResultados.somaContaCredit68mes12;
                    // Debito Mes 1 ao 12
                    this.totalDebitoAntesImpostosMes12 =
                        this.demonstracaoResultados.somaContaDebit71mes12 +
                        this.demonstracaoResultados.somaContaDebit72mes12 +
                        this.demonstracaoResultados.somaContaDebit75mes12 +
                        this.demonstracaoResultados.somaContaDebit61mes12 +
                        this.demonstracaoResultados.somaContaDebit62mes12 +
                        this.demonstracaoResultados.somaContaDebit63mes12 +
                        this.demonstracaoResultados.somaContaDebit78mes12 +
                        this.demonstracaoResultados.somaContaDebit68mes12;
                    // Total mes 1 ao 12
                    this.totalAntesImpostosMes12 = this.totalCreditoAntesImpostosMes12 - this.totalDebitoAntesImpostosMes12;

                    // Credito mes 13
                    this.totalCreditoAntesImpostosMes13 =
                        this.demonstracaoResultados.somaContaCredit71mes13 +
                        this.demonstracaoResultados.somaContaCredit72mes13 +
                        this.demonstracaoResultados.somaContaCredit75mes13 +
                        this.demonstracaoResultados.somaContaCredit61mes13 +
                        this.demonstracaoResultados.somaContaCredit62mes13 +
                        this.demonstracaoResultados.somaContaCredit63mes13 +
                        this.demonstracaoResultados.somaContaCredit78mes13 +
                        this.demonstracaoResultados.somaContaCredit68mes13;
                    // Debito mes 13
                    this.totalDebitoAntesImpostosMes13 =
                        this.demonstracaoResultados.somaContaDebit71mes13 +
                        this.demonstracaoResultados.somaContaDebit72mes13 +
                        this.demonstracaoResultados.somaContaDebit75mes13 +
                        this.demonstracaoResultados.somaContaDebit61mes13 +
                        this.demonstracaoResultados.somaContaDebit62mes13 +
                        this.demonstracaoResultados.somaContaDebit63mes13 +
                        this.demonstracaoResultados.somaContaDebit78mes13 +
                        this.demonstracaoResultados.somaContaDebit68mes13;
                    // Total mes 13
                    this.totalAntesImpostosMes13 = this.totalCreditoAntesImpostosMes13 - this.totalDebitoAntesImpostosMes13;

                    // Credito mes 14
                    this.totalCreditoAntesImpostosMes14 =
                        this.demonstracaoResultados.somaContaCredit71mes14 +
                        this.demonstracaoResultados.somaContaCredit72mes14 +
                        this.demonstracaoResultados.somaContaCredit75mes14 +
                        this.demonstracaoResultados.somaContaCredit61mes14 +
                        this.demonstracaoResultados.somaContaCredit62mes14 +
                        this.demonstracaoResultados.somaContaCredit63mes14 +
                        this.demonstracaoResultados.somaContaCredit78mes14 +
                        this.demonstracaoResultados.somaContaCredit68mes14;
                    // Debito mes 14
                    this.totalDebitoAntesImpostosMes14 =
                        this.demonstracaoResultados.somaContaDebit71mes14 +
                        this.demonstracaoResultados.somaContaDebit72mes14 +
                        this.demonstracaoResultados.somaContaDebit75mes14 +
                        this.demonstracaoResultados.somaContaDebit61mes14 +
                        this.demonstracaoResultados.somaContaDebit62mes14 +
                        this.demonstracaoResultados.somaContaDebit63mes14 +
                        this.demonstracaoResultados.somaContaDebit78mes14 +
                        this.demonstracaoResultados.somaContaDebit68mes14;
                    // Total mes 14
                    this.totalAntesImpostosMes14 = this.totalCreditoAntesImpostosMes14 - this.totalDebitoAntesImpostosMes14;

                    // Credito mes 20
                    this.totalCreditoAntesImpostosMes20 =
                        this.demonstracaoResultados.somaContaCredit71mes20 +
                        this.demonstracaoResultados.somaContaCredit72mes20 +
                        this.demonstracaoResultados.somaContaCredit75mes20 +
                        this.demonstracaoResultados.somaContaCredit61mes20 +
                        this.demonstracaoResultados.somaContaCredit62mes20 +
                        this.demonstracaoResultados.somaContaCredit63mes20 +
                        this.demonstracaoResultados.somaContaCredit78mes20 +
                        this.demonstracaoResultados.somaContaCredit68mes20;
                    // Debito mes 20
                    this.totalDebitoAntesImpostosMes20 =
                        this.demonstracaoResultados.somaContaDebit71mes20 +
                        this.demonstracaoResultados.somaContaDebit72mes20 +
                        this.demonstracaoResultados.somaContaDebit75mes20 +
                        this.demonstracaoResultados.somaContaDebit61mes20 +
                        this.demonstracaoResultados.somaContaDebit62mes20 +
                        this.demonstracaoResultados.somaContaDebit63mes20 +
                        this.demonstracaoResultados.somaContaDebit78mes20 +
                        this.demonstracaoResultados.somaContaDebit68mes20;
                    // Total mes 20
                    this.totalAntesImpostosMes20 = this.totalCreditoAntesImpostosMes20 - this.totalDebitoAntesImpostosMes20;

                    // Resultado Operacional (antes de gastos de financiamento e impostos)
                    // Credito Mes 1 ao 12
                    this.totalCreditoOperacionalMes12 = this.totalCreditoAntesImpostosMes12 + this.demonstracaoResultados.somaContaCredit64mes12;
                    // Debito Mes 1 ao 12
                    this.totalDebitoOperacionalMes12 = this.totalDebitoAntesImpostosMes12 + this.demonstracaoResultados.somaContaDebit64mes12;
                    // Total mes 1 ao 12
                    this.totalOperacionalMes12 = this.totalCreditoOperacionalMes12 - this.totalDebitoOperacionalMes12;

                    // Credito mes 13
                    this.totalCreditoOperacionalMes13 = this.totalCreditoAntesImpostosMes13 + this.demonstracaoResultados.somaContaCredit64mes13;
                    // Debito mes 13
                    this.totalDebitoOperacionalMes13 = this.totalDebitoAntesImpostosMes13 + this.demonstracaoResultados.somaContaDebit64mes13;
                    // Total mes 13
                    this.totalOperacionalMes13 = this.totalCreditoOperacionalMes13 - this.totalDebitoOperacionalMes13;

                    // Credito mes 14
                    this.totalCreditoOperacionalMes14 = this.totalCreditoAntesImpostosMes14 + this.demonstracaoResultados.somaContaCredit64mes14;
                    // Debito mes 14
                    this.totalDebitoOperacionalMes14 = this.totalDebitoAntesImpostosMes14 + this.demonstracaoResultados.somaContaDebit64mes14;
                    // Total mes 14
                    this.totalOperacionalMes14 = this.totalCreditoOperacionalMes14 - this.totalDebitoOperacionalMes14;

                    // Credito mes 20
                    this.totalCreditoOperacionalMes20 = this.totalCreditoAntesImpostosMes20 + this.demonstracaoResultados.somaContaCredit64mes20;
                    // Debito mes 20
                    this.totalDebitoOperacionalMes20 = this.totalDebitoAntesImpostosMes20 + this.demonstracaoResultados.somaContaDebit64mes20;
                    // Total mes 20
                    this.totalOperacionalMes20 = this.totalCreditoOperacionalMes20 - this.totalDebitoOperacionalMes20;

                    //Resultado antes de Impostos
                    // Credito Mes 1 ao 12
                    this.totalCreditoAntesImpostosFinalMes12 = this.totalCreditoOperacionalMes12 + this.demonstracaoResultados.somaContaCredit79mes12 + this.demonstracaoResultados.somaContaCredit69mes12;
                    console.log(this.totalCreditoOperacionalMes12);
                    // Debito Mes 1 ao 12
                    this.totalDebitoAntesImpostosFinalMes12 = this.totalDebitoOperacionalMes12 + this.demonstracaoResultados.somaContaDebit79mes12 + this.demonstracaoResultados.somaContaCredit69mes12;
                    // Total mes 1 ao 12
                    this.totalAntesImpostosFinalMes12 = this.totalCreditoAntesImpostosFinalMes12 - this.totalDebitoAntesImpostosFinalMes12;

                    // Credito mes 13
                    this.totalCreditoAntesImpostosFinalMes13 = this.totalCreditoOperacionalMes13 + this.demonstracaoResultados.somaContaCredit79mes13 + this.demonstracaoResultados.somaContaCredit69mes13;
                    // Debito mes 13
                    this.totalDebitoAntesImpostosFinalMes13 = this.totalDebitoOperacionalMes13 + this.demonstracaoResultados.somaContaDebit79mes13 + this.demonstracaoResultados.somaContaCredit69mes13;
                    // Total mes 13
                    this.totalAntesImpostosFinalMes13 = this.totalCreditoOperacionalMes13 - this.totalDebitoAntesImpostosFinalMes13;

                    // Credito mes 14
                    this.totalCreditoAntesImpostosFinalMes14 = this.totalCreditoOperacionalMes14 + this.demonstracaoResultados.somaContaCredit79mes14 + this.demonstracaoResultados.somaContaCredit69mes14;
                    // Debito mes 14
                    this.totalDebitoAntesImpostosFinalMes14 = this.totalDebitoOperacionalMes14 + this.demonstracaoResultados.somaContaDebit79mes14 + this.demonstracaoResultados.somaContaCredit69mes14;
                    // Total mes 14
                    this.totalAntesImpostosFinalMes14 = this.totalCreditoAntesImpostosFinalMes14 - this.totalDebitoAntesImpostosFinalMes14;

                    // Credito mes 20
                    this.totalCreditoAntesImpostosFinalMes20 = this.totalCreditoOperacionalMes20 + this.demonstracaoResultados.somaContaCredit79mes20 + this.demonstracaoResultados.somaContaCredit69mes20;
                    // Debito mes 20
                    this.totalDebitoAntesImpostosFinalMes20 = this.totalDebitoOperacionalMes20 + this.demonstracaoResultados.somaContaDebit79mes20 + this.demonstracaoResultados.somaContaDebit69mes20;
                    // Total mes 20
                    this.totalAntesImpostosFinalMes20 = this.totalCreditoAntesImpostosFinalMes20 - this.totalDebitoAntesImpostosFinalMes20;

                    //Resultado liquido
                    // Credito Mes 1 ao 12
                    this.totalCreditoLiquidoMes12 = this.totalCreditoAntesImpostosFinalMes12 - this.demonstracaoResultados.somaContaCredit812mes12;
                    console.log(this.totalCreditoAntesImpostosFinalMes12);
                    // Debito Mes 1 ao 12
                    this.totalDebitoLiquidoMes12 = this.totalDebitoAntesImpostosFinalMes12 - this.demonstracaoResultados.somaContaDebit79mes12;
                    // Total mes 1 ao 12
                    this.totalLiquidoMes12 = this.totalCreditoLiquidoMes12 - this.totalDebitoLiquidoMes12;

                    // Credito mes 13
                    this.totalCreditoLiquidoMes13 = this.totalCreditoAntesImpostosFinalMes13 - this.demonstracaoResultados.somaContaCredit812mes14;
                    // Debito mes 13
                    this.totalDebitoLiquidoMes13 = this.totalDebitoAntesImpostosFinalMes13 - this.demonstracaoResultados.somaContaDebit812mes13;
                    // Total mes 13
                    this.totalLiquidoMes13 = this.totalCreditoAntesImpostosFinalMes13 - this.totalDebitoLiquidoMes13;

                    // Credito mes 14
                    this.totalCreditoLiquidoMes14 = this.totalCreditoAntesImpostosFinalMes14 - this.demonstracaoResultados.somaContaCredit812mes14;
                    // Debito mes 14
                    this.totalDebitoLiquidoMes14 = this.totalDebitoAntesImpostosFinalMes14 - this.demonstracaoResultados.somaContaDebit812mes14;
                    // Total mes 14
                    this.totalLiquidoMes14 = this.totalCreditoLiquidoMes14 - this.totalDebitoLiquidoMes14;

                    // Credito mes 20
                    this.totalCreditoLiquidoMes20 = this.totalCreditoAntesImpostosFinalMes20 - this.demonstracaoResultados.somaContaCredit812mes12;
                    // Debito mes 20
                    this.totalDebitoLiquidoMes20 = this.totalDebitoAntesImpostosFinalMes20 - this.demonstracaoResultados.somaContaDebit812mes20;
                    // Total mes 20
                    this.totalLiquidoMes20 = this.totalCreditoLiquidoMes20 - this.totalDebitoLiquidoMes20;

                    console.log('resultado antes ' + this.demonstracaoResultados);

                    // PRIMEIRA PARTE
                    this.primeiraParte[0].value = this.round(
                        this.demonstracaoResultados.somaContaCredit71mes12 +
                            this.demonstracaoResultados.somaContaCredit72mes12 +
                            this.demonstracaoResultados.somaContaCredit71mes13 +
                            this.demonstracaoResultados.somaContaCredit72mes13 -
                            (this.demonstracaoResultados.somaContaDebit71mes12 + this.demonstracaoResultados.somaContaDebit72mes12 + this.demonstracaoResultados.somaContaDebit71mes13 + this.demonstracaoResultados.somaContaDebit72mes13),
                        2
                    ).toLocaleString('de-DE', { maximumFractionDigits: 2 });
                    this.primeiraParte[0].valueMes12 = this.round(
                        this.demonstracaoResultados.somaContaCredit71mes12 + this.demonstracaoResultados.somaContaCredit72mes12 - (this.demonstracaoResultados.somaContaDebit71mes12 + this.demonstracaoResultados.somaContaDebit72mes12),
                        2
                    ).toLocaleString('de-DE', { maximumFractionDigits: 2 });
                    this.primeiraParte[0].valueMes13 = this.round(
                        this.demonstracaoResultados.somaContaCredit71mes13 + this.demonstracaoResultados.somaContaCredit72mes13 - (this.demonstracaoResultados.somaContaDebit71mes13 + this.demonstracaoResultados.somaContaDebit72mes13),
                        2
                    ).toLocaleString('de-DE', { maximumFractionDigits: 2 });
                    this.primeiraParte[0].valueMes14 = this.round(
                        this.demonstracaoResultados.somaContaCredit71mes14 + this.demonstracaoResultados.somaContaCredit72mes14 - (this.demonstracaoResultados.somaContaDebit71mes14 + this.demonstracaoResultados.somaContaDebit72mes14),
                        2
                    ).toLocaleString('de-DE', { maximumFractionDigits: 2 });
                    this.primeiraParte[0].valueMes15 = this.round(
                        this.demonstracaoResultados.somaContaCredit71mes20 + this.demonstracaoResultados.somaContaCredit72mes20 - (this.demonstracaoResultados.somaContaDebit71mes20 + this.demonstracaoResultados.somaContaDebit72mes20),
                        2
                    ).toLocaleString('de-DE', { maximumFractionDigits: 2 });

                    this.primeiraParte[1].value = this.round(
                        this.demonstracaoResultados.somaContaCredit75mes12 + this.demonstracaoResultados.somaContaCredit71mes13 - (this.demonstracaoResultados.somaContaDebit75mes12 + this.demonstracaoResultados.somaContaDebit75mes13),
                        2
                    ).toLocaleString('de-DE', { maximumFractionDigits: 2 });
                    this.primeiraParte[1].valueMes12 = this.round(this.demonstracaoResultados.somaContaCredit75mes12 - this.demonstracaoResultados.somaContaDebit75mes12, 2).toLocaleString('de-DE', { maximumFractionDigits: 2 });
                    this.primeiraParte[1].valueMes12 = this.round(this.demonstracaoResultados.somaContaCredit71mes13 - this.demonstracaoResultados.somaContaDebit75mes13, 2).toLocaleString('de-DE', { maximumFractionDigits: 2 });
                    this.primeiraParte[1].valueMes14 = this.round(this.demonstracaoResultados.somaContaCredit71mes14 - this.demonstracaoResultados.somaContaDebit75mes14, 2).toLocaleString('de-DE', { maximumFractionDigits: 2 });
                    this.primeiraParte[1].valueMes15 = this.round(this.demonstracaoResultados.somaContaCredit71mes20 - this.demonstracaoResultados.somaContaDebit75mes20, 2).toLocaleString('de-DE', { maximumFractionDigits: 2 });

                    this.primeiraParte[2].value = this.round(
                        this.demonstracaoResultados.somaContaCredit61mes12 + this.demonstracaoResultados.somaContaCredit61mes13 - (this.demonstracaoResultados.somaContaDebit61mes12 + this.demonstracaoResultados.somaContaDebit61mes13),
                        2
                    ).toLocaleString('de-DE', { maximumFractionDigits: 2 });
                    this.primeiraParte[2].valueMes12 = this.round(this.demonstracaoResultados.somaContaCredit61mes12 - this.demonstracaoResultados.somaContaDebit61mes12, 2).toLocaleString('de-DE', { maximumFractionDigits: 2 });
                    this.primeiraParte[2].valueMes13 = this.round(this.demonstracaoResultados.somaContaCredit61mes13 - this.demonstracaoResultados.somaContaDebit61mes13, 2).toLocaleString('de-DE', { maximumFractionDigits: 2 });
                    this.primeiraParte[2].valueMes14 = this.round(this.demonstracaoResultados.somaContaCredit61mes14 - this.demonstracaoResultados.somaContaDebit61mes14, 2).toLocaleString('de-DE', { maximumFractionDigits: 2 });
                    this.primeiraParte[2].valueMes15 = this.round(this.demonstracaoResultados.somaContaCredit61mes20 - this.demonstracaoResultados.somaContaDebit61mes20, 2).toLocaleString('de-DE', { maximumFractionDigits: 2 });

                    this.primeiraParte[3].value = this.round(
                        this.demonstracaoResultados.somaContaCredit62mes12 + this.demonstracaoResultados.somaContaCredit62mes13 - (this.demonstracaoResultados.somaContaDebit62mes12 + this.demonstracaoResultados.somaContaDebit62mes13),
                        2
                    ).toLocaleString('de-DE', { maximumFractionDigits: 2 });
                    this.primeiraParte[3].valueMes12 = this.round(this.demonstracaoResultados.somaContaCredit62mes12 - this.demonstracaoResultados.somaContaDebit62mes12, 2).toLocaleString('de-DE', { maximumFractionDigits: 2 });
                    this.primeiraParte[3].valueMes13 = this.round(this.demonstracaoResultados.somaContaCredit62mes13 - this.demonstracaoResultados.somaContaDebit62mes13, 2).toLocaleString('de-DE', { maximumFractionDigits: 2 });
                    this.primeiraParte[3].valueMes14 = this.round(this.demonstracaoResultados.somaContaCredit62mes14 - this.demonstracaoResultados.somaContaDebit62mes14, 2).toLocaleString('de-DE', { maximumFractionDigits: 2 });
                    this.primeiraParte[3].valueMes15 = this.round(this.demonstracaoResultados.somaContaCredit62mes20 - this.demonstracaoResultados.somaContaDebit62mes20, 2).toLocaleString('de-DE', { maximumFractionDigits: 2 });

                    this.primeiraParte[4].value = this.round(
                        this.demonstracaoResultados.somaContaCredit63mes12 + this.demonstracaoResultados.somaContaCredit63mes13 - (this.demonstracaoResultados.somaContaDebit63mes12 + this.demonstracaoResultados.somaContaDebit63mes13),
                        2
                    ).toLocaleString('de-DE', { maximumFractionDigits: 2 });
                    this.primeiraParte[4].valueMes12 = this.round(this.demonstracaoResultados.somaContaCredit63mes12 - this.demonstracaoResultados.somaContaDebit63mes12, 2).toLocaleString('de-DE', { maximumFractionDigits: 2 });
                    this.primeiraParte[4].valueMes13 = this.round(this.demonstracaoResultados.somaContaCredit63mes13 - this.demonstracaoResultados.somaContaDebit63mes13, 2).toLocaleString('de-DE', { maximumFractionDigits: 2 });
                    this.primeiraParte[4].valueMes14 = this.round(this.demonstracaoResultados.somaContaCredit63mes14 - this.demonstracaoResultados.somaContaDebit63mes14, 2).toLocaleString('de-DE', { maximumFractionDigits: 2 });
                    this.primeiraParte[4].valueMes15 = this.round(this.demonstracaoResultados.somaContaCredit63mes20 - this.demonstracaoResultados.somaContaDebit63mes20, 2).toLocaleString('de-DE', { maximumFractionDigits: 2 });

                    this.primeiraParte[5].value = this.round(
                        this.demonstracaoResultados.somaContaCredit78mes12 + this.demonstracaoResultados.somaContaCredit78mes13 - (this.demonstracaoResultados.somaContaDebit78mes12 + this.demonstracaoResultados.somaContaDebit78mes13),
                        2
                    ).toLocaleString('de-DE', { maximumFractionDigits: 2 });
                    this.primeiraParte[5].valueMes12 = this.round(this.demonstracaoResultados.somaContaCredit78mes12 - this.demonstracaoResultados.somaContaDebit78mes12, 2).toLocaleString('de-DE', { maximumFractionDigits: 2 });
                    this.primeiraParte[5].valueMes13 = this.round(this.demonstracaoResultados.somaContaCredit78mes13 - this.demonstracaoResultados.somaContaDebit78mes13, 2).toLocaleString('de-DE', { maximumFractionDigits: 2 });
                    this.primeiraParte[5].valueMes14 = this.round(this.demonstracaoResultados.somaContaCredit78mes14 - this.demonstracaoResultados.somaContaDebit78mes14, 2).toLocaleString('de-DE', { maximumFractionDigits: 2 });
                    this.primeiraParte[5].valueMes15 = this.round(this.demonstracaoResultados.somaContaCredit78mes20 - this.demonstracaoResultados.somaContaDebit78mes20, 2).toLocaleString('de-DE', { maximumFractionDigits: 2 });

                    this.primeiraParte[6].value = this.round(
                        this.demonstracaoResultados.somaContaCredit68mes12 + this.demonstracaoResultados.somaContaCredit68mes13 - (this.demonstracaoResultados.somaContaDebit68mes12 + this.demonstracaoResultados.somaContaDebit68mes13),
                        2
                    ).toLocaleString('de-DE', { maximumFractionDigits: 2 });
                    this.primeiraParte[6].valueMes12 = this.round(this.demonstracaoResultados.somaContaCredit68mes12 - this.demonstracaoResultados.somaContaDebit68mes12, 2).toLocaleString('de-DE', { maximumFractionDigits: 2 });
                    this.primeiraParte[6].valueMes13 = this.round(this.demonstracaoResultados.somaContaCredit68mes13 - this.demonstracaoResultados.somaContaDebit68mes13, 2).toLocaleString('de-DE', { maximumFractionDigits: 2 });
                    this.primeiraParte[6].valueMes14 = this.round(this.demonstracaoResultados.somaContaCredit68mes14 - this.demonstracaoResultados.somaContaDebit68mes14, 2).toLocaleString('de-DE', { maximumFractionDigits: 2 });
                    this.primeiraParte[6].valueMes15 = this.round(this.demonstracaoResultados.somaContaCredit68mes20 - this.demonstracaoResultados.somaContaDebit68mes20, 2).toLocaleString('de-DE', { maximumFractionDigits: 2 });

                    this.primeiraParte[7].value = this.round(this.totalResultadoLiquidoSemImpostos, 2).toLocaleString('de-DE', { maximumFractionDigits: 2 });
                    // SEGUNDA PARTE
                    this.segundaParte[0].value = this.round(
                        this.demonstracaoResultados.somaContaCredit64mes12 + this.demonstracaoResultados.somaContaCredit64mes13 - (this.demonstracaoResultados.somaContaDebit64mes12 + this.demonstracaoResultados.somaContaDebit64mes13),
                        2
                    ).toLocaleString('de-DE', { maximumFractionDigits: 2 });
                    this.segundaParte[0].valueMes12 = this.round(this.demonstracaoResultados.somaContaCredit64mes12 - this.demonstracaoResultados.somaContaDebit64mes12, 2).toLocaleString('de-DE', { maximumFractionDigits: 2 });
                    this.segundaParte[0].valueMes13 = this.round(this.demonstracaoResultados.somaContaCredit64mes13 - this.demonstracaoResultados.somaContaDebit64mes13, 2).toLocaleString('de-DE', { maximumFractionDigits: 2 });
                    this.segundaParte[0].valueMes14 = this.round(this.demonstracaoResultados.somaContaCredit64mes14 - this.demonstracaoResultados.somaContaDebit64mes14, 2).toLocaleString('de-DE', { maximumFractionDigits: 2 });
                    this.segundaParte[0].valueMes15 = this.round(this.demonstracaoResultados.somaContaCredit64mes20 - this.demonstracaoResultados.somaContaDebit64mes20, 2).toLocaleString('de-DE', { maximumFractionDigits: 2 });
                    this.segundaParte[1].value = this.round(this.totalResultadoOperacional, 2).toLocaleString('de-DE', { maximumFractionDigits: 2 });
                    // TERCEIRA PARTE
                    this.terceiraParte[0].value = this.round(
                        this.demonstracaoResultados.somaContaCredit79mes12 + this.demonstracaoResultados.somaContaCredit79mes13 - (this.demonstracaoResultados.somaContaDebit79mes12 + this.demonstracaoResultados.somaContaDebit79mes13),
                        2
                    ).toLocaleString('de-DE', { maximumFractionDigits: 2 });
                    this.terceiraParte[0].valueMes12 = this.round(this.demonstracaoResultados.somaContaCredit79mes12 - this.demonstracaoResultados.somaContaDebit79mes12, 2).toLocaleString('de-DE', { maximumFractionDigits: 2 });
                    this.terceiraParte[0].valueMes13 = this.round(this.demonstracaoResultados.somaContaCredit79mes13 - this.demonstracaoResultados.somaContaDebit79mes13, 2).toLocaleString('de-DE', { maximumFractionDigits: 2 });
                    this.terceiraParte[0].valueMes14 = this.round(this.demonstracaoResultados.somaContaCredit79mes14 - this.demonstracaoResultados.somaContaDebit79mes14, 2).toLocaleString('de-DE', { maximumFractionDigits: 2 });
                    this.terceiraParte[0].valueMes15 = this.round(this.demonstracaoResultados.somaContaCredit79mes20 - this.demonstracaoResultados.somaContaDebit79mes20, 2).toLocaleString('de-DE', { maximumFractionDigits: 2 });

                    this.terceiraParte[1].value = this.round(
                        this.demonstracaoResultados.somaContaCredit69mes12 + this.demonstracaoResultados.somaContaCredit69mes13 - (this.demonstracaoResultados.somaContaDebit69mes12 + this.demonstracaoResultados.somaContaDebit69mes13),
                        2
                    ).toLocaleString('de-DE', { maximumFractionDigits: 2 });
                    this.terceiraParte[1].valueMes12 = this.round(this.demonstracaoResultados.somaContaCredit69mes12 - this.demonstracaoResultados.somaContaDebit69mes12, 2).toLocaleString('de-DE', { maximumFractionDigits: 2 });
                    this.terceiraParte[1].valueMes13 = this.round(this.demonstracaoResultados.somaContaCredit69mes13 - this.demonstracaoResultados.somaContaDebit69mes13, 2).toLocaleString('de-DE', { maximumFractionDigits: 2 });
                    this.terceiraParte[1].valueMes14 = this.round(this.demonstracaoResultados.somaContaCredit69mes14 - this.demonstracaoResultados.somaContaDebit69mes14, 2).toLocaleString('de-DE', { maximumFractionDigits: 2 });
                    this.terceiraParte[1].valueMes15 = this.round(this.demonstracaoResultados.somaContaCredit69mes20 - this.demonstracaoResultados.somaContaDebit69mes20, 2).toLocaleString('de-DE', { maximumFractionDigits: 2 });
                    this.terceiraParte[2].value = this.round(this.totalAntesImpostos, 2).toLocaleString('de-DE', { maximumFractionDigits: 2 });
                    // QUARTA PARTE
                    this.quartaParte[0].value = this.round(this.demonstracaoResultados.somaContaCredit812mes20 - this.demonstracaoResultados.somaContaDebit812mes20, 2).toLocaleString('de-DE', { maximumFractionDigits: 2 });
                    this.quartaParte[0].valueMes12 = this.round(this.demonstracaoResultados.somaContaCredit812mes12 - this.demonstracaoResultados.somaContaDebit812mes12, 2).toLocaleString('de-DE', { maximumFractionDigits: 2 });
                    this.quartaParte[0].valueMes13 = this.round(this.demonstracaoResultados.somaContaCredit812mes13 - this.demonstracaoResultados.somaContaDebit812mes13, 2).toLocaleString('de-DE', { maximumFractionDigits: 2 });
                    this.quartaParte[0].valueMes14 = this.round(this.demonstracaoResultados.somaContaCredit812mes14 - this.demonstracaoResultados.somaContaDebit812mes14, 2).toLocaleString('de-DE', { maximumFractionDigits: 2 });
                    this.quartaParte[0].valueMes15 = this.round(this.demonstracaoResultados.somaContaCredit812mes20 - this.demonstracaoResultados.somaContaDebit812mes20, 2).toLocaleString('de-DE', { maximumFractionDigits: 2 });

                    this.quartaParte[1].value = this.round(this.resultadoLiquido, 2).toLocaleString('de-DE', { maximumFractionDigits: 2 });
                })
                .catch(err => {
                    console.log(err);
                    console.log('Cannot');
                });
        },
        getVendasServicosGrafico() {
            console.log(this.$route.query.saftID);
            this.saftID = this.$route.query.saftID;
            var saftID = this.saftID;
            console.log(saftID);
            var url = process.env.VUE_APP_URLBack + '/demonstracaoResultados/vendasServicos/' + saftID;
            console.log(url);
            //  commit('auth_request')
            axios({
                url: url,
                method: 'GET',
            })
                .then(data => {
                    // console.log("teste")
                    this.valorTotal71 = data.data.valorTotal71;
                    this.valorTotal72 = data.data.valorTotal72;
                    this.contasCredit71 = data.data.contasCredit71;
                    this.contasDebit71 = data.data.contasDebit71;
                    this.contasCredit72 = data.data.contasCredit72;
                    this.contasDebit72 = data.data.contasDebit72;
                    this.loaded = true;
                    var valorfinal71 = 0;
                    for (var i = 0; i < this.valorTotal71.length; i++) {
                        valorfinal71 += this.valorTotal71[i];
                    }
                    var valorfinal72 = 0;
                    for (var j = 0; j < this.valorTotal72.length; j++) {
                        valorfinal72 += this.valorTotal72[j];
                    }
                    this.valorfinal.push(valorfinal71);
                    this.valorfinal.push(valorfinal72);

                    this.fillData();
                })
                .catch(err => {
                    console.log(err);
                    console.log('Cannot');
                });
        },
    },
    mounted() {
        this.id_company = this.$route.query.id_company;
        this.saftID = this.$route.query.saftid;
        this.getDemonstracaoResultados(),
            this.callInfoCompany(),
            //this.getVendasServicosGrafico(),

            (this.loading2 = false);
    },
};
</script>
<style scoped lang="scss">
.vl {
    border-left: 2px solid lightskyblue;
}
::v-deep(.last-row) {
    background-color: rgba(0, 0, 0, 0.15) !important;
    font-weight: bold;
}
</style>