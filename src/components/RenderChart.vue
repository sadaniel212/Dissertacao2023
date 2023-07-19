<template>
    <toast />
    <div class="p-col-12 p-lg-6">
        <div class="card card-w-title">
            <h5 v-if="viewGraf === 'pieChart' || viewGraf === 'doughnutChart' || viewGraf === 'polarAreaChart'"> Date:
                {{ selecionarAno[0].name }} -> {{
                    designacaoGrafico
                }}
                <Button style="float: right;" icon="pi pi-ellipsis-v" class="p-button-rounded p-button-text p-mr-2 p-mb-2"
                    @click="toggle" />
                <Menu id="config_menu" ref="menu" :model="buttonItems" :popup="true" />
            </h5>
            <h5 v-else>{{ designacaoGrafico }}
                <Button style="float: right;" icon="pi pi-ellipsis-v" class="p-button-rounded p-button-text p-mr-2 p-mb-2"
                    @click="toggle" />
                <Menu id="config_menu" ref="menu" :model="buttonItems" :popup="true" />
            </h5>
            <Chart v-if="viewGraf === 'linearChart'" type="line" :data="chartData" :options="chartOptions" />
            <Chart v-if="viewGraf === 'barChart'" type="bar" :data="chartData" :options="chartOptions" />
            <Chart v-if="viewGraf === 'pieChart'" type="pie" :data="chartData" />
            <Chart v-if="viewGraf === 'doughnutChart'" type="doughnut" :data="chartData" />
            <Chart v-if="viewGraf === 'polarAreaChart'" type="polarArea" :data="chartData" />
            <Chart v-if="viewGraf === 'radarChart'" type="radar" :data="chartData" />
        </div>
    </div>


    <!-- Remover Grafico -->
    <Dialog v-model:visible="deleteProductDialog" :style="{ width: '500px' }" header="Confirmação" :modal="true">
        <div class="confirmation-content">
            <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
            <span>Tem a certeza que deseja eliminar o gráfico?</span>
        </div>
        <template #footer>
            <Button label="Não" icon="pi pi-times" class="p-button-text" @click="deleteProductDialog = false" />
            <Button label="Sim" icon="pi pi-check" class="p-button-text" @click="deleteComponentLayout(this.id_grafico);" />
        </template>
    </Dialog>


    <!-- Altera Grafico -->
    <Dialog header="Editar Gráfico" v-model:visible="displayAlteraGrafico" :breakpoints="{ '960px': '75vw' }"
        :style="{ width: '40vw' }" :modal="true">
        <div class="p-grid p-fluid">

            <div class="p-col-12 p-md-12">
                <InputText type="text" placeholder="Designação" v-model="designacaoGrafico"></InputText>
            </div>

            <!-- Dropdown para ano do grafico pieChart e doughnutChart e polarAreaChart-->
            <div v-show="viewGraf === 'pieChart' || viewGraf === 'doughnutChart' || viewGraf === 'polarAreaChart'"
                class="p-col-12 p-md-12">
                <div v-if="verificaSelecionarAno === false">
                    <h6>Selecionar ficheiros: </h6>
                    <Tree :value="selecionarAnos" selectionMode="single" v-model:selectionKeys.sync="selecionarAno[0]"
                        placeholder="Selecionar Ano" />
                </div>
                <div v-if="verificaSelecionarAno === true">
                    <h6 style="color: red">Por favor selecione um ou mais ficheiros: </h6>
                    <Tree class="p-invalid" :value="selecionarAnos" selectionMode="single"
                        v-model:selectionKeys.sync="selecionarAno[0]" placeholder="Selecionar Ano" />
                </div>
            </div>

            <!-- Dropdown multi select para ano do grafico barChart e linearChart-->
            <div class="p-col-12 p-md-12"
                v-show="viewGraf === 'barChart' || viewGraf === 'linearChart' || viewGraf === 'radarChart'">
                <h6 v-if="verificaSelecionarAno === true" style="color: red">Por favor selecione um ou mais ficheiros: </h6>
                <Tree v-if="verificaSelecionarAno === true" class="p-invalid" :value="selecionarAnos"
                    selectionMode="checkbox" v-model:selectionKeys="selecionarAno" :required="true" />

                <h6 v-if="verificaSelecionarAno === false">Selecionar ficheiros: </h6>
                <Tree v-if="verificaSelecionarAno === false" :value="selecionarAnos" selectionMode="checkbox"
                    v-model:selectionKeys="selecionarAno" />

            </div>


            <!-- Dropdown multi select para tipo de dados do grafico pieChart, barChart , doughnutChart , polarAreaChart e radarChart-->
            <div class="p-col-12 p-md-12">
                <MultiSelect v-if="verificaSelecionarTipoDado === false" v-model="selecionarTipoDado"
                    :options="selecionarTipoDados" optionLabel="name" placeholder="Selecionar Tipo Dados" :filter="true"
                    class="multiselect-custom">
                    <template #value="slotProps">
                        <template v-if="!slotProps.value || slotProps.value.length === 0">
                            <div class="country-placeholder">
                                Selecionar Tipo de Dados
                            </div>
                        </template>
                    </template>
                    <template #option="slotProps">
                        <div class="country-item">
                            <div>{{ slotProps.option.name }}</div>
                        </div>
                    </template>
                </MultiSelect>


                <MultiSelect v-if="verificaSelecionarTipoDado === true" v-model="selecionarTipoDado"
                    :options="selecionarTipoDados" optionLabel="name" placeholder="Selecionar Tipo Dados" :filter="true"
                    class="multiselect-custom, p-invalid" :required="true">
                    <template #value="slotProps">
                        <template v-if="!slotProps.value || slotProps.value.length === 0">
                            <div class="country-placeholder">
                                Selecionar Tipo de Dados
                            </div>
                        </template>
                    </template>
                    <template #option="slotProps">
                        <div class="country-item">
                            <div>{{ slotProps.option.name }}</div>
                        </div>
                    </template>
                </MultiSelect>
            </div>
            <!-- -->

            <div class="p-col-4 p-md-4"
                v-if="selecionarTipoDado[0] !== undefined && selecionarTipoDado[0] !== '' && colorSet[0] !== undefined">
                <!-- <h5>{{tipoDados[0][0].toUpperCase() + tipoDados[0].substring(1)}}:</h5> -->
                <h5>{{ selecionarTipoDado[0].name }}:</h5>
                <ColorPicker v-model="colorSet[0]" />
            </div>
            <div class="p-col-4 p-md-4"
                v-if="selecionarTipoDado[1] !== undefined && selecionarTipoDado[1] !== '' && colorSet[1] !== undefined">
                <h5>{{ selecionarTipoDado[1].name }}: </h5>
                <ColorPicker v-model="colorSet[1]" />
            </div>
            <div class="p-col-4 p-md-4"
                v-if="selecionarTipoDado[2] !== undefined && selecionarTipoDado[2] !== '' && colorSet[2] !== undefined">
                <h5>{{ selecionarTipoDado[2].name }}: </h5>
                <ColorPicker v-model="colorSet[2]" />
            </div>
            <div class="p-col-4 p-md-4"
                v-if="selecionarTipoDado[3] !== undefined && selecionarTipoDado[3] !== '' && colorSet[3] !== undefined">
                <h5>{{ selecionarTipoDado[3].name }}: </h5>
                <ColorPicker v-model="colorSet[3]" />
            </div>
            <div class="p-col-4 p-md-4"
                v-if="selecionarTipoDado[4] !== undefined && selecionarTipoDado[4] !== '' && colorSet[4] !== undefined">
                <h5>{{ selecionarTipoDado[4].name }}: </h5>
                <ColorPicker v-model="colorSet[4]" />
            </div>
            <div class="p-col-4 p-md-4"
                v-if="selecionarTipoDado[5] !== undefined && selecionarTipoDado[5] !== '' && colorSet[5] !== undefined">
                <h5>{{ selecionarTipoDado[5].name }}: </h5>
                <ColorPicker v-model="colorSet[5]" />
            </div>
        </div>
        <template #footer>
            <Button label="Submeter" @click="submitEdicaoGraficoData()" icon="pi pi-check" class="p-button-success" />
            <Button label="Cores Default" @click="setDefaultColors()" icon="pi pi-check" class="p-button-secondary" />
        </template>
    </Dialog>
</template>

<script>












import axios from "axios";


export default {
    props: {
        dados: Object
    },
    beforeMount() {
        this.popularGrafico();
        this.token = JSON.parse(localStorage.getItem('token'));
        this.username = JSON.parse(localStorage.getItem('username'));
        this.id_company = this.dados.id_company;
        this.getCompanyData();
    },
    data() {
        return {
            id_grafico: "",
            //Color Pallete & info sobre dados a mostrar
            colorSet: [],
            tipoLayout: "",
            // tipoDados: [],
            //Propriedades dos
            chartData: {
                labels: [],
                datasets: []
            },
            chartOptions: {
                responsive: true,
                hover: {
                    mode: 'index'
                },
                scales: {
                    xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Anos'
                        }
                    }],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Valores'
                        }
                    }]
                }
            },
            buttonItems: [
                {
                    label: 'Update',
                    icon: 'pi pi-refresh',
                    command: () => {

                        for (let ia = 0; ia < this.selecionarAnos.length; ia++) {
                            var key = this.selecionarAnos[ia]["key"]
                            var children = this.selecionarAnos[ia]["children"]
                            var counter = 0;
                            for (let i = 0; i < this.dados.anosPretendidosF.length; i++) {
                                for (let ib = 0; ib < children.length; ib++) {
                                    if (children[ib]["data"] === this.dados.anosPretendidosF[i] && (this.dados.tipoGrafico === 'barChart' || this.dados.tipoGrafico === 'linearChart' || this.dados.tipoGrafico === 'radarChart')) {
                                        counter += 1
                                        if (counter === children.length) {
                                            this.selecionarAno[this.selecionarAnos[key].key] = { checked: true };
                                            this.selecionarAno[this.selecionarAnos[key]["children"][ib].key] = { checked: true };
                                        } else {
                                            this.selecionarAno[this.selecionarAnos[key]["children"][ib].key] = { checked: true };
                                        }


                                    } else if (children[ib]["data"] === this.dados.anosPretendidosF[i] && (this.dados.tipoGrafico === 'pieChart' || this.dados.tipoGrafico === 'doughnutChart' || this.dados.tipoGrafico === 'polarAreaChart')) {
                                        this.selecionarAno[0][this.selecionarAnos[key]["children"][ib].key] = true;
                                    }
                                    if (i === this.dados.anosPretendidosF.length - 1 && ib === children.length - 1 && ia === this.selecionarAnos.length - 1) {
                                        this.displayAlteraGrafico = true;

                                    }
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
            viewGraf: "",
            token: "",
            id_company: "",
            deleteProductDialog: false,
            displayAlteraGrafico: false,
            selecionarAnos: [],
            selecionarAno: [],
            selecionarTipoDados: [],
            selecionarTipoDado: [],
            verificaSelecionarAno: false,
            verificaSelecionarTipoDado: false,
            designacaoGrafico: "",
            verificaDesignacao: ""
        }
    },
    methods: {

        popularGrafico() {
            this.viewGraf = this.dados.tipoGrafico;
            this.id_grafico = this.dados._id;
            var dataSetFinal = [];
            var dataSetData = [];
            var backgroundColor = [];


            for (let i = 0; i < this.dados.anosPretendidosF.length; i++) {
                var anosF = this.dados.anosPretendidosF[i];
                let unix_timestamp = anosF.split("_")[2]
                var a = new Date(parseInt(unix_timestamp));
                // var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                // var month = months[a.getMonth()];
                var month = a.getMonth() + 1;
                var year = a.getFullYear();
                var date = a.getDate();
                var time = year + '-' + month + '-' + date


                this.selecionarAno.push({ 'name': time, 'code': anosF })
            }

            for (let i = 0; i < this.dados.tipoDadosF.length; i++) {
                var dataSet = []
                var color = this.dados.dadosPorAno[i]["Cor"];
                var colorPalette = this.dados.colorPalette.colors;
                var grafColor;

                if (this.dados.tipoDadosF[i] === "totalAtivoCorrente") {
                    this.selecionarTipoDado.push({ 'name': "Ativo Corrente", 'code': "totalAtivoCorrente" })
                    this.dados.tipoDadosF[i] = { 'name': "Ativo Corrente", 'code': "totalAtivoCorrente" }
                } else if (this.dados.tipoDadosF[i] === "totalPassivoCorrente") {
                    this.selecionarTipoDado.push({ 'name': "Passivo Corrente", 'code': "totalPassivoCorrente" })
                    this.dados.tipoDadosF[i] = { 'name': "Passivo Corrente", 'code': "totalPassivoCorrente" }

                } else if (this.dados.tipoDadosF[i] === "somaTotalClientes") {
                    this.selecionarTipoDado.push({ 'name': "Clientes", 'code': "somaTotalClientes" })
                    this.dados.tipoDadosF[i] = { 'name': "Clientes", 'code': "somaTotalClientes" }

                } else if (this.dados.tipoDadosF[i] === "somaFornecedores") {
                    this.selecionarTipoDado.push({ 'name': "Fornecedores", 'code': "somaFornecedores" })
                    this.dados.tipoDadosF[i] = { 'name': "Fornecedores", 'code': "somaFornecedores" }
                } else {
                    this.selecionarTipoDado.push({ 'name': this.dados.tipoDadosF[i].replace(/[_]/g, " "), 'code': this.dados.tipoDadosF[i] })
                    this.dados.tipoDadosF[i] = { 'name': this.dados.tipoDadosF[i].replace(/[_]/g, " "), 'code': this.dados.tipoDadosF[i] }
                }

                var tipoDados = this.dados.tipoDadosF[i];
                var arrayDados = this.dados.dadosPorAno[i][tipoDados.code];


                //Designacao Graficos
                if (this.dados.designacao === "default") {
                    if (i === 0) {
                        // this.designacaoGrafico = tipoDados[0].toUpperCase() + tipoDados.substring(1);
                        this.designacaoGrafico = tipoDados.name;
                        this.verificaDesignacao = tipoDados.name;
                    } else if (i === this.dados.tipoDadosF.length - 1) {
                        // this.designacaoGrafico = this.designacaoGrafico + " e " + tipoDados[0].toUpperCase() + tipoDados.substring(1);
                        this.designacaoGrafico = this.designacaoGrafico + " e " + tipoDados.name;
                        this.verificaDesignacao = this.verificaDesignacao + " e " + tipoDados.name;
                    } else {
                        // this.designacaoGrafico = this.designacaoGrafico + ", " + tipoDados[0].toUpperCase() + tipoDados.substring(1);
                        this.designacaoGrafico = this.designacaoGrafico + ", " + tipoDados.name;
                        this.verificaDesignacao = this.verificaDesignacao + ", " + tipoDados.name;
                    }
                } else {
                    this.designacaoGrafico = this.dados.designacao
                }

                //Set Dados Existentes
                // this.tipoDados = this.dados.tipoDadosF

                if (color === "default") {
                    this.colorSet.push(colorPalette[i])
                    grafColor = colorPalette[i]
                } else {
                    this.colorSet.push(color)
                    grafColor = color
                }


                // Linear Chart && Bar Chart
                if (this.viewGraf === "linearChart" || this.viewGraf === "barChart" || this.viewGraf === "radarChart") {

                    const convert = this.dados.anosPretendidosF.map(element => {

                        let unix_timestamp = element.split("_")[2]
                        var a = new Date(parseInt(unix_timestamp));
                        // var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                        // var month = months[a.getMonth()];
                        var month = a.getMonth() + 1;
                        var year = a.getFullYear();
                        var date = a.getDate();
                        var time = year + '-' + month + '-' + date
                        return time

                    });
                    this.chartData.labels = convert;

                    for (let h = 0; h < arrayDados.length; h++) {
                        dataSet.push(arrayDados[h])
                        if (h === arrayDados.length - 1) {
                            //UpperCase                           
                            // var designacao = this.dados.tipoDadosF[i];
                            // var designacaoF = designacao[0].toUpperCase() + designacao.substring(1)
                            //End UpperCase  
                            var designacaoF = tipoDados.name


                            if (this.viewGraf === "linearChart") {
                                dataSetFinal.push({
                                    label: designacaoF,
                                    data: dataSet,
                                    borderColor: grafColor,
                                    fill: false,
                                })
                            } else if (this.viewGraf === "barChart") {
                                dataSetFinal.push({
                                    label: designacaoF,
                                    data: dataSet,
                                    borderColor: grafColor,
                                    backgroundColor: grafColor
                                })
                            } else if (this.viewGraf === "radarChart") {
                                var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
                                grafColor = grafColor.replace(shorthandRegex, function (m, r, g, b) {
                                    return r + r + g + g + b + b;
                                });
                                var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(grafColor);
                                var rgbaF = 'rgba(' + parseInt(result[1], 16) + ',' + parseInt(result[2], 16) + ',' + parseInt(result[3], 16);

                                dataSetFinal.push({
                                    label: designacaoF,
                                    backgroundColor: rgbaF + ',0.2)',
                                    borderColor: rgbaF + ',1)',
                                    pointBackgroundColor: rgbaF + ',1)',
                                    pointBorderColor: '#fff',
                                    pointHoverBackgroundColor: '#fff',
                                    pointHoverBorderColor: rgbaF + ',1)',
                                    data: dataSet
                                })
                            }
                            this.chartData.datasets = dataSetFinal
                        }
                    }
                }

                //Pie Chart
                if (this.viewGraf === "pieChart" || this.viewGraf === "doughnutChart" || this.viewGraf === "polarAreaChart") {
                    const upper = this.dados.tipoDadosF.map(element => {
                        // return element[0].toUpperCase() + element.substring(1);
                        return element.name

                    });
                    this.chartData.labels = upper;

                    dataSetData.push(arrayDados[0]);
                    backgroundColor.push(grafColor)

                    if (i === this.dados.tipoDadosF.length - 1) {
                        dataSetFinal.push({
                            data: dataSetData,
                            backgroundColor: backgroundColor
                        })
                        this.chartData.datasets = dataSetFinal
                    }
                }
            }
        },
        deleteComponentLayout(id_grafico) {
            axios({
                method: 'delete',
                url: process.env.VUE_APP_URLBack + "/layout/layout",
                headers: { token: this.token, id_layout: id_grafico }
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
                        this.selecionarAnos = response.data.arrayPrincipal
                        this.selecionarTipoDados = response.data.arrayData
                    }
                })
                .catch(error => {
                    // Request failed.
                    console.log("error", error.response);
                });




        },
        //Editar Grafico
        submitEdicaoGraficoData() {
            // var anosPretendidos = JSON.parse(JSON.stringify(this.selecionarAno))
            var tipoDados = JSON.parse(JSON.stringify(this.selecionarTipoDado))
            var anosPretendidosF = [];
            var tipoDadosF = [];
            var cores = [];
            var token = this.token;
            var colorPalette = this.dados.colorPalette.colors;


            //Verifica qual a opcao e se tipo de anos esta selecionado
            if (this.dados.tipoGrafico === 'pieChart' || this.dados.tipoGrafico === 'doughnutChart' || this.dados.tipoGrafico === 'polarAreaChart') {
                //verifica se esta ou nao selecionado, e tambem se seleciona grupo
                if (this.selecionarAno === null || this.selecionarAno === undefined || this.selecionarAno === "" || this.selecionarAno[0] === null || this.selecionarAno[0] === undefined || JSON.stringify(this.selecionarAno[0]) === "{}" || JSON.parse(JSON.stringify(this.selecionarAno[0])) === null) {
                    this.verificaSelecionarAno = true
                    this.$toast.add({ severity: 'error', summary: 'É necessário selecionar um ou mais ficheiros', life: 3000 });

                } else if (Object.keys(this.selecionarAno[0])[0].split("-")[1] === undefined && this.selecionarAno[0]["name"] === undefined) {
                    this.verificaSelecionarAno = true
                    this.$toast.add({ severity: 'error', summary: 'Apenas pode selecionar um ficheiro e não um grupo.', life: 3000 });

                } else if (this.selecionarAno[0]["name"] !== undefined) {
                    var anosPretendidos = [Object.keys(this.selecionarAno[0])[2]]
                    this.verificaSelecionarAno = false
                } else {
                    // console.log(Object.keys(this.selecionarAno[0]))
                    var anosPretendidos = Object.keys(this.selecionarAno[0])
                    this.verificaSelecionarAno = false
                }
            } else if (this.dados.tipoGrafico === 'barChart' || this.dados.tipoGrafico === 'linearChart' || this.dados.tipoGrafico === 'radarChart') {

                if (this.selecionarAno === null || this.selecionarAno === undefined || this.selecionarAno === "" || this.selecionarAno[0] === null || this.selecionarAno[0] === undefined || JSON.stringify(this.selecionarAno) === "{}" || JSON.parse(JSON.stringify(this.selecionarAno)) === null) {
                    this.verificaSelecionarAno = true
                    this.$toast.add({ severity: 'error', summary: 'É necessário selecionar um ou mais ficheiros', life: 3000 });

                } else {
                    var anosPretendidos = this.selecionarAno
                    this.verificaSelecionarAno = false
                }
            }





            if (this.selecionarTipoDado === null || this.selecionarTipoDado[0] === undefined || this.selecionarTipoDado[0] === "") {
                this.verificaSelecionarTipoDado = true
            } else {
                this.verificaSelecionarTipoDado = false
            }
            if (this.verificaSelecionarAno === false && this.verificaSelecionarTipoDado === false) {
                //organiza array
                if (this.dados.tipoGrafico === 'barChart' || this.dados.tipoGrafico === 'linearChart' || this.dados.tipoGrafico === 'radarChart') {
                    var filtro = Object.keys(anosPretendidos)
                    var anosPretendidosFOrder = []
                    for (let i = 0; i < filtro.length; i++) {
                        if (filtro[i].split("-")[1] === undefined) {
                        } else {
                            for (let ia = 0; ia < this.selecionarAnos.length; ia++) {
                                var children = this.selecionarAnos[ia]["children"]

                                for (let ib = 0; ib < children.length; ib++) {
                                    if (children[ib]["key"] === filtro[i]) {
                                        anosPretendidosFOrder.push({
                                            key: filtro[i],
                                            name: children[ib]["data"]
                                        })
                                    }
                                }
                            }
                        }

                        if (i === filtro.length - 1) {
                            anosPretendidosFOrder.sort(function (a, b) { return a["name"].split("_")[2] - b["name"].split("_")[2] });
                            for (let ia = 0; ia < anosPretendidosFOrder.length; ia++) {
                                anosPretendidosF.push(anosPretendidosFOrder[ia]["key"])
                            }

                        }
                    }
                } else {
                    anosPretendidosF = anosPretendidos
                }

                for (let i = 0; i < tipoDados.length; i++) {
                    // var tipoDadosS = tipoDados[i].code
                    // tipoDadosF.push(tipoDadosS[0].toLowerCase() + tipoDadosS.substring(1))
                    tipoDadosF.push(tipoDados[i].code)
                    if (colorPalette[i] === this.colorSet[i] || this.colorSet[i] === undefined) {
                        cores.push("default")
                    } else if (this.colorSet[i][0] === "#") {
                        cores.push(this.colorSet[i])
                    } else {
                        cores.push("#" + this.colorSet[i])
                    }
                }

                var designicao1;
                if (this.designacaoGrafico === "" || this.designacaoGrafico === null || this.designacaoGrafico === undefined || this.designacaoGrafico === this.verificaDesignacao) {
                    designicao1 = "default";
                } else {
                    designicao1 = this.designacaoGrafico;
                }

                var json = {
                    _id: this.dados._id,
                    id_company: this.id_company,
                    anosPretendidosF: anosPretendidosF,
                    tipoDadosF: tipoDadosF,
                    designacao: designicao1,
                    color: cores,
                    username: this.username
                }
                // console.log(json);

                axios({
                    method: 'put',
                    url: process.env.VUE_APP_URLBack + "/layout/layout",
                    headers: { token: token },
                    data: json
                })
                    .then(response => {
                        // console.log("Server Response:", response);
                        if (response.status !== 200) {
                            this.error = response;
                            return;
                        } else {
                            this.clearDataDialog();
                            this.displayAlteraGrafico = false;
                            this.$router.go()
                        }
                    })
                    .catch(error => {
                        // Request failed.
                        console.log("error", error.response);
                    });
            }
        },
        clearDataDialog() {
            this.selecionarAno = null;
            this.selecionarTipoDado = null;
        },
        setDefaultColors() {
            var token = this.token;
            var id_layout = this.id_grafico

            axios({
                method: 'put',
                url: process.env.VUE_APP_URLBack + "/colorPalette/setDefault",
                headers: { token: token, id_layout: id_layout }
            })
                .then(response => {
                    // console.log("Server Response:", response);
                    if (response.status !== 200) {
                        this.error = response;
                        return;
                    } else {
                        this.clearDataDialog();
                        this.displayAlteraGrafico = false;
                        this.$router.go()
                    }
                })
                .catch(error => {
                    // Request failed.
                    console.log("error", error.response);
                });
        }
    }
}
</script>
