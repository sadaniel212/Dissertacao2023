<template>

    <div class="card card-w-title">
        		<Toast />
<ConfirmPopup></ConfirmPopup>
        <div class="p-grid">
            <div class="p-col-10 ">
                <h2 style="text-align: center;"> {{ companyName }}</h2>
            </div>
            <div class="p-col" align="right">
                <Button v-if="path == '/companyView'" label="Voltar pagina principal" @click="backButtonPrincipal()"
                    icon="pi pi-fw pi-angle-double-left"></Button>
            </div>
        </div>
        <Toolbar>
            <template v-slot:left>
                <h5 v-if="path == '/rulesCompany'" style="margin-top: .3em"> Regras para cálculo de balanço </h5>
                <Button
                    v-if="path != '/demonstracaoResultados' && path != '/demonstracaoResultadosMeses' && path != '/rulesCompany'"
                    label="Lista de Ficheiros" icon="pi pi-fw pi-list" @click="verListaSaft()" style="margin-right: .5em" />
                <Button
                    v-if="path != '/demonstracaoResultados' && path != '/demonstracaoResultadosMeses' && path != '/rulesCompany'"
                    label="Compare SAF-T" icon="pi pi-fw pi-sliders-v" style="margin-right: .5em"
                    @click="verCompareSaft()" />
                <Button
                    v-if="path != '/demonstracaoResultados' && path != '/demonstracaoResultadosMeses' && path != '/rulesCompany'"
                    label="E-Fatura" icon="pi pi-fw pi-file-o" style="margin-right: .5em" @click="displayEFatura = true" />
                <Button
                    v-if="path != '/demonstracaoResultados' && path != '/demonstracaoResultadosMeses' && path != '/rulesCompany'"
                    label="Upload" icon="pi pi-upload" style="margin-right: .5em" @click="displayNewUpload = true" />
                <!-- <Button label="Regras gerais do Balanço" icon="pi pi-fw pi-sliders-v" style="margin-right: .5em" @click="rulesBalanco()" /> -->
                <Button v-if="path == '/demonstracaoResultados' && path != '/rulesCompany'" label="Mais Detalhe"
                    @click="MaisDetalheButton()"></Button>

            </template>
            <template v-slot:right>
                <Button v-if="path == '/rulesCompany'" label="Aplicar regas a ficheiro" icon="pi pi-fw pi-list" @click="verListaSaftRules()" style="margin-right: .5em" />
                <SplitButton v-if="path == '/companyView'" label="Opções Empresa" :model="toolbarItemsEmpresa"
                    style="margin-right: .5em" icon="pi pi-cog"></SplitButton>
                <SplitButton v-if="path == '/companyView'" label="Opções Dashboard" :model="toolbarItems" icon="pi pi-cog">
                </SplitButton>
                <Button
                    v-if="path == '/rulesCompany'"
                    label="Lista de Ficheiros" icon="pi pi-fw pi-list" @click="verListaSaft()" style="margin-right: .5em" />
                <Button v-if="path == '/demonstracaoResultadosMeses'" label="Voltar ao DR" @click="backButtonMeses()"
                    icon="pi pi-fw pi-angle-left"></Button>
                <Button v-if="path != '/companyView'" label="Voltar pagina inicial" @click="backButton()"
                    icon="pi pi-fw pi-angle-double-left" style="margin-right: .5em"></Button>
            </template>
        </Toolbar>
    </div>

    <!-- Modal para abrir menu de safts -->
    <Dialog header="Lista de ficheiro SAF-T" v-model:visible="displaySAFT" :breakpoints="{ '1000px': '75vw' }"
        :style="{ width: '40vw' }" :modal="true">
        <div class="p-grid p-fluid">
            <div class="p-col-12 p-md-12">
                <h5>SAF-T de contabilidade</h5>
                <DataTable :loading="loading1" :value="saftcs" dataKey="_id" responsiveLayout="scroll">
                    <template #loading>
                        Loading SAFT. Please wait.
                    </template>
                    <template #empty>
                        No SAFT found.
                    </template>
                    <Column header="Start date" :sortable="true">
                        <template #body="slotProps">
                            <span class="p-column-title">Start date</span>
                            {{ slotProps.data.startDate }}
                        </template>
                    </Column>
                    <Column header="End Date" :sortable="true">
                        <template #body="slotProps">
                            <span class="p-column-title">End Date</span>
                            {{ slotProps.data.endDate }}
                        </template>
                    </Column>
                    <Column header="Opções" style="text-align: center">
                        <template #body="slotProps">
                            <span class="p-buttonset">
                                <Button label="Analisar Ficheiro" @click="balancoRedirect(slotProps.data.name_file)"
                                    icon="pi pi-check" />
                                <!--  <Button label="Ver DR" @click="demonstracaoResultadosRedirect(slotProps.data.name_file)"
                                    icon="pi pi-check" /> -->
                            </span>
                        </template>
                    </Column>

                </DataTable>
            </div>
            <div class="p-col-12 p-md-12">
                <h5>SAF-T de faturação</h5>
                <DataTable :loading="loading2" :value="saftts" dataKey="_id" responsiveLayout="scroll">
                    <template #loading>
                        Loading SAFT. Please wait.
                    </template>
                    <Column header="Start date" :sortable="true">
                        <template #body="slotProps">
                            <span class="p-column-title">Start date</span>
                            {{ slotProps.data.startDate }}
                        </template>
                    </Column>
                    <Column header="End Date" :sortable="true">
                        <template #body="slotProps">
                            <span class="p-column-title">End Date</span>
                            {{ slotProps.data.endDate }}
                        </template>
                    </Column>

                </DataTable>
            </div>
        </div>
        <template #footer>

        </template>
    </Dialog>


     <!-- Modal para abrir menu de safts -->
    <Dialog header="Lista de SAF-T de contabilidade" v-model:visible="displaySAFTRules" :breakpoints="{ '1000px': '75vw' }"
        :style="{ width: '40vw' }" :modal="true">
                      

        <div class="p-grid p-fluid">
            <div class="p-col-12 p-md-12">
                <DataTable :loading="loading1" :value="saftcs" dataKey="_id" responsiveLayout="scroll">
                    
                    <template #loading>
                        Loading SAFT. Please wait.
                    </template>
                    <template #empty>
                        No SAFT found.
                    </template>
                    <Column header="Data de inicio" :sortable="true">
                        <template #body="slotProps">
                            {{ slotProps.data.startDate }}
                        </template>
                    </Column>
                    <Column header="Data de fim" :sortable="true">
                        <template #body="slotProps">
                            {{ slotProps.data.endDate }}
                        </template>
                    </Column>
                    <Column header="Opções" style="text-align: center">
                        <template #body="slotProps">
                            <span class="p-buttonset">
                                <Button label="Aplicar a este ficheiro" @click="applyRules(slotProps.data.name_file)"
                                    icon="pi pi-check" />
                                <!--  <Button label="Ver DR" @click="demonstracaoResultadosRedirect(slotProps.data.name_file)"
                                    icon="pi pi-check" /> -->
                            </span>
                        </template>
                    </Column>

                </DataTable>
            </div>
        </div>
        <template #footer>

        </template>
    </Dialog>
    <!-- Fim Modal Safts -->


    <!-- Adicionar Grafico -->
    <Dialog header="Adicionar Gráfico" v-model:visible="displayAddGrafico" :breakpoints="{ '960px': '75vw' }"
        :style="{ width: '40vw' }" :modal="true">
        <div class="p-grid p-fluid">


            <!-- Designacao -->
            <div class="p-col-12 p-md-12">
                <InputText type="text" placeholder="Designação" v-model="designacaoGraf"></InputText>
            </div>

            <!-- Tipo Grafico  -->
            <div v-if="verificaTiposGrafico === true" class="p-col-12 p-md-12">
                <Dropdown v-model="tiposGrafico" :required="true" :options="tiposGraficos" optionLabel="name"
                    placeholder="Tipo de Gráfico" class="p-invalid" @change="onChange($event)" />
            </div>
            <div v-if="verificaTiposGrafico === false" class="p-col-12 p-md-12">
                <Dropdown v-model="tiposGrafico" :options="tiposGraficos" optionLabel="name" placeholder="Tipo de Gráfico"
                    @change="onChange($event)" />
            </div>

            <!-- Tipo de Dados a mostrar -->
            <div class="p-col-12 p-md-12">
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
            </div>

            <!-- Dropdown para tipo de grafico pieChart e doughnutChart -->
            <div v-show="tipoGraficoSelecionado === 'pieChart' || tipoGraficoSelecionado === 'doughnutChart' || tipoGraficoSelecionado === 'polarAreaChart'"
                class="p-col-12 p-md-12">
                <div v-if="verificaSelecionarAno === false">
                    <h6>Selecionar ficheiros: </h6>
                    <Tree :value="selecionarAnos" selectionMode="single" v-model:selectionKeys.sync="selecionarAno" />
                </div>
                <div v-if="verificaSelecionarAno === true">
                    <h6 style="color: red">Por favor selecione um ou mais ficheiros: </h6>
                    <Tree class="p-invalid" :value="selecionarAnos" selectionMode="single"
                        v-model:selectionKeys.sync="selecionarAno" :required="true" />
                </div>
            </div>


            <!-- Dropdown para tipo de grafico barChart, linearChart e radarChart -->
            <div v-show="(tipoGraficoSelecionado === 'barChart' || tipoGraficoSelecionado === 'linearChart' || tipoGraficoSelecionado === 'radarChart')"
                class="p-col-12 p-md-12">
                <h6 v-if="verificaSelecionarAno === true" style="color: red">Por favor selecione um ou mais ficheiros: </h6>
                <Tree v-if="verificaSelecionarAno === true" class="p-invalid" :value="selecionarAnos"
                    selectionMode="checkbox" v-model:selectionKeys="selecionarAno" :required="true" />

                <h6 v-if="verificaSelecionarAno === false">Selecionar ficheiros: </h6>
                <Tree v-if="verificaSelecionarAno === false" :value="selecionarAnos" selectionMode="checkbox"
                    v-model:selectionKeys="selecionarAno" />
            </div>


        </div>
        <template #footer>
            <Button label="Submeter" @click="submitNovoGraficoData" icon="pi pi-check" class="p-button-success" />
            <Button label="Limpar Seleção" @click="clearDataDialogGraf" icon="pi pi-trash" class="p-button-secondary" />
        </template>
    </Dialog>


    <!-- Adicionar Widget de Informacao -->
    <Dialog header="Adicionar Widget" v-model:visible="displayAddInfo" :breakpoints="{ '960px': '75vw' }"
        :style="{ width: '40vw' }" :modal="true">
        <div class="p-grid p-fluid">

            <div class="p-col-12 p-md-12">
                <InputText type="text" placeholder="Designação" v-model="designacaoWidget"></InputText>
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
            <Button label="Submeter" @click="submitNovoWidgetData()" icon="pi pi-check" class="p-button-success" />
            <Button label="Limpar Seleção" @click="clearDataDialogWidget()" icon="pi pi-trash" class="p-button-secondary" />
        </template>
    </Dialog>


    <!-- Editar Layout -->
    <Dialog header="Editar Paleta Cores" v-model:visible="displayEditLayout" :breakpoints="{ '960px': '75vw' }"
        :style="{ width: '40vw' }" :modal="true">
        <div class="p-grid p-fluid">

            <div class="p-col-12 p-md-12">
                <SelectButton v-model="selectButtonValue1" :options="selectButtonValues1" optionLabel="name" />
            </div>
            <div class="p-col-3 p-md-3">
                <ColorPicker v-model="colorSet1[0]" />
                <ColorPicker v-model="colorSet1[1]" />
                <ColorPicker v-model="colorSet1[2]" />
                <ColorPicker v-model="colorSet1[3]" />
                <ColorPicker v-model="colorSet1[4]" />
                <ColorPicker v-model="colorSet1[5]" />
            </div>
            <div class="p-col-3 p-md-3">
                <ColorPicker v-model="colorSet2[0]" />
                <ColorPicker v-model="colorSet2[1]" />
                <ColorPicker v-model="colorSet2[2]" />
                <ColorPicker v-model="colorSet2[3]" />
                <ColorPicker v-model="colorSet2[4]" />
                <ColorPicker v-model="colorSet2[5]" />
            </div>
            <div class="p-col-3 p-md-3">
                <ColorPicker v-model="colorSet3[0]" />
                <ColorPicker v-model="colorSet3[1]" />
                <ColorPicker v-model="colorSet3[2]" />
                <ColorPicker v-model="colorSet3[3]" />
                <ColorPicker v-model="colorSet3[4]" />
                <ColorPicker v-model="colorSet3[5]" />
            </div>
            <div class="p-col-3 p-md-3">
                <ColorPicker v-model="colorSet4[0]" />
                <ColorPicker v-model="colorSet4[1]" />
                <ColorPicker v-model="colorSet4[2]" />
                <ColorPicker v-model="colorSet4[3]" />
                <ColorPicker v-model="colorSet4[4]" />
                <ColorPicker v-model="colorSet4[5]" />
            </div>

        </div>
        <template #footer>
            <Button label="Submeter" @click="submitPaletaPersonalizada()" icon="pi pi-check" class="p-button-success" />
        </template>
    </Dialog>

    <!-- Partilhar Layout -->
    <Dialog header="Partilhar Layout" v-model:visible="displayShareLayout" :breakpoints="{ '960px': '75vw' }"
        :style="{ width: '40vw' }" :modal="true">
        <div class="p-grid p-fluid">


            <!-- Dropdown para copiar layout de outra empresa-->
            <div class="p-col-12 p-md-12">
                <MultiSelect v-if="verificarPartilhaLayout === true" v-model="empresasSelecionadasAplicarLayout"
                    :options="selecionarEmpresasAplicarLayouts" optionLabel="name"
                    placeholder="Selecionar empresas para aplicar este layout" :filter="true"
                    class="multiselect-custom, p-invalid" :required="true">
                    <template #value="slotProps">
                        <template v-if="!slotProps.value || slotProps.value.length === 0">
                            <div class="country-placeholder">
                                Selecionar empresas para aplicar este layout
                            </div>
                        </template>
                    </template>
                    <template #option="slotProps">
                        <div class="country-item">
                            <div>{{ slotProps.option.name }}</div>
                        </div>
                    </template>
                </MultiSelect>


                <MultiSelect v-if="verificarPartilhaLayout === false" v-model="empresasSelecionadasAplicarLayout"
                    :options="selecionarEmpresasAplicarLayouts" optionLabel="name"
                    placeholder="Selecionar empresas para aplicar este layout" :filter="true" class="multiselect-custom">
                    <template #value="slotProps">
                        <template v-if="!slotProps.value || slotProps.value.length === 0">
                            <div class="country-placeholder">
                                Selecionar empresas para aplicar este layout
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



        </div>
        <template #footer>
            <Button label="Aplicar" @click="submitShareLayout()" icon="pi pi-check" class="p-button-success" />
        </template>
    </Dialog>

    <!-- No Data Company-->
    <Dialog v-model:visible="displayNoDataCompany" :style="{ width: '500px' }" header="Informação" :modal="true">
        <div class="confirmation-content">
            <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
            <span>Empresa em dados adicionados - Pretende adidiconar agora?</span>
        </div>
        <template #footer>
            <Button label="Não, retroceder" icon="pi pi-times" class="p-button-text"
                @click="displayNoDataCompany = false; this.$router.push('/company')" />
            <Button label="Sim, upload" icon="pi pi-check" class="p-button-text" @click="displayNewUpload = true" />
        </template>
    </Dialog>

    <!-- No Layout-->
    <Dialog v-model:visible="displayNoLayout" :style="{ width: '500px' }" header="Informação" :modal="true">
        <div class="confirmation-content">
            <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
            <span>Nenhum layout adicionado - Adicionar agora ?</span>
        </div>
        <template #footer>
            <Button label="Não, retroceder" icon="pi pi-times" class="p-button-text"
                @click="displayNoDataCompany = false; this.$router.push('/company')" />
            <Button label="Sim" icon="pi pi-check" class="p-button-text"
                @click="this.displayAddGrafico = true, this.displayNoLayout = false;" />
            <!-- <Button label="Sim, adicionar widget" icon="pi pi-check" class="p-button-text" @click="this.displayAddInfo = true"/> -->
        </template>
    </Dialog>

    <!-- ------------------------------ -->
    <!-- ------------------------------ -->
    <!-- Upload Display -->
    <Dialog header="Upload new file" v-model:visible="displayNewUpload" :breakpoints="{ '960px': '75vw' }"
        :style="{ width: '30vw' }" :modal="true">
        <div class="col-md-10">
            <h5> Saft-C File</h5>
        </div>
        <br>
        <div>
            <ProgressBar :value="valueProgressC" />
        </div>
        <br>
        <div class="col-md-2" style="align:center">
            <FileUpload accept="text/xml" mode="basic" name="file[]" :customUpload="true" :multiple="false"
                @select="disabled = true" @clear="disabled = false" @uploader="newSubmitFileSAFTC" />
        </div>
        <br>
        <div class="col-md-12">
            <hr>
        </div>
        <br>
        <div class="col-md-10">
            <h5> Saft-T File</h5>
        </div>
        <br>
        <div class="col-md-2" style="align: center">
            <FileUpload accept="text/xml" mode="basic" name="file[]" :customUpload="true" :multiple="false"
                @select="disabled = true" @clear="disabled = false" @uploader="newSubmitFileSAFTT" />
        </div>
        <template #footer>
            <Button label="Dismiss" @click="closeUploadDisplay" icon="pi pi-check" class="p-button-secondary" />
        </template>
    </Dialog>

    <!-- Display Compare Saft -->
    <Dialog header="SAFT list to compare" v-model:visible="displayCompareSaft" :breakpoints="{ '1000px': '75vw' }"
        :style="{ width: '40vw' }" :modal="true">
        <div class="p-grid p-fluid">
            <div class="p-col-12 p-md-12">
                <h5>SAFT-C</h5>
                <DataTable :loading="loading1" :value="saftcs" dataKey="_id" responsiveLayout="scroll">
                    <template #loading>
                        Loading SAFT. Please wait.
                    </template>
                    <template #empty>
                        No SAFT found.
                    </template>
                    <!--  <Column field="tipoSaft" header="Saft" :sortable="true">
                                                                                <template >
                                                                                    <span class="p-column-title">Start date</span>
                                                                                    SAFT C
                                                                                </template>
                                                                            </Column> -->
                    <Column field="startDate" header="Start date" :sortable="true">
                        <template #body="slotProps">
                            <span class="p-column-title">Start date</span>
                            {{ slotProps.data.startDate }}
                        </template>
                    </Column>
                    <Column field="endDate" header="End Date" :sortable="true">
                        <template #body="slotProps">
                            <span class="p-column-title">End Date</span>
                            {{ slotProps.data.endDate }}
                        </template>
                    </Column>
                    <Column field="" header="">
                        <template #body="slotProps">
                            <input type="radio" :value="slotProps" v-model="saftCchecks">
                        </template>
                    </Column>

                </DataTable>
            </div>
            <div class="p-col-12 p-md-12">
                <h5>SAFT-T</h5>
                <DataTable :loading="loading2" :value="saftts" dataKey="_id" responsiveLayout="scroll">
                    <template #loading>
                        Loading SAFT. Please wait.
                    </template>
                    <Column field="startDate" header="Start date" :sortable="true">
                        <template #body="slotProps">
                            <span class="p-column-title">Start date</span>
                            {{ slotProps.data.startDate }}
                        </template>
                    </Column>
                    <Column field="endDate" header="End Date" :sortable="true">
                        <template #body="slotProps">
                            <span class="p-column-title">End Date</span>
                            {{ slotProps.data.endDate }}
                        </template>
                    </Column>
                    <Column field="" header="">
                        <template #body="slotProps">
                            <input type="radio" :value="slotProps" v-model="saftTchecks">
                        </template>
                    </Column>
                    <!-- <Column field="nome" header="" >
                                                                                <template #body="slotProps">
                                                                                    <span class="p-buttonset">
                                                                                         <Button label="Ver Balanço" @click="balancoRedirect(slotProps.data.id_company, slotProps.data.filename)" icon="pi pi-check" />
                                                                                         <Button label="Ver DR" @click="demonstracaoResultadosRedirect(slotProps.data.id_company, slotProps.data.filename)" icon="pi pi-check" />
                                                                                     </span>
                                                                                </template>
                                                                            </Column> -->

                </DataTable>
            </div>
            <Button label="Comparar" @click="getValidSaftCs1()" icon="pi pi-check" />
        </div>
        <template #footer>

        </template>
    </Dialog>

    <!-- Display connect to E-Fatura -->
    <Dialog header="Connect to E-Fatura" v-model:visible="displayEFatura" :breakpoints="{ '1000px': '75vw' }"
        :style="{ width: '40vw' }" :modal="true">
        <div class="p-grid p-fluid">
            <div class="p-col-12 p-md-12">
                <div class="p-col-12">
                    <span class="p-input-icon-left">
                        <i class="pi pi-user" />
                        <InputText class="p-inputtext" placeholder="NIF" v-model="nif" />
                    </span>
                </div>
                <div class="p-col-12">
                    <span class="p-input-icon-left">
                        <i class="pi pi-user" />
                        <Password placeholder="Password" v-model="passwordFatura" toggleMask :feedback="false" />
                    </span>
                </div>
                <div class="p-col-12">
                    <span class="p-input-icon-left">
                        <i class="pi pi-user" />
                        <Calendar :showIcon="true" v-model="dataInicioFatura" placeholder="Initial Date"
                            date-format="yy-mm-dd"></Calendar>
                    </span>
                </div>
                <div class="p-col-12">
                    <span class="p-input-icon-left">
                        <i class="pi pi-user" />
                        <Calendar :showIcon="true" v-model="dataFimFatura" placeholder="End  Date" date-format="yy-mm-dd">
                        </Calendar>
                    </span>
                </div>
            </div>
            <Button label="Comparar" @click="verificarFaturas()" icon="pi pi-check" />
        </div>
        <template #footer>

        </template>
    </Dialog>
</template>

<script>






import axios from "axios";
import { store } from '../store'
import moment from 'moment'
// import fs from 'fs'
// import xml2js from 'xml2js'
import ConfirmPopup from 'primevue/confirmpopup';


export default {
    props: {
        companyName: String,
        id_company: String,
        username: String,
        token: String,
        layoutVerification: Number
    },
    data() {
        return {
            path: "",
            //Barra menu Inicial
            toolbarItems: [
                {
                    label: 'Adicionar Gráfico',
                    icon: 'pi pi-plus',
                    command: () => {
                        this.displayAddGrafico = true
                    }
                },
                {
                    label: 'Acicionar Widget',
                    icon: 'pi pi-plus',
                    command: () => {
                        this.displayAddInfo = true
                    }
                },
                {
                    label: 'Editar Paleta Cores',
                    icon: 'pi pi-cog',
                    command: () => {
                        this.displayEditLayout = true
                    }
                },
                {
                    label: 'Partilhar Layout',
                    icon: 'pi pi-share-alt',
                    command: () => {
                        if (this.layoutVerification === 0) {
                            this.displayNoLayout = true;
                        } else {
                            this.displayShareLayout = true
                        }

                    }
                }
            ],
            toolbarItemsEmpresa: [
                {
                    label: 'Regras para cálculo do balanço',
                    icon: 'pi pi-eye',
                    command: () => {
                        this.rulesBalanco()
                    }
                }
            ],
            loading1: true,
            loading2: true,
            saftcs: null,
            saftts: null,
            displaySAFT: false,
            displayAddGrafico: false,
            displayAddInfo: false,
            displayNoDataCompany: false,
            tiposGraficos: [
                { name: 'Linear Chart', code: 'linearChart' },
                { name: 'Bar Chart', code: 'barChart' },
                { name: 'Pie Chart', code: 'pieChart' },
                { name: 'Doughnut Chart', code: 'doughnutChart' },
                { name: 'Polar Area Chart', code: 'polarAreaChart' },
                { name: 'Radar Chart', code: 'radarChart' }
            ],
            tiposGrafico: null,
            selecionarAnos: [],
            selecionarAno: null,
            selecionarTipoDados: [],
            selecionarTipoDado: null,
            //Verificacoes
            verificaTiposGrafico: false,
            verificaSelecionarAno: false,
            verificaSelecionarTipoDado: false,
            successMessageShow: false,
            tipoGraficoSelecionado: null,
            //adicionar widget
            verificaTiposDadoInfo: false,
            verificaSelecionarAnoInfo1: false,
            verificaSelecionarAnoInfo2: false,
            selecionarTipoDadosInfo: [],
            selecionarTipoDadoInfo: null,
            selecionarAnosInfo1: [],
            selecionarAnoInfo1: null,
            selecionarAnosInfo2: [],
            selecionarAnoInfo2: null,
            designacaoGraf: null,
            designacaoWidget: null,
            displayEditLayout: false,
            // Diferentes paleta cores
            selectButtonValues1: [
                { name: "Natural", code: "01" },
                { name: "Forest", code: "02" },
                { name: "Caretaker", code: "03" },
                { name: "Speed", code: "04" }
            ],
            selectButtonValue1: null,
            colorPickerDefault1: "1976D2",
            colorPickerDefault2: "1976D2",
            colorPickerDefault3: "1976D2",
            colorPickerDefault4: "1976D2",
            colorPickerDefault5: "1976D2",
            colorPickerDefault6: "1976D2",

            //ColorPallet
            colorSet1: ["#ae3c60", "#df473c", "#f3c33c", "#255e79", "#267778", "#82b4bb"],
            colorSet2: ["#537c78", "#7ba591", "#cc222b", "#f15b4c", "#faa41b", "#ffd45b"],
            colorSet3: ["#eb4a04", "#fe8e36", "#265158", "#63a99e", "#9fddd2", "#c5f0e9"],
            colorSet4: ["#db1d43", "#ff8a82", "#a7511b", "#d38664", "#ffc702", "#ffd97d"],

            //Partilhar layout
            displayShareLayout: false,
            verificarPartilhaLayout: false,
            selecionarEmpresasAplicarLayouts: [],
            empresasSelecionadasAplicarLayout: null,
            displayNoLayout: false,

            //Upload New File
            displayNewUpload: false,
            valueProgressC: 0,
            progressC: false,
            file: null,
            fileDRandBalanco: '',
            file2: null,

            //Display Compare SAft
            displayCompareSaft: false,
            saftTchecks: null,
            saftCchecks: null,

            //Display connect to efatura
            displayEFatura: false,
            nif: '',
            passwordFatura: '',
            dataInicioFatura: '',
            dataFimFatura: '',
            saftID: '',



            displaySAFTRules: false

        }
    },

    beforeMount() {
        this.getCompanyData();
        this.getCompaniesToSetLayout();
        console.log(this.$route.path)
        this.path = this.$route.path
        this.saftID = this.$route.query.saftid;

    },
    methods: {
        //--------------------------------------------------------------------------~
        backButton() {
            window.location = window.location.protocol + '/companyView?id_company=' + this.id_company
        },
        backButtonMeses() {
            window.location = window.location.protocol + '/demonstracaoResultados?id_company=' + this.id_company + '&saftid=' + this.saftID
        },
        MaisDetalheButton() {
            window.location = window.location.protocol + '/demonstracaoResultadosMeses?id_company=' + this.id_company + '&saftid=' + this.saftID
        },
        backButtonPrincipal() {
            window.location = window.location.protocol + '/company'

        },
        //adicoes para SAF-T -> Lista de SAF-T
        // Metodos para demonstrar os safts da empresa e popular a tabela
        allSaftc() {
            var id_company = this.id_company
            // this.displaySAFT = true
            axios(process.env.VUE_APP_URLBack + "/saftC/getNewsaftsCAllCOMPANY", {
                headers: { id_company: id_company },
                method: 'GET'
            })
                .then(saftcFound => {
                    this.saftcs = saftcFound.data.filesSaftCfiles
                    this.loading1 = false
                })
                .catch(error => {
                    console.log("error", error.response);
                    this.error = error.response
                    console.log("error load saftcs")
                })
        },
        allSaftt() {
            var id_company = this.id_company
            // this.displaySAFT = true
            axios(process.env.VUE_APP_URLBack + "/saftT/getNewsaftsTAllCOMPANY", {
                headers: { id_company: id_company },
                method: 'GET'
            })
                .then(saftcFound => {
                    this.saftts = saftcFound.data.filesSaftTfiles
                    this.loading2 = false
                })
                .catch(error => {
                    // Request failed.
                    // console.log('error', error.response)
                    console.log("error", error.response);
                    this.error = error.response
                    console.log("error load saftcs")
                })
        },
        //Mudar para pagina balanco e demonstracao de resultados
        balancoRedirect(filename) {
            var id_company = this.id_company
            // window.location = window.location.protocol + "balanco?id_company=" + id_company + "&saftid=" + filename
            this.$router.push('/balanco?id_company=' + id_company + "&saftid=" + filename)
        },
        applyRules(filename) {
            axios({ url: process.env.VUE_APP_URLBack + '/balanco/applyNewRulesBalanco',
                                                                data: {
                                                                    id: filename
                                                                },
                                                                method: 'POST'
                                                            })
                                                                .then(resp => {
                                                                    console.log(resp)
                                                                    window.location.reload(true);
                                                                    //  this.$router.push(data.redirect ? data.redirect : "companyInfo?id_company=" + resp.data.id_company)
                                                                })
                                                                .catch(err => {
                                                                    console.log(err)
                                                                    console.log('Cannot register')
                                                                })
                                                        
        },
        demonstracaoResultadosRedirect(filename) {
            var id_company = this.id_company
            // window.location = window.location.protocol + "demonstracaoResultados?id_company=" + id_company + "&saftid=" + filename
            this.$router.push('/demonstracaoResultados?id_company=' + id_company + "&saftid=" + filename)
        },
        verListaSaft() {
            this.loading1 = true
            this.loading2 = true
            this.saftcs = null
            this.saftts = null
            this.allSaftc()
            this.allSaftt()
            this.displaySAFT = true
        },
        verListaSaftRules() {
            this.loading1 = true
            this.loading2 = true
            this.saftcs = null
            this.saftts = null
            this.allSaftc()
            this.displaySAFTRules = true
        },
         confirm(event,id) {
    	        this.$confirm.require({
					target: event.currentTarget,
					message: 'Tem a certeza que pretende aplicar a este ficheiro?',
					acceptClass: 'p-button-danger',
					accept: () => {
                        this.$toast.add({severity:'info', summary:'Confirmado', detail:'Regra apagada com sucesso', life: 3000});
                        this.applyRules(id)
					},
					reject: () => {
						this.$toast.add({severity:'error', summary:'Recusado', detail:'Recusado com sucesso', life: 3000});
					}
				});
            },
        //--------------------------------------------------------------------------
        //Fim Ver Balanco
        //--------------------------------------------------------------------------

        //Limpar Formulario de novo grafico
        clearDataDialogGraf() {
            this.tiposGrafico = null;
            this.selecionarAno = null;
            this.selecionarTipoDado = null;
            this.verificaTiposGrafico = false;
            this.verificaSelecionarAno = false;
            this.verificaSelecionarTipoDado = false;
        },
        //Limpar Formulario de novo widget
        clearDataDialogWidget() {
            this.selecionarTipoDadoInfo = null;
            this.selecionarAnoInfo1 = null;
            this.selecionarAnoInfo2 = null;
        },

        //Funcao para popular opcoes disponiveis para a empresa add ao layout
        //Substituir pela BD
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
                    } else if (response.data.msg === 'No Data, pls add') {
                        this.displayNoDataCompany = true;
                    } else {

                        this.selecionarAnos = response.data.arrayPrincipal
                        this.selecionarAnosInfo1 = response.data.arrayPrincipal
                        this.selecionarAnosInfo2 = response.data.arrayPrincipal

                        this.selecionarTipoDados = response.data.arrayData;
                        this.selecionarTipoDadosInfo = response.data.arrayData;

                    }
                })
                .catch(error => {
                    // Request failed.
                    console.log("error", error.response);
                });

            // for(let i = 0; i < this.companiesWithLayout.length; i++) {
            //     this.selecionarEmpresasAplicarLayouts.push(this.companiesWithLayout[i].name);
            // }

        },

        //---------------------------------------------------------------------
        //Adicionar Grafico novo
        submitNovoGraficoData() {
            var tipoDados = JSON.parse(JSON.stringify(this.selecionarTipoDado))
            var anosPretendidosF = [];
            var tipoDadosF = [];
            var token = this.token;

            // console.log(this.tipoGraficoSelecionado)

            //Verifica se Tipo de grafico esta selecionado
            if (this.tiposGrafico === null || this.tiposGrafico === undefined || this.tiposGrafico === "") {
                this.verificaTiposGrafico = true;
            } else {
                this.verificaTiposGrafico = false;
            }

            //Verifica qual a opcao e se tipo de anos esta selecionado
            if (this.tipoGraficoSelecionado === 'pieChart' || this.tipoGraficoSelecionado === 'doughnutChart' || this.tipoGraficoSelecionado === 'polarAreaChart') {

                if (this.selecionarAno === null || this.selecionarAno === undefined || this.selecionarAno === "" || JSON.stringify(this.selecionarAno) === "{}" || JSON.parse(JSON.stringify(this.selecionarAno)) === null) {
                    this.verificaSelecionarAno = true
                    this.$toast.add({ severity: 'error', summary: 'É necessário selecionar um ficheiro', life: 3000 });
                } else if (Object.keys(this.selecionarAno)[0].split("-")[1] === undefined) {
                    this.verificaSelecionarAno = true
                    this.$toast.add({ severity: 'error', summary: 'Apenas pode selecionar um ficheiro e não um grupo.', life: 3000 });
                } else {
                    var anosPretendidos = Object.keys(this.selecionarAno)
                    this.verificaSelecionarAno = false
                }
            } else if (this.tipoGraficoSelecionado === 'barChart' || this.tipoGraficoSelecionado === 'linearChart' || this.tipoGraficoSelecionado === 'radarChart') {

                if (this.selecionarAno === null || this.selecionarAno === undefined || this.selecionarAno === "" || JSON.stringify(this.selecionarAno) === "{}" || JSON.parse(JSON.stringify(this.selecionarAno)) === null) {
                    this.verificaSelecionarAno = true
                    this.$toast.add({ severity: 'error', summary: 'É necessário selecionar um ou mais ficheiros', life: 3000 });

                } else {
                    var anosPretendidos = Object.keys(this.selecionarAno)
                    this.verificaSelecionarAno = false
                }
            }

            //Verifica se Tipo de dados esta selecionado
            if (this.selecionarTipoDado === null || this.selecionarTipoDado[0] === undefined || this.selecionarTipoDado[0] === "") {
                this.verificaSelecionarTipoDado = true
            } else {
                this.verificaSelecionarTipoDado = false
            }

            //Verificacao final
            if (this.verificaTiposGrafico === false && this.verificaSelecionarAno === false && this.verificaSelecionarTipoDado === false) {

                for (let i = 0; i < anosPretendidos.length; i++) {
                    if (anosPretendidos[i].split("-")[1] === undefined) {
                    } else {
                        anosPretendidosF.push(anosPretendidos[i])
                    }
                }

                for (let i = 0; i < tipoDados.length; i++) {
                    // var tipoDadosS = tipoDados[i].code
                    // tipoDadosF.push(tipoDadosS[0].toLowerCase() + tipoDadosS.substring(1))
                    tipoDadosF.push(tipoDados[i].code)
                }

                var designicao1;
                if (this.designacaoGraf === "" || this.designacaoGraf === null || this.designacaoGraf === undefined) {
                    designicao1 = "default";
                } else {
                    designicao1 = this.designacaoGraf;
                }

                // anosPretendidosF.sort(function (a, b) { return a - b })
                var json = {
                    username: this.username,
                    id_company: this.id_company,
                    tipoGrafico: JSON.parse(JSON.stringify(this.tiposGrafico)).code,
                    anosPretendidosF: anosPretendidosF,
                    tipoDadosF: tipoDadosF,
                    designacao: designicao1,
                    tipo: "tipo1"
                }
                // console.log(json)
                axios({
                    method: 'post',
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
                            this.clearDataDialogGraf();
                            this.displayAddGrafico = false;
                            this.$router.go()
                        }
                    })
                    .catch(error => {
                        // Request failed.
                        console.log("error", error.response);
                    });


            }
        },
        //  altera, consoante o grafico selecionado, o menu de selecao de anos
        onChange(event) {
            this.tipoGraficoSelecionado = event.value.code
            this.selecionarAno = null;
        },

        //---------------------------------------------------------------------
        // Submeter novo widget
        submitNovoWidgetData() {
            var token = this.token;
            //Verificacao butoes
            if (this.selecionarTipoDadoInfo === null || this.selecionarTipoDadoInfo === undefined || this.selecionarTipoDadoInfo === "") {
                this.verificaTiposDadoInfo = true
            } else {
                this.verificaTiposDadoInfo = false
            }



            if (this.selecionarAnoInfo1 === null || this.selecionarAnoInfo1 === undefined || this.selecionarAnoInfo1 === "" || JSON.stringify(this.selecionarAnoInfo1) === "{}" || JSON.parse(JSON.stringify(this.selecionarAnoInfo1)) === null) {
                this.verificaSelecionarAnoInfo1 = true
                this.$toast.add({ severity: 'error', summary: 'É necessário selecionar um ficheiro', life: 3000 });
            } else if (Object.keys(this.selecionarAnoInfo1)[0].split("-")[1] === undefined) {
                this.verificaSelecionarAnoInfo1 = true
                this.$toast.add({ severity: 'error', summary: 'Apenas pode selecionar um ficheiro e não um grupo.', life: 3000 });
            } else {
                var ano1 = Object.keys(this.selecionarAnoInfo1)
                this.verificaSelecionarAnoInfo1 = false
            }

            if (this.selecionarAnoInfo2 === null || this.selecionarAnoInfo2 === undefined || this.selecionarAnoInfo2 === "" || JSON.stringify(this.selecionarAnoInfo2) === "{}" || JSON.parse(JSON.stringify(this.selecionarAnoInfo2)) === null) {
                this.verificaSelecionarAnoInfo2 = true
                this.$toast.add({ severity: 'error', summary: 'É necessário selecionar um ficheiro', life: 3000 });
            } else if (Object.keys(this.selecionarAnoInfo2)[0].split("-")[1] === undefined) {
                this.verificaSelecionarAnoInfo2 = true
                this.$toast.add({ severity: 'error', summary: 'Apenas pode selecionar um ficheiro e não um grupo.', life: 3000 });
            } else {
                var ano2 = Object.keys(this.selecionarAnoInfo2)
                this.verificaSelecionarAnoInfo2 = false
            }


            if (this.verificaTiposDadoInfo === false && this.verificaSelecionarAnoInfo1 === false && this.verificaSelecionarAnoInfo2 === false) {

                var tipoDados = JSON.parse(JSON.stringify(this.selecionarTipoDadoInfo.code))
                // var ano1 = JSON.parse(JSON.stringify(this.selecionarAnoInfo1.code))
                // var ano2 = JSON.parse(JSON.stringify(this.selecionarAnoInfo2.code))

                var designicao2;
                if (this.designacaoWidget === "" || this.designacaoWidget === null || this.designacaoWidget === undefined) {
                    designicao2 = "default";
                } else {
                    designicao2 = this.designacaoWidget;
                }

                var json = {
                    username: this.username,
                    id_company: this.id_company,
                    tipoDados: tipoDados,
                    ano1: ano1,
                    ano2: ano2,
                    designacao: designicao2,
                    tipo: "tipo2",
                    username: this.username
                }
                // console.log(json)
                axios({
                    method: 'post',
                    url: process.env.VUE_APP_URLBack + "/layout/layoutWidget",
                    headers: { token: token },
                    data: json
                })
                    .then(response => {
                        // console.log("Server Response:", response);
                        if (response.status !== 200) {
                            this.error = response;
                            return;
                        } else {
                            this.clearDataDialogWidget();
                            this.displayAddInfo = false;
                            this.$router.go()
                        }
                    })
                    .catch(error => {
                        // Request failed.
                        console.log("error", error.response);
                    });
            }
        },
        //Submeter Nova Paleta de Cores 
        submitPaletaPersonalizada() {
            if (this.selectButtonValue1 !== '' && this.selectButtonValue1 !== null && this.selectButtonValue1 !== undefined) {
                var colorPalletSelected;
                if (this.selectButtonValue1.code === "01") {
                    colorPalletSelected = this.colorSet1
                }
                if (this.selectButtonValue1.code === "02") {
                    colorPalletSelected = this.colorSet2
                }
                if (this.selectButtonValue1.code === "03") {
                    colorPalletSelected = this.colorSet3
                }
                if (this.selectButtonValue1.code === "04") {
                    colorPalletSelected = this.colorSet4
                }

                for (let i = 0; i < colorPalletSelected.length; i++) {
                    if (colorPalletSelected[i][0] === "#") {

                    } else {
                        colorPalletSelected[i] = "#" + colorPalletSelected[i]
                    }

                    if (i === colorPalletSelected.length - 1) {
                        var token = this.token;
                        var json = {
                            username: this.username,
                            id_company: this.id_company,
                            color1: colorPalletSelected[0],
                            color2: colorPalletSelected[1],
                            color3: colorPalletSelected[2],
                            color4: colorPalletSelected[3],
                            color5: colorPalletSelected[4],
                            color6: colorPalletSelected[5]
                        }

                        axios({
                            method: 'post',
                            url: process.env.VUE_APP_URLBack + "/colorPalette",
                            headers: { token: token },
                            data: json
                        })
                            .then(response => {
                                // console.log("Server Response:", response);
                                if (response.status !== 200) {
                                    this.error = response;
                                    return;
                                } else {
                                    this.clearDataDialogWidget();
                                    this.displayAddInfo = false;
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
        },

        //Get user Companies 
        getCompaniesToSetLayout() {
            axios({
                method: 'get',
                url: process.env.VUE_APP_URLBack + "/company/usersCompany",
                headers: { token: this.token },
            })
                .then(response => {
                    // console.log(response.data.company)
                    for (let i = 0; i < response.data.company.length; i++) {
                        if (response.data.company[i].id_company !== this.id_company) {
                            this.selecionarEmpresasAplicarLayouts.push({ "name": response.data.company[i].name, "id_company": response.data.company[i].id_company })
                        }
                    }

                    if (response.status !== 200) {
                        this.error = response;
                        return;
                    }
                })
                .catch(error => {
                    // Request failed.
                    console.log("error", error.response);
                });
        },
        //Share Layout
        submitShareLayout() {
            //Verifica se empresa esta selecionada
            if (this.empresasSelecionadasAplicarLayout === null || this.empresasSelecionadasAplicarLayout === undefined || this.empresasSelecionadasAplicarLayout === "" || this.empresasSelecionadasAplicarLayout[0] === undefined || this.empresasSelecionadasAplicarLayout[0] === null) {
                this.verificarPartilhaLayout = true;
            } else {
                this.verificarPartilhaLayout = false;
            }

            if (this.verificarPartilhaLayout === false) {
                var json = {
                    username: this.username,
                    id_company1: this.id_company,
                    id_company2: this.empresasSelecionadasAplicarLayout[0].id_company
                }

                axios({
                    method: 'post',
                    url: process.env.VUE_APP_URLBack + "/layout/setCopyLayout",
                    headers: { token: this.token },
                    data: json
                })
                    .then(response => {
                        // console.log("Server Response:", response);
                        if (response.status !== 200) {
                            this.error = response;
                            return;
                        } else {
                            this.empresasSelecionadasAplicarLayout = null;
                            this.displayShareLayout = false;
                            this.$toast.add({ severity: 'success', summary: 'Layout aplicado com sucesso', detail: 'O layout foi aplicado à empresa: ' + this.empresasSelecionadasAplicarLayout[0].name, life: 3000 });
                        }
                    })
                    .catch(error => {
                        // Request failed.
                        console.log("error", error.response);
                    });
            }
        },

        //---------------------------
        //
        //---------------------------
        //Upload new File
        newSubmitFileSAFTC(event) {
            this.progressC = true
            let data = Date.now().toString()
            let file = event.files[0];

            let formData = new FormData();
            const username = this.username;
            var token = this.token
            formData.append("id_company", this.id_company)
            formData.append("file", file);
            if (this.file == "") {
                console.log("fail");
            }
            axios.post(process.env.VUE_APP_URLBack + "/saftC/uploadFileS3", formData, {
                headers: {
                    token: token,
                    id_company: this.id_company,
                    username: username,
                    file: file
                }
            }).then(resp => {
                this.fileDRandBalanco = resp.data.file
                this.valueProgressC = 30
                if (resp.data.success == true) {
                    this.sleep(6000).then(() => {
                        this.newFunc()
                    }
                    )
                }
                //alert("Calculating balance and DR")

                // window.location.reload(true);
            })
                .catch(err => {
                    console.log(err);
                    console.log("Cannot register", err);
                });
        },
        sleep(time) {
            return new Promise((resolve) => setTimeout(resolve, time));
        },
        // upload saft T
        newSubmitFileSAFTT(event) {
            let data = Date.now().toString()
            // this.files = event.files
            let file2 = event.files[0];
            //var token = JSON.parse(localStorage.getItem("token"));



            let formData = new FormData();
            const username = this.username;
            // console.log(file2)
            //var token = JSON.parse(localStorage.getItem("token"));
            var token = this.token
            formData.append("id_company", this.id_company)
            formData.append("file", file2);
            if (this.file2 == "") {
                // console.log("fail");
            }
            axios.post(process.env.VUE_APP_URLBack + "/saftT/uploadFileS3", formData, {
                headers: {
                    token: token,
                    id_company: this.id_company,
                    username: username,
                    file: file2
                }
            }).then(resp => {
                // console.log(resp);
                // console.log("UPLOADED WITH SUCESS")
                window.location.reload(true);
            })
                .catch(err => {
                    console.log(err);
                    console.log("Cannot register", err);
                });

        },
        newFunc() {
            this.valueProgressC = 40
            this.sleep(1000).then(() => {
                this.valueProgressC = 55
                axios.get(process.env.VUE_APP_URLBack + '/balanco/checkBalanceFile/' + this.fileDRandBalanco)
                    .then(resp => {
                        this.valueProgressC = 60
                        this.sleep(2000).then(() => {
                            axios.get(process.env.VUE_APP_URLBack + '/demonstracaoResultados/checkDRFile/' + this.fileDRandBalanco)
                                .then(resp => {
                                    this.sleep(2000).then(() => {
                                        axios.get(process.env.VUE_APP_URLBack + '/demonstracaoResultados/vendasServicosFile/' + this.fileDRandBalanco)
                                            .then(resp => {
                                                this.sleep(2000).then(() => {
                                                    axios.get(process.env.VUE_APP_URLBack + '/demonstracaoResultados/vendasServicosFile/' + this.fileDRandBalanco)
                                                        .then(resp => {
                                                            this.valueProgressC = 80
                                                            axios({
                                                                url: process.env.VUE_APP_URLBack + '/racios/getRacios',
                                                                data: {
                                                                    file: this.fileDRandBalanco
                                                                },
                                                                method: 'POST'
                                                            })
                                                                .then(resp => {
                                                                    this.valueProgressC = 90
                                                                    console.log(resp)
                                                                    window.location.reload(true);
                                                                    //  this.$router.push(data.redirect ? data.redirect : "companyInfo?id_company=" + resp.data.id_company)
                                                                })
                                                                .catch(err => {
                                                                    console.log(err)
                                                                    console.log('Cannot register', data, token)
                                                                })
                                                        })
                                                        .catch(err => {
                                                            commit('AUTH_ERROR')
                                                            console.log(err)
                                                            reject(err)
                                                            console.log('Cannot register', data, token)
                                                        })
                                                })
                                            })
                                            .catch(err => {
                                                commit('AUTH_ERROR')
                                                console.log(err)
                                                reject(err)
                                                console.log('Cannot register', data, token)
                                            })
                                    })
                                })
                                .catch(err => {
                                    commit('AUTH_ERROR')
                                    console.log(err)
                                    reject(err)
                                    console.log('Cannot register', data, token)
                                })
                        })
                    })
            })
        },
        format_date(value) {
            if (value) {
                return moment(String(value)).format('YYYY-MM-DD')
            }
        },
        closeUploadDisplay() {
            this.displayNewUpload = false;
            // this.displaySAFT = false
            // this.loading1 = true
            // this.loading2 = true
            // this.displayCompare = false
        },

        //Compare saft
        getValidSaftCs1() {
            // console.log(this.saftTchecks)
            localStorage.setItem('compareSaftC', JSON.stringify(this.saftCchecks.data.name_file))
            // console.log('teste compareSaftC' + localStorage.getItem('compareSaftC'))
            localStorage.setItem('compareSaftT', JSON.stringify(this.saftTchecks.data.name_file))
            store.commit('COMPARE_SAFTC', this.saftCchecks.data.name_file)
            store.commit('COMPARE_SAFTT', this.saftTchecks.data.name_file)

            var dates = [this.saftCchecks.data.startDate, this.saftTchecks.data.startDate, this.saftCchecks.data.endDate, this.saftTchecks.data.endDate],
                earliest = dates.reduce(function (pre, cur) {
                    return Date.parse(pre) > Date.parse(cur) ? cur : pre;
                });

            var dates = [this.saftCchecks.data.startDate, this.saftTchecks.data.startDate, this.saftCchecks.data.endDate, this.saftTchecks.data.endDate],
                latest = dates.reduce(function (pre, cur) {
                    return Date.parse(pre) < Date.parse(cur) ? cur : pre;
                });
            var faturafim = new Date(new Date(latest).setDate(new Date(latest).getDate() + 1))
            let dataFimFaturaComparacaoSAFT = faturafim.toISOString().substr(0, 10);

            var faturainicio = new Date(new Date(earliest).setDate(new Date(earliest).getDate() - 1))
            let dataInicioFaturaComparacaoSAFT = faturainicio.toISOString().substr(0, 10);

            // console.log("earlieste", dataInicioFaturaComparacaoSAFT, "latest", dataFimFaturaComparacaoSAFT);
            // window.location = window.location.protocol + 'compareSaft?id_company=' + this.id_company + '&dataInicio=' + dataInicioFaturaComparacaoSAFT + '&dataFim=' + dataFimFaturaComparacaoSAFT
            this.$router.push('compareSaft?id_company=' + this.id_company + '&dataInicio=' + dataInicioFaturaComparacaoSAFT + '&dataFim=' + dataFimFaturaComparacaoSAFT)


            /**
             var faturafim = new Date(new Date(this.dataFimFaturaComparacaoSAFT).setDate(new Date(this.dataFimFaturaComparacaoSAFT).getDate() + 1))
            let dataFimFaturaComparacaoSAFT = faturafim.toISOString().substr(0, 10);
            var faturainicio = new Date(new Date(this.dataInicioFaturaComparacaoSAFT).setDate(new Date(this.dataInicioFaturaComparacaoSAFT).getDate() - 1))
            let dataInicioFaturaComparacaoSAFT = faturainicio.toISOString().substr(0, 10);
            let idCompany = this.id_company
            store.dispatch('getValidSaftCs1', {idCompany,dataInicioFaturaComparacaoSAFT, dataFimFaturaComparacaoSAFT})
            .then(() => {
            console.log('testeComparacao')  
            //  this.$router.push('/compareSaft')
            })
            .catch(err => console.log(err))
            */
        },
        verCompareSaft() {
            this.loading1 = true
            this.loading2 = true
            this.saftcs = null
            this.saftts = null
            this.allSaftc()
            this.allSaftt()
            this.displayCompareSaft = true
        },
        rulesBalanco() {
            window.location = window.location.protocol + 'rulesCompany?id_company=' + this.id_company
        },

        //Connect to Efatura
        verificarFaturas() {
            let nifFatura = this.nif;
            let passwordFatura = this.passwordFatura
            let dataFimFaturaYear = this.dataFimFatura.getYear();
            let dataInicioFaturaYear = this.dataInicioFatura.getYear();
            console.log(this.dataFimFatura.getMonth() == '12' && this.dataFimFatura.getDay() == '31')
            if (this.dataFimFatura.getMonth() == '12' && this.dataFimFatura.getDay() == '31') {
                this.dataFimFatura.setDate(30)
            }
            let dataFimFatura = this.format_date(this.dataFimFatura)
            let dataInicioFatura = this.format_date(this.dataInicioFatura)
            if (dataInicioFaturaYear != dataFimFaturaYear) {
                alert("Please select same year!")
            } else if (dataInicioFatura <= dataInicioFatura) {
                let idCompany = this.id_company
                store.dispatch('verificarFaturas', { nifFatura, passwordFatura, dataFimFatura, dataInicioFatura, idCompany })
                    .then(() => {
                        // console.log('teste')
                        this.$router.push('/fatura')
                    })
                    .catch(err => console.log(err))
            }
        }
    }
}
</script>
