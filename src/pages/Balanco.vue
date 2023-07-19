<template>
    <div class="card">
         <div class="p-col-12">
                <BarraMenu :id_company=id_company></BarraMenu>
            </div>
        <div >
            <Toast />
                <div class="p-grid">
                <div class="p-col">
                    <DataTable
                        :value="activoNaoCorrente"
                        :loading="loading3"
                        scrollDirection="both"
                        v-model:expandedRows="expandedRows"
                        data-key="id"
                        @rowExpand="onRowExpandNCorrente"
                        @rowCollapse="onRowCollapse"
                        :row-class="rowClass"
                    >
                        <Column :expander="true" />
                        <Column
                            field="name"
                            header="Activo Não Corrente"
                            :style="{ width: '300px' }"
                        ></Column>
                        <Column field="value" header="Valor" :style="{ width: '300px' }"></Column>
                        <Column header="" :style="{ width: '200px' }">
                            <template #body="slotProps">
                                <div class="p-grid">
                                    <InputText
                                        v-if="hiddenInput == false && slotProps.data.id == hiddenID"
                                        type="text"
                                        class="p-column-filter"
                                        :style="{ width: '130px' }"
                                        v-model="valueChange"
                                        placeholder="Insira o valor"
                                    />&nbsp;
                                    <Button
                                        icon="pi pi-check"
                                        v-if="hiddenInput == false && slotProps.data.id == hiddenID"
                                        class="p-button-rounded p-button-secondary p-button-outlined"
                                        @click="confirm(slotProps.data, 'ativo')"
                                    />
                                    <Button
                                    
                                        icon="pi pi-times"
                                        v-if="(hiddenInput == false && slotProps.data.id == hiddenID) "
                                        class="p-button-rounded p-button-danger p-button-outlined"
                                        @click="changeHiddenInputTure()"
                                    />
                                </div>
                            </template>
                        </Column>
                        <template #expansion="slotProps">
                            <div class="orders-subtable">
                                <h5>Contas de: {{slotProps.data.name}}</h5>
                                <DataTable :value="accounts" responsiveLayout="scroll">
                                    <Column field="account" :header="'Account'">
                                        <template #body="slotProps">
                                            <b>Account:</b>
                                            {{slotProps.data.account_id}}
                                        </template>
                                    </Column>
                                    <Column field="account" :header="'Regra'">
                                        <template #body="slotProps">
                                            <b>Valor:</b>
                                            {{slotProps.data.value }}
                                        </template>
                                    </Column>
                                    <Column field="account" :header="'Regra'">
                                        <template #body="slotProps">
                                            <b>{{AdicionarValue(slotProps.data.adicionarValue)}}</b> ao total
                                        </template>
                                    </Column>
                                </DataTable>
                            </div>
                        </template>
                    </DataTable>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                    <DataTable
                        :value="activoCorrente"
                        :loading="loading3"
                        scrollDirection="both"
                        v-model:expandedRows="expandedRows"
                        data-key="id"
                        @rowExpand="onRowExpand"
                        @rowCollapse="onRowCollapse"
                        :row-class="rowClass"
                    >
                        <Column :expander="true" headerStyle="width: 3rem" />
                        <Column field="name" header="Activo Corrente" :style="{ width: '300px' }"></Column>
                        <Column field="value" header="Valor" :style="{ width: '300px' }"></Column>
                        <Column header="Editar Valor para passivo" :style="{ width: '200px' }">
                            <template #body="slotProps">
                                <div class="p-grid">
                                    <InputText
                                        v-if="hiddenInput == false && slotProps.data.id == hiddenID"
                                        type="text"
                                        class="p-column-filter"
                                        :style="{ width: '130px' }"
                                        v-model="valueChange"
                                        placeholder="Insira o valor"
                                    />&nbsp;
                                    <Button
                                        icon="pi pi-check"
                                        v-if="hiddenInput == false && slotProps.data.id == hiddenID"
                                        class="p-button-rounded p-button-secondary p-button-outlined"
                                        @click="confirm(slotProps.data, 'ativo')"
                                    />
                                    <Button
                                        icon="pi pi-times"
                                        v-if="hiddenInput == false && slotProps.data.id == hiddenID"
                                        class="p-button-rounded p-button-danger p-button-outlined"
                                        @click="changeHiddenInputTure()"
                                    />
                                </div>
                                <Button
                                    icon="pi pi-pencil"
                                    v-if="slotProps.data.valueOposto <= 0 && (hiddenInput == true || hiddenID != slotProps.data.id) && (slotProps.data.id == 'somaTotalClientes' || slotProps.data.id == 'somaEstadosOutros' || slotProps.data.id == 'somaOutrosCreditosFinanceiros')"
                                    class="p-button-rounded p-button-secondary p-button-outlined"
                                    @click="changeHiddenInput(slotProps.data.id)"
                                />
                                <Button
                                    icon="pi pi-pencil"
                                    v-if="slotProps.data.valueOposto > 0 && (hiddenInput == true || hiddenID != slotProps.data.id)  && (slotProps.data.id == 'somaTotalClientes' || slotProps.data.id == 'somaEstadosOutros' || slotProps.data.id == 'somaOutrosCreditosFinanceiros')"
                                    class="p-button-rounded p-button-warning p-button-outlined"
                                    @click="changeHiddenInput(slotProps.data.id)"
                                />
                            </template>
                        </Column>
                        <template #expansion="slotProps">
                            <div class="orders-subtable">
                                <h5>Contas de: {{slotProps.data.name}}</h5>
                                <DataTable :value="accounts" responsiveLayout="scroll">
                                    <Column field="account" :header="'Account'">
                                        <template #body="slotProps">
                                            <b>Account:</b>
                                            {{slotProps.data.account_id}}
                                        </template>
                                    </Column>
                                    <Column field="account" :header="'Regra'">
                                        <template #body="slotProps">
                                            <b>Valor:</b>
                                            {{slotProps.data.value }}
                                        </template>
                                    </Column>
                                     <Column field="account" :header="'Regra'">
                                        <template #body="slotProps">
                                            <b>{{AdicionarValue(slotProps.data.adicionarValue)}}</b> ao total
                                        </template>
                                    </Column>
                                </DataTable>
                            </div>
                        </template>
                    </DataTable>
                </div>
                
                <div class="p-col">
                    <DataTable
                        :value="capital_Proprio"
                        :loading="loading3"
                        scrollDirection="both"
                        v-model:expandedRows="expandedRows"
                        data-key="id"
                        @rowExpand="onRowExpandCP"
                        @rowCollapse="onRowCollapse"
                        :row-class="rowClass"
                    >
                        <Column :expander="true" headerStyle="width: 3rem" />
                        <Column field="name" header="Capital Próprio" :style="{ width: '300px' }"></Column>
                        <Column field="value" header="Valor" :style="{ width: '300px' }"></Column>
                        <Column :style="{ width: '200px' }"></Column>
                        <template #expansion="slotProps">
                            <div class="orders-subtable">
                                <h5>Contas de: {{slotProps.data.name}}</h5>
                                <DataTable :value="accounts" responsiveLayout="scroll">
                                    <Column field="account" :header="'Account'">
                                        <template #body="slotProps">
                                            <b>Account:</b>
                                            {{slotProps.data.account_id}}
                                        </template>
                                    </Column>
                                    <Column field="account" :header="'Regra'">
                                        <template #body="slotProps">
                                            <b>Valor:</b>
                                            {{slotProps.data.value }}
                                        </template>
                                    </Column>
                                     <Column field="account" :header="'Regra'">
                                        <template #body="slotProps">
                                            <b>{{AdicionarValue(slotProps.data.adicionarValue)}}</b> ao total
                                        </template>
                                    </Column>
                                </DataTable>
                            </div>
                        </template>
                    </DataTable>

                    <DataTable
                        :value="PassivoNaoCorrente"
                        :loading="loading3"
                        scrollDirection="both"
                        v-model:expandedRows="expandedRows"
                        data-key="id"
                        @rowExpand="onRowExpandPassivoCorrente"
                        @rowCollapse="onRowCollapse"
                        :row-class="rowClass"
                    >
                        <Column :expander="true" headerStyle="width: 3rem" />
                        <Column
                            field="name"
                            header="Passivo não Corrente"
                            :style="{ width: '300px' }"
                        ></Column>
                        <Column field="value" header="Valor" :style="{ width: '300px' }"></Column>
                        <Column header="" :style="{ width: '200px' }">
                            <template #body="slotProps">
                                <div class="p-grid">
                                    <InputText
                                        v-if="hiddenInput == false && slotProps.data.id == hiddenID"
                                        type="text"
                                        class="p-column-filter"
                                        :style="{ width: '130px' }"
                                        v-model="valueChange"
                                        placeholder="Insira o valor"
                                    />&nbsp;
                                    <Button
                                        icon="pi pi-check"
                                        v-if="hiddenInput == false && slotProps.data.id == hiddenID"
                                        class="p-button-rounded p-button-secondary p-button-outlined"
                                        @click="confirm(slotProps.data, 'passivo')"
                                    />
                                    <Button
                                        icon="pi pi-times"
                                        v-if="hiddenInput == false && slotProps.data.id == hiddenID"
                                        class="p-button-rounded p-button-danger p-button-outlined"
                                        @click="changeHiddenInputTure()"
                                    />
                                </div>
                            </template>
                        </Column>
                        <template #expansion="slotProps">
                            <div class="orders-subtable">
                                <h5>Contas de: {{slotProps.data.name}}</h5>
                                <DataTable :value="accounts" responsiveLayout="scroll">
                                    <Column field="account" :header="'Account'">
                                        <template #body="slotProps">
                                            <b>Account:</b>
                                            {{slotProps.data.account_id}}
                                        </template>
                                    </Column>
                                    <Column field="account" :header="'Regra'">
                                        <template #body="slotProps">
                                            <b>Valor:</b>
                                            {{slotProps.data.value }}
                                        </template>
                                    </Column>
                                     <Column field="account" :header="'Regra'">
                                        <template #body="slotProps">
                                            <b>{{AdicionarValue(slotProps.data.adicionarValue)}}</b> ao total
                                        </template>
                                    </Column>
                                </DataTable>
                            </div>
                        </template>
                    </DataTable>
                    <DataTable
                        :value="PassivoCorrente"
                        :loading="loading3"
                        scrollDirection="both"
                        v-model:expandedRows="expandedRows"
                        data-key="id"
                        @rowExpand="onRowExpandPassivoNCorrente"
                        @rowCollapse="onRowCollapse"
                        :row-class="rowClass"
                    >
                        <Column :expander="true" headerStyle="width: 3rem" />
                        <Column field="name" header="Passivo Corrente" :style="{ width: '300px' }"></Column>
                        <Column field="value" header="Valor" :style="{ width: '300px' }"></Column>
                        <Column header="Editar Valor para ativo" :style="{ width: '200px' }">
                            <template #body="slotProps">
                                <div class="p-grid">
                                    <InputText
                                        v-if="hiddenInput == false && slotProps.data.id == hiddenID"
                                        type="text"
                                        class="p-column-filter"
                                        :style="{ width: '130px' }"
                                        v-model="valueChange"
                                        placeholder="Insira o valor"
                                    />&nbsp;
                                    <Button
                                        icon="pi pi-check"
                                        v-if="hiddenInput == false && slotProps.data.id == hiddenID"
                                        class="p-button-rounded p-button-secondary p-button-outlined"
                                        @click="confirm(slotProps.data, 'passivo')"
                                    />
                                    <Button
                                        icon="pi pi-times"
                                        v-if="hiddenInput == false && slotProps.data.id == hiddenID"
                                        class="p-button-rounded p-button-danger p-button-outlined"
                                        @click="changeHiddenInputTure()"
                                    />
                                </div>
                                <Button
                                    icon="pi pi-pencil"
                                    v-if="slotProps.data.valueOposto <= 0 && (hiddenInput == true || hiddenID != slotProps.data.id) && (slotProps.data.id == 'somaTotalClientes' || slotProps.data.id == 'somaEstadosOutros' || slotProps.data.id == 'somaOutrosCreditosFinanceiros'|| slotProps.data.id == 'somaFornecedores'|| slotProps.data.id == 'somaEstadosOutrosPassivoCorrente'|| slotProps.data.id == 'somaOutrasDividas')"
                                    class="p-button-rounded p-button-secondary p-button-outlined"
                                    @click="changeHiddenInput(slotProps.data.id)"
                                />
                                <Button
                                    icon="pi pi-pencil"
                                    v-if="slotProps.data.valueOposto > 0 && (hiddenInput == true || hiddenID != slotProps.data.id)  && (slotProps.data.id == 'somaTotalClientes' || slotProps.data.id == 'somaEstadosOutros' || slotProps.data.id == 'somaOutrosCreditosFinanceiros'|| slotProps.data.id == 'somaFornecedores'|| slotProps.data.id == 'somaEstadosOutrosPassivoCorrente'|| slotProps.data.id == 'somaOutrasDividas')"
                                    class="p-button-rounded p-button-warning p-button-outlined"
                                    @click="changeHiddenInput(slotProps.data.id)"
                                />
                            </template>
                        </Column>
                        <template #expansion="slotProps">
                            <div class="orders-subtable">
                                <h5>Contas de: {{slotProps.data.name}}</h5>
                                <DataTable :value="accounts" responsiveLayout="scroll">
                                    <Column field="account" :header="'Account'">
                                        <template #body="slotProps">
                                            <b>Account:</b>
                                            {{slotProps.data.account_id}}
                                        </template>
                                    </Column>
                                    <Column field="account" :header="'Regra'">
                                        <template #body="slotProps">
                                            <b>Valor:</b>
                                            {{slotProps.data.value }}
                                        </template>
                                    </Column>
                                     <Column field="account" :header="'Regra'">
                                        <template #body="slotProps">
                                            <b>{{AdicionarValue(slotProps.data.adicionarValue)}}</b> ao total
                                        </template>
                                    </Column>
                                </DataTable>
                            </div>
                        </template>
                    </DataTable>
                </div>
               
            </div>
            <div class="p-grid">
                 <div class="p-col">
                    <span class="align-text-bottom">
                        <h6>
                            <b>Total Activo :</b>
                            {{ round(activo.totalAtivoNaoCorrente + activo.totalAtivoCorrente , 2).toLocaleString('de-DE',
                            { maximumFractionDigits: 2 })
                            }}
                        </h6>
                    </span>
                </div>
                 <Divider layout="vertical" />
                <div class="p-col">
                    <h6>
                        <b>Total Passivo + Capital Próprio:</b>
                        {{ round(passivo.totalPassivoCorrente +
                        passivo.totalPassivoNaoCorrente, 2).toLocaleString('de-DE', { maximumFractionDigits: 2 })
                        }}
                    </h6>
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
            activoNaoCorrente: [
                {
                    name: 'Activo Fixo Tangivel',
                    value: 0,
                    valueOposto: 0,
                    tipo: 'ativo',
                    id: 'somaActivoFixoTantigiveis',
                    teste: true,
                },
                {
                    name: 'Activo Fixo Intangivel',
                    value: 0,
                    valueOposto: 0,
                    tipo: 'ativo',
                    id: 'somaActivoFixoIntantigiveis',
                    teste: true,
                },
                {
                    name: 'Participações Financeiras',
                    value: 0,
                    valueOposto: 0,
                    tipo: 'ativo',
                    id: 'somaParticipacoesFinanceiras',
                    teste: true,
                },
                {
                    name: 'Outros Investimentos Financeiros\t',
                    value: 0,
                    valueOposto: 0,
                    tipo: 'ativo',
                    id: 'somaOutrosInvestimentosFinanceiros',
                    teste: true,
                },
                {
                    name: '',
                    value: 'Total Activo Não Corrente: ',
                    teste: false,
                },
            ],
            capital_Proprio: [
                {
                    name: 'Capital Subscrito\t',
                    value: 0,
                    tipo: 'capitalProprio',
                    id: 'somaCapitalSubscrito',
                    teste: true,
                },
                {
                    name: 'Reservas Legais\t',
                    value: 0,
                    valueOposto: 0,
                    tipo: 'capitalProprio',
                    id: 'somaReservasLegais',
                    teste: true,
                },
                {
                    name: 'Outras Reservas\t',
                    value: 0,
                    valueOposto: 0,
                    tipo: 'capitalProprio',
                    id: 'somaOutrasReservas',
                    teste: true,
                },
                {
                    name: 'Resultados Transitados\t',
                    value: 0,
                    valueOposto: 0,
                    tipo: 'capitalProprio',
                    id: 'somaResultadosTransitados',
                    teste: true,
                },
                {
                    name: 'Ajustamentos / outras variações no capital próprio\t',
                    value: 0,
                    valueOposto: 0,
                    tipo: 'capitalProprio',
                    id: 'somaAjustamentoCP',
                    teste: true,
                },
                {
                    name: 'Soma resultados Liquidos do Período',
                    value: 0,
                    valueOposto: 0,
                    tipo: 'capitalProprio',
                    id: 'somaResultadoLiquido',
                    teste: true,
                },
                {
                    name: '',
                    value: 'Total Capital Próprio:',
                    teste: false,
                },
            ],
            PassivoNaoCorrente: [
                {
                    name: 'Provisões',
                    value: 0,
                    valueOposto: 0,
                    tipo: 'passivo',
                    id: 'somaProvisoes',
                    teste: true,
                },
                {
                    name: 'Passivos por Impostos Diferidos',
                    value: 0,
                    valueOposto: 0,
                    tipo: 'passivo',
                    id: 'somaPassivosImpDiferidos',
                    teste: true,
                },
                {
                    name: 'Responsabilidade por Beneficios Pós-emprego',
                    value: 0,
                    valueOposto: 0,
                    tipo: 'passivo',
                    id: 'somaResponsabilidade',
                    teste: true,
                },
                {
                    name: '',
                    value: 'Total Passivo Não Corrente: 0',
                    teste: false,
                },
            ],
            PassivoCorrente: [
                {
                    name: 'Fornecedores',
                    value: 0,
                    valueOposto: 0,
                    tipo: 'passivo',
                    id: 'somaFornecedores',
                    teste: true,
                },
                {
                    name: 'Adiamento de Clientes',
                    value: 0,
                    valueOposto: 0,
                    tipo: 'passivo',
                    id: 'somaAdiamentoClientes',
                    teste: true,
                },
                {
                    name: 'Estado e Outros Publicos\t',
                    value: 0,
                    valueOposto: 0,
                    tipo: 'passivo',
                    id: 'somaEstadosOutrosPassivoCorrente',
                    teste: true,
                },
                {
                    name: 'Financimento Obtidos',
                    value: 0,
                    valueOposto: 0,
                    tipo: 'passivo',
                    id: 'somaFinanciamentoObtidosCorrente',
                    teste: true,
                },
                {
                    name: 'Outras Dividas a Pagar\t',
                    value: 0,
                    valueOposto: 0,
                    tipo: 'passivo',
                    id: 'somaOutrasDividas',
                    teste: true,
                },
                {
                    name: 'Diferimentos Passivo\t',
                    value: 0,
                    valueOposto: 0,
                    tipo: 'passivo',
                    id: 'somaDiferimentosPassivoCorrente',
                    teste: true,
                },
                {
                    name: '',
                    value: 'Total Passivo Corrente: ',
                    teste: false,
                },
            ],
            activoCorrente: [
                {
                    name: 'Inventário',
                    value: 0,
                    valueOposto: 0,
                    tipo: 'ativo',
                    id: 'somaFinalInventario',
                    teste: true,
                },
                {
                    name: 'Clientes',
                    value: 0,
                    valueOposto: 0,
                    tipo: 'ativo',
                    id: 'somaTotalClientes',
                    teste: true,
                },
                {
                    name: 'Estados e outros',
                    value: 0,
                    valueOposto: 0,
                    tipo: 'ativo',
                    id: 'somaEstadosOutros',
                    teste: true,
                },
                {
                    name: 'Outros Créditos Financeiros\t',
                    value: 0,
                    valueOposto: 0,
                    tipo: 'ativo',
                    id: 'somaOutrosCreditosFinanceiros',
                    teste: true,
                },
                {
                    name: 'Diferimentos',
                    value: 0,
                    valueOposto: 0,
                    tipo: 'ativo',
                    id: 'somaDiferimentos',
                    teste: true,
                },
                {
                    name: 'Ativos não correntes detidos para venda\t',
                    value: 0,
                    valueOposto: 0,
                    tipo: 'ativo',
                    id: 'somaAtivoNCorrentesVenda',
                    teste: true,
                },
                {
                    name: 'Caixa depósitos bancários',
                    value: 0,
                    valueOposto: 0,
                    tipo: 'ativo',
                    id: 'somaCaixaDepositosBancarios',
                    teste: true,
                },
                {
                    name: 'Activos financeiros\t',
                    value: 0,
                    valueOposto: 0,
                    tipo: 'ativo',
                    id: 'somaActivosFinanceiros',
                    teste: true,
                },
                {
                    name: '',
                    value: 0,
                    id: '',
                    teste: false,
                },
            ],
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
        };
    },
    mounted() {
        this.id_company = this.$route.query.id_company;
        this.saftID = this.$route.query.saftid;
        this.token = JSON.parse(localStorage.getItem('token'));
        this.getBalanco();
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
        changeHiddenInput(id) {
            this.valor = "";
            this.hiddenInput = false;
            this.hiddenID = id;
        },
        changeHiddenInputTure() {
            this.hiddenInput = true;
            this.hiddenID = '';
        },
        AdicionarValue(value) {
            if (value == true) {
                return 'Somar';
            } else {
                return 'Subtrair';
            }
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
        onRowExpandCP(event) {
            this.expandedRows = null;
            this.expanexpandedRowsCPdedRows = null;
            this.expandedRows = this.capital_Proprio.filter(p => p.id == event.data.id);
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
        onRowExpandPassivoCorrente(event) {
            this.expandedRows = null;
            this.expandedRowsPassivoNCorrente = null;
            this.expandedRows = this.PassivoNaoCorrente.filter(p => p.id == event.data.id);
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
        onRowExpandPassivoNCorrente(event) {
            this.expandedRows = null;
            this.expandedRowsPassivoCorrente = null;
            this.expandedRows = this.PassivoCorrente.filter(p => p.id == event.data.id);
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
        getBalanco() {
            var saftID = this.saftID;
            var url = process.env.VUE_APP_URLBack + '/balanco/checkBalance/' + saftID;
            axios({
                url: url,
                method: 'POST',
            })
                .then(data => {
                    this.passivo = data.data.passivo;
                    this.activo = data.data.activo;
                    this.capitalProprio = data.data.capitalProprio;
                    // ATIVO CORRENTE
                    this.activoCorrente[0].value = this.round(this.activo.somaFinalInventario,2)

                    this.activoCorrente[1].value = this.round( this.activo.somaTotalClientes[0].totalAtivo, 2);
                    this.activoCorrente[1].valueOposto =  this.round(this.activo.somaTotalClientes[0].totalPassivo, 2);

                    this.activoCorrente[2].value =  this.round(this.activo.somaEstadosOutros[0].totalAtivo, 2);
                    this.activoCorrente[2].valueOposto =  this.round(this.activo.somaEstadosOutros[0].totalPassivo, 2);

                    this.activoCorrente[3].value =  this.round(this.activo.somaOutrosCreditosFinanceiros[0].totalAtivo, 2);
                    this.activoCorrente[3].valueOposto =  this.round(this.activo.somaOutrosCreditosFinanceiros[0].totalPassivo, 2);

                    this.activoCorrente[4].value = this.round(this.activo.somaDiferimentos[0].totalAtivo, 2);

                    this.activoCorrente[5].value =  this.round(this.activo.somaAtivoNCorrentesVenda[0].totalAtivo, 2);

                    this.activoCorrente[6].value = this.round(this.activo.somaCaixaDepositosBancarios[0].totalAtivo, 2);

                    this.activoCorrente[7].value =  this.round(this.activo.somaActivosFinanceiros[0].totalAtivo, 2);

                    this.activoCorrente[8].value = 'Total Activo Corrente: ' + this.round(this.activo.totalAtivoCorrente, 2);
                    // ATIVO NAO CORRENTE
                    this.activoNaoCorrente[0].value = this.round( this.activo.somaActivoFixoTantigiveis[0].totalAtivo, 2);

                    this.activoNaoCorrente[1].value =  this.round(this.activo.somaActivoFixoIntantigiveis[0].totalAtivo, 2);

                    this.activoNaoCorrente[2].value =  this.round(this.activo.somaParticipacoesFinanceiras[0].totalAtivo, 2);

                    this.activoNaoCorrente[3].value =  this.round(this.activo.somaOutrosInvestimentosFinanceiros[0].totalAtivo, 2);

                    this.activoNaoCorrente[4].value = 'Total Activo Não Corrente: ' + this.round( this.activo.totalAtivoNaoCorrente, 2);
                    // CAPITAL PROPRIO
                    this.capital_Proprio[0].value =  this.round(this.capitalProprio.somaCapitalSubscrito[0].total, 2);
                    this.capital_Proprio[1].value =  this.round(this.capitalProprio.somaReservasLegais[0].total, 2);
                    this.capital_Proprio[2].value = this.round( this.capitalProprio.somaOutrasReservas[0].total, 2);
                    this.capital_Proprio[3].value =  this.round(this.capitalProprio.somaResultadosTransitados[0].total, 2);
                    this.capital_Proprio[4].value = this.round( this.capitalProprio.somaAjustamentoCP[0].total, 2);
                    this.capital_Proprio[5].value =  this.round(this.capitalProprio.somaResultadoLiquido[0].total, 2);
                    this.capital_Proprio[6].value = 'Total Capital Próprio: ' + this.round( this.capitalProprio.totalCapitalProprio, 2);
                    // PASSIVO CORRENTE
                    this.PassivoCorrente[0].value =  this.round(this.passivo.somaFornecedores[0].totalPassivo, 2);
                    this.PassivoCorrente[0].valueOposto =  this.round(this.passivo.somaFornecedores[0].totalAtivo, 2);
                    this.PassivoCorrente[1].value =  this.round(this.passivo.somaAdiamentoClientes[0].totalPassivo, 2);
                    this.PassivoCorrente[2].value =  this.round(this.passivo.somaEstadosOutrosPassivoCorrente[0].totalPassivo, 2);
                    this.PassivoCorrente[2].valueOposto =  this.round(this.passivo.somaEstadosOutrosPassivoCorrente[0].totalAtivo, 2);
                    this.PassivoCorrente[3].value = this.round( this.passivo.somaFinanciamentoObtidosCorrente[0].totalPassivo, 2);
                    this.PassivoCorrente[4].value =  this.round(this.passivo.totalOutrasDividas[0].totalPassivo, 2);
                    this.PassivoCorrente[4].valueOposto =  this.round(this.passivo.totalOutrasDividas[0].totalAtivo, 2);
                    this.PassivoCorrente[5].value =  this.round(this.passivo.somaDiferimentosPassivoCorrente[0].totalPassivo, 2);
                    this.PassivoCorrente[6].value = 'Total Passivo Corrente: ' +  this.round(this.passivo.totalPassivoCorrente, 2);
                    // PASSIVO NAO CORRENTE
                    this.PassivoNaoCorrente[0].value =  this.round(this.passivo.somaProvisoes[0].totalPassivo, 2);
                    this.PassivoNaoCorrente[1].value =  this.round(this.passivo.somaPassivosImpDiferidos[0].totalPassivo, 2);
                    this.PassivoNaoCorrente[2].value =  this.round(this.passivo.somaResponsabilidade[0].totalPassivo, 2);
                    this.PassivoNaoCorrente[3].value = 'Total Passivo Não Corrente: ' +  this.round(this.passivo.totalPassivoNaoCorrente, 2);
                    //ATIVO NAO CORRENTE
                    if (this.activo.somaTotalClientes[0].totalPassivo > 0) {
                        var addArray = {
                            name: 'Clientes (Passivo)',
                            value: this.activo.somaTotalClientes[0].totalPassivo,
                            valueOposto: 0,
                            tipo: 'ativo',
                            id: 'somaTotalClientes2',
                            teste: true,
                        };
                        this.PassivoCorrente.splice(this.PassivoCorrente.length - 1, 0, addArray);
                    }
                    if (this.activo.somaEstadosOutros[0].totalPassivo > 0) {
                        var addArray = {
                            name: 'Estados e outros (Passivo)',
                            value: this.activo.somaEstadosOutros[0].totalPassivo,
                            valueOposto: 0,
                            tipo: 'ativo',
                            id: 'somaEstadosOutros2',
                            teste: true,
                        };
                        this.PassivoCorrente.splice(this.PassivoCorrente.length - 1, 0, addArray);
                    }
                    if (this.activo.somaOutrosCreditosFinanceiros[0].totalPassivo > 0) {
                        var addArray = {
                            name: 'Outros Créditos Financeiros (Passivo)',
                            value: this.activo.somaOutrosCreditosFinanceiros[0].totalPassivo,
                            valueOposto: 0,
                            tipo: 'ativo',
                            id: 'somaOutrosCreditosFinanceiros2',
                            teste: true,
                        };
                        this.PassivoCorrente.splice(this.PassivoCorrente.length - 1, 0, addArray);
                    }
                   
                    //PASSIVO CORRENTE
                    if (this.passivo.somaFornecedores[0].totalAtivo > 0) {
                        var addArray = {
                            name: 'Fornecedores (Passivo)',
                            value: this.passivo.somaFornecedores[0].totalAtivo,
                            valueOposto: 0,
                            tipo: 'passivo',
                            id: 'somaFornecedores2',
                            teste: true,
                        };
                        this.activoCorrente.splice(this.activoCorrente.length - 1, 0, addArray);
                    }
                    if (this.passivo.somaEstadosOutrosPassivoCorrente[0].totalAtivo > 0) {
                        var addArray = {
                            name: 'Estado e Outros Publicos (Passivo)',
                            value: this.passivo.somaEstadosOutrosPassivoCorrente[0].totalAtivo,
                            valueOposto: 0,
                            tipo: 'passivo',
                            id: 'somaEstadosOutrosPassivoCorrente2',
                            teste: true,
                        };
                        this.activoCorrente.splice(this.activoCorrente.length - 1, 0, addArray);
                    }
                    if (this.passivo.totalOutrasDividas[0].totalAtivo > 0) {
                        var addArray = {
                            name: 'Outras Dividas a Pagar (Passivo)',
                            value: this.passivo.totalOutrasDividas[0].totalAtivo,
                            valueOposto: 0,
                            tipo: 'passivo',
                            id: 'totalOutrasDividas2',
                            teste: true,
                        };
                        this.activoCorrente.splice(this.activoCorrente.length - 1, 0, addArray);
                    }                    
                })
                .catch(err => {
                    console.log(err);
                    console.log('Cannot');
                });
        },
        confirm(data, str) {
            console.log(data, this.valueChange, str);
            var id = data.id;
            if (id.slice(-1) == '2') {
                id = id.slice(0, -1);
            }
            console.log(id);
            axios({
                url: process.env.VUE_APP_URLBack + '/balanco/EditBalancoAtivoParaPassivo',
                data: {
                    saftc_id: this.saftID,
                    tipoBalanco: str,
                    tipo: id,
                    valor: this.valueChange,
                },
                method: 'POST',
            }).then(data => {
                console.log(data.data.accounts);
                if( data.data.success == true){
                    this.$toast.add({ severity: 'info', summary: 'Sucesso',life: 3000 });
                    window.location = window.location.protocol+ '/balanco?id_company='+ this.id_company +'&saftid='+this.saftID

                }else{
                    this.$toast.add({ severity: 'error', summary: 'Erro', detail: data.data.msg, life: 3000 });

                }
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