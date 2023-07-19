<template>
    <toast />

    <div class="p-col-3">
        <div class="overview-box card">
            <div class="overview-box-value">{{ dadosInfo.valorAno2 }}

                <Button style="float: right;" icon="pi pi-ellipsis-v" class="p-button-rounded p-button-text p-mr-2 p-mb-2"
                    @click="toggle" />
                <Menu id="config_menu" ref="menu" :model="buttonItems" :popup="true" />
            </div>
            <div class="overview-box-title"> {{ designacao }}
            </div>
            <img src="assets/layout/images/dashboard/graph-tasks.svg" alt="roma" />

            <div class="overview-box-status">
                <div v-if="positivoNegativo === false">
                    +{{ dadosInfo.percentagem }} % <i class="pi pi-arrow-circle-up"></i>
                </div>
                <div v-if="positivoNegativo === true" style="color:red">
                    {{ dadosInfo.percentagem }} % <i class="pi pi-arrow-circle-down"></i>
                </div>
            </div>
        </div>
    </div>

    <!-- Editar Widget -->
    <Dialog header="Editar Widget" v-model:visible="displayEditWidget" :breakpoints="{ '960px': '75vw' }"
        :style="{ width: '40vw' }" :modal="true">
        <div class="p-grid p-fluid">

            <div class="p-col-12 p-md-12">
                <InputText type="text" placeholder="Designação" v-model="designacao"></InputText>
            </div>

            <!-- Tipo Dados a Ver  -->
            <div v-if="verificaTiposDadoInfo === false" class="p-col-12 p-md-12">
                <Dropdown v-model="selecionarTipoDadoInfo" :options="selecionarTipoDadosInfo" optionLabel="name"
                    placeholder="Selecionar Dados a Ver" />
            </div>
            <div v-if="verificaTiposDadoInfo === true" class="p-col-12 p-md-12">
                <Dropdown v-model="selecionarTipoDadoInfo" :required="true" :options="selecionarTipoDadosInfo"
                    optionLabel="name" placeholder="Selecionar Dados a Ver" class="p-invalid" />
            </div>



            <!-- Ver Anos para comparacao 1 -->
            <div v-if="verificaSelecionarAnoInfo1 === false" class="p-col-12 p-md-12">
                <h6>Selecionar Ano 1:</h6>
                <Tree :value="selecionarAnosInfo1" selectionMode="single" v-model:selectionKeys="selecionarAnoInfo1"
                    :required="true" />
            </div>
            <div v-if="verificaSelecionarAnoInfo1 === true" class="p-col-12 p-md-12">
                <h6 style="color: red">Por favor selecione uma opção para Ano 1: </h6>
                <Tree class="p-invalid" :value="selecionarAnosInfo1" selectionMode="single"
                    v-model:selectionKeys="selecionarAnoInfo1" :required="true" />
            </div>


            <!-- Ver Anos para comparacao 2 -->
            <div v-if="verificaSelecionarAnoInfo2 === false" class="p-col-12 p-md-12">
                <h6>Selecionar Ano 2:</h6>
                <Tree :value="selecionarAnosInfo2" selectionMode="single" v-model:selectionKeys="selecionarAnoInfo2"
                    :required="true" />
            </div>
            <div v-if="verificaSelecionarAnoInfo2 === true" class="p-col-12 p-md-12">
                <h6 style="color: red">Por favor selecione uma opção para Ano 2: </h6>
                <Tree class="p-invalid" :value="selecionarAnosInfo2" selectionMode="single"
                    v-model:selectionKeys="selecionarAnoInfo2" :required="true" />
            </div>



        </div>
        <template #footer>
            <Button label="Submeter" @click="submitEditWidgetData()" icon="pi pi-check" class="p-button-success" />
            <Button label="Limpar Seleção" @click="clearDataDialogWidget()" icon="pi pi-trash" class="p-button-secondary" />
        </template>
    </Dialog>


    <!-- Remover Widget -->
    <Dialog v-model:visible="deleteProductDialog" :style="{ width: '500px' }" header="Confirmação" :modal="true">
        <div class="confirmation-content">
            <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
            <span>Tem a certeza que deseja eliminar o Widget?</span>
        </div>
        <template #footer>
            <Button label="Não" icon="pi pi-times" class="p-button-text" @click="deleteProductDialog = false" />
            <Button label="Sim" icon="pi pi-check" class="p-button-text" @click="deleteComponentLayout(this.id_widget);" />
        </template>
    </Dialog>
</template>

<script>


import axios from "axios";


export default {
    props: {
        dadosInfo: Object
    },
    beforeMount() {
        this.populaWidget();
        this.token = JSON.parse(localStorage.getItem('token'));
        this.username = JSON.parse(localStorage.getItem('username'));
        this.id_company = this.dadosInfo.id_company;
        this.getCompanyData();
    },
    data() {
        return {
            buttonItems: [
                {
                    label: 'Update',
                    icon: 'pi pi-refresh',
                    command: () => {

                        this.selecionarAnoInfo1 = { name: this.dadosInfo.ano1, code: this.dadosInfo.ano1 }
                        this.selecionarAnoInfo2 = { name: this.dadosInfo.ano2, code: this.dadosInfo.ano2 }
                        // console.log(this.selecionarAnoInfo1)
                        // console.log(this.selecionarAnoInfo2)

                        // var tipoDados = this.dadosInfo.tipoDados[0].toUpperCase() + this.dadosInfo.tipoDados.substring(1)
                        // this.selecionarTipoDadoInfo = { name: tipoDados, code: tipoDados }
                        if (this.dadosInfo.tipoDados === "totalAtivoCorrente") {
                            this.selecionarTipoDadoInfo = { 'name': "Ativo Corrente", 'code': "totalAtivoCorrente" }

                        } else if (this.dadosInfo.tipoDados === "totalPassivoCorrente") {
                            this.selecionarTipoDadoInfo = { 'name': "Passivo Corrente", 'code': "totalPassivoCorrente" }

                        } else if (this.dadosInfo.tipoDados === "somaTotalClientes") {
                            this.selecionarTipoDadoInfo = { 'name': "Clientes", 'code': "somaTotalClientes" }

                        } else if (this.dadosInfo.tipoDados === "somaFornecedores") {
                            this.selecionarTipoDadoInfo = { 'name': "Fornecedores", 'code': "somaFornecedores" }

                        } else {
                            this.selecionarTipoDadoInfo = { 'name': this.dadosInfo.tipoDados.replace(/[_]/g, " "), 'code': this.dadosInfo.tipoDados }
                        }



                        var count = 0;
                        for (let ia = 0; ia < this.selecionarAnosInfo1.length; ia++) {
                            var key = this.selecionarAnosInfo1[ia]["key"]
                            var children = this.selecionarAnosInfo1[ia]["children"]
                            for (let ib = 0; ib < children.length; ib++) {
                                if (children[ib]["data"] === this.dadosInfo.ano1) {
                                    this.selecionarAnoInfo1[this.selecionarAnosInfo1[key]["children"][ib].key] = true;
                                    count += 1;
                                }
                                if (count === 2) {
                                    this.displayEditWidget = true;
                                }
                            }
                        }

                        for (let ia = 0; ia < this.selecionarAnosInfo2.length; ia++) {
                            var key = this.selecionarAnosInfo2[ia]["key"]
                            var children = this.selecionarAnosInfo2[ia]["children"]
                            for (let ib = 0; ib < children.length; ib++) {
                                if (children[ib]["data"] === this.dadosInfo.ano2) {
                                    this.selecionarAnoInfo2[this.selecionarAnosInfo2[key]["children"][ib].key] = true;
                                    count += 1;
                                }
                                if (count === 2) {
                                    this.displayEditWidget = true;
                                }
                            }
                        }
                    }
                },
                {
                    label: 'Delete',
                    icon: 'pi pi-times',
                    command: () => {
                        this.deleteProductDialog = true;
                    }
                }
            ],
            positivoNegativo: false,
            deleteProductDialog: false,
            id_widget: "",
            designacao: "",
            displayEditWidget: false,
            verificaTiposDadoInfo: false,
            selecionarTipoDadosInfo: [],
            selecionarTipoDadoInfo: null,
            verificaSelecionarAnoInfo1: false,
            verificaSelecionarAnoInfo2: false,
            selecionarAnosInfo1: [],
            selecionarAnoInfo1: null,
            selecionarAnosInfo2: [],
            selecionarAnoInfo2: null,
            username: "",
            verificaDesignacao: ""
        }
    },
    methods: {
        populaWidget() {
            this.id_widget = this.dadosInfo._id;

            let unix_timestamp = this.dadosInfo.ano1.split("_")[2]
            var a = new Date(parseInt(unix_timestamp));
            // var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            // var month = months[a.getMonth()];
            var month = a.getMonth() + 1;
            var year = a.getFullYear();
            var date = a.getDate();
            var time = year + '-' + month + '-' + date


            let unix_timestamp1 = this.dadosInfo.ano2.split("_")[2]
            var a1 = new Date(parseInt(unix_timestamp1));
            // var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            // var month = months[a.getMonth()];
            var month1 = a1.getMonth() + 1;
            var year1 = a1.getFullYear();
            var date1 = a1.getDate();
            var time1 = year1 + '-' + month1 + '-' + date1


            if (this.dadosInfo.percentagem < 0) {
                this.positivoNegativo = true;
            }
            if (this.dadosInfo.designacao === "default") {
                if (this.dadosInfo.tipoDados === "totalAtivoCorrente") {
                    this.designacao = "Ativo Corrente" + " " + time + "/" + time1
                    this.verificaDesignacao = "Ativo Corrente" + " " + time + "/" + time1
                } else if (this.dadosInfo.tipoDados === "totalPassivoCorrente") {
                    this.designacao = "Passivo Corrente" + " " + time + "/" + time1
                    this.verificaDesignacao = "Passivo Corrente" + " " + time + "/" + time1

                } else if (this.dadosInfo.tipoDados === "somaTotalClientes") {
                    this.designacao = "Clientes" + " " + time + "/" + time1
                    this.verificaDesignacao = "Clientes" + " " + time + "/" + time1

                } else if (this.dadosInfo.tipoDados === "somaFornecedores") {
                    this.designacao = "Fornecedores" + " " + time + "/" + time1
                    this.verificaDesignacao = "Fornecedores" + " " + time + "/" + time1
                } else {
                    this.designacao = this.dadosInfo.tipoDados.replace(/[_]/g, " ") + " " + time + "/" + time1
                    this.verificaDesignacao = this.dadosInfo.tipoDados.replace(/[_]/g, " ") + " " + time + "/" + time1
                }

            } else {
                this.designacao = this.dadosInfo.designacao
            }


        },
        deleteComponentLayout(id_widget) {
            axios({
                method: 'delete',
                url: process.env.VUE_APP_URLBack + "/layout/layout",
                headers: { token: this.token, id_layout: id_widget }
            })
                .then(response => {
                    if (response.status !== 200) {
                        this.error = response;
                        return;
                    } else {
                        this.$router.go()
                    }
                })
                .catch(error => {
                    // Request failed.
                    console.log("error", error.response);
                });
        },

        toggle() {
            this.$refs.menu.toggle(event);
        },
        //Limpar Formulario de edicao widget
        clearDataDialogWidget() {
            this.selecionarTipoDadoInfo = null;
            this.selecionarAnoInfo1 = null;
            this.selecionarAnoInfo2 = null;
        },
        //Submit edit widget
        submitEditWidgetData() {

            //verifica se esta ou nao selecionado, e tambem se seleciona grupo ANO1
            if (this.selecionarAnoInfo1 === null || this.selecionarAnoInfo1 === undefined || this.selecionarAnoInfo1 === "") {
                this.verificaSelecionarAnoInfo1 = true
                this.$toast.add({ severity: 'error', summary: 'É necessário selecionar um ou mais ficheiros', life: 3000 });

            } else if (Object.keys(this.selecionarAnoInfo1)[0].split("-")[1] === undefined && this.selecionarAnoInfo1["name"] === undefined) {
                this.verificaSelecionarAnoInfo1 = true
                this.$toast.add({ severity: 'error', summary: 'Apenas pode selecionar um ficheiro e não um grupo.', life: 3000 });

            } else if (this.selecionarAnoInfo1["name"] !== undefined) {
                this.selecionarAnoInfo1 = [Object.keys(this.selecionarAnoInfo1)[2]]
                this.verificaSelecionarAnoInfo1 = false
            } else {
                this.selecionarAnoInfo1 = Object.keys(this.selecionarAnoInfo1)
                this.verificaSelecionarAnoInfo1 = false
            }


            //verifica se esta ou nao selecionado, e tambem se seleciona grupo ANO2
            if (this.selecionarAnoInfo2 === null || this.selecionarAnoInfo2 === undefined || this.selecionarAnoInfo2 === "") {
                this.verificaSelecionarAnoInfo2 = true
                this.$toast.add({ severity: 'error', summary: 'É necessário selecionar um ou mais ficheiros', life: 3000 });

            } else if (Object.keys(this.selecionarAnoInfo2)[0].split("-")[1] === undefined && this.selecionarAnoInfo2["name"] === undefined) {
                this.verificaSelecionarAnoInfo2 = true
                this.$toast.add({ severity: 'error', summary: 'Apenas pode selecionar um ficheiro e não um grupo.', life: 3000 });

            } else if (this.selecionarAnoInfo2["name"] !== undefined) {
                this.selecionarAnoInfo2 = [Object.keys(this.selecionarAnoInfo2)[2]]
                this.verificaSelecionarAnoInfo2 = false
            } else {
                this.selecionarAnoInfo2 = Object.keys(this.selecionarAnoInfo2)
                this.verificaSelecionarAnoInfo2 = false
            }


            if (this.selecionarTipoDadoInfo === "" || this.selecionarTipoDadoInfo === undefined || this.selecionarTipoDadoInfo === null) {
                this.verificaTiposDadoInfo = true
            } else {
                this.verificaTiposDadoInfo = false
            }


            if (this.verificaSelecionarAnoInfo1 === false && this.verificaSelecionarAnoInfo2 === false && this.verificaTiposDadoInfo === false) {

                var designicao1;
                if (this.designacao === "" || this.designacao === null || this.designacao === undefined || this.designacao === this.verificaDesignacao) {
                    designicao1 = "default";
                } else {
                    designicao1 = this.designacao;
                }

                var json = {
                    _id: this.dadosInfo._id,
                    id_company: this.id_company,
                    ano1: this.selecionarAnoInfo1,
                    ano2: this.selecionarAnoInfo2,
                    tipoDados: this.selecionarTipoDadoInfo.code,
                    designacao: designicao1,
                    username: this.username
                }
                console.log(json);

                axios({
                    method: 'put',
                    url: process.env.VUE_APP_URLBack + "/layout/layoutWidget",
                    headers: { token: this.token },
                    data: json
                })
                    .then(response => {
                        // console.log("Server Response:", response);
                        if (response.status !== 200) {
                            this.error = response;
                            return;
                        } else {
                            this.clearDataDialogWidget();
                            this.displayEditWidget = false;
                            this.$router.go()
                        }
                    })
                    .catch(error => {
                        // Request failed.
                        console.log("error", error.response);
                    });
            }
        },
        //Obter dados gerais da empresa
        getCompanyData() {
            axios({
                method: 'get',
                url: process.env.VUE_APP_URLBack + "/balancoT",
                headers: { token: this.token, id_company: this.id_company, username: this.username },
            })
                .then(response => {
                    if (response.status !== 200) {
                        this.error = response;
                        return;
                    } else {
                        // console.log(response.data)
                        this.selecionarAnosInfo1 = response.data.arrayPrincipal
                        this.selecionarAnosInfo2 = response.data.arrayPrincipal

                        this.selecionarTipoDadosInfo = response.data.arrayData
                    }
                })
                .catch(error => {
                    // Request failed.
                    console.log("error", error.response);
                });
        },
        onChange2(event) {
            var anoSelecionado = parseInt(event.value.code, 10)
            var filtered = this.selecionarAnosInfo1.filter(function (value, index, arr) {
                return parseInt(value.code, 10) > anoSelecionado;
            });
            this.selecionarAnosInfo2 = filtered;
            this.verficarSelecaoAno1 = true;
        },

    }
}
</script>
