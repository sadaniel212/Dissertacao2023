<template>

	<div class="p-grid">
        				<Toast />
      
		<div class="p-col-12">
            <BarraMenu :id_company="id_company"></BarraMenu>
			<div class="card">
                    
				 <ConfirmPopup></ConfirmPopup>
				<DataTable :value="rulesType" v-model:expandedRows="expandedRows" dataKey="nome" responsiveLayout="scroll" @rowExpand="onRowExpand" @rowCollapse="onRowCollapse" sortMode="multiple" :multiSortMeta="multiSortMeta">
					
					<Column :expander="true" headerStyle="width: 3rem" />
					<Column field="Tipo" header="Tipo" >
						<template #body="slotProps">
							{{nomeTipoBalanco(slotProps.data.tipoBalanco)}}
						</template>
					</Column>
                    <Column field="Nome" header="Nome" >
						<template #body="slotProps">
							{{nomeTipo(slotProps.data.nome)}}
						</template>
					</Column>
					<template #expansion="slotProps">
						<div class="orders-subtable">
                            <div class="p-grid"> 
                                <div class="p-col-10">
							        <h5>Regras para {{nomeTipo(slotProps.data.nome)}}</h5>
                                </div>
                                <div class="p-col-2">
                                    <Button label="Adicionar Regra" class="p-button-rounded"  @click="openAdicionarRegra(slotProps)" />
                                </div>
                            </div>
                            
							<DataTable :value="accounts" responsiveLayout="scroll" >
								
								<Column field="account" :header="'Account'">
									<template #body="slotProps">
										<b> Account: </b>
										{{slotProps.data.account_id}} 
									</template>
								</Column>
                                <Column field="account" :header="'Regra'">
									<template #body="slotProps">
										<b> Regra: </b>
										{{nomeRegras(slotProps.data.regra) }} 
									</template>
								</Column>
                                <Column field="account" :header="'Regra'">
									<template #body="slotProps">
										
										{{AdicionarRemover(slotProps.data.regra[0].AdicionarFinal)}} 
									</template>
								</Column>
                                <Column field="account" :header="'Regra'">
									<template #body="slotProps">
                                        <Button icon="pi pi-file-edit" class="p-button-rounded p-button-info" @click="openEditRegra(slotProps)"/>
                                        &nbsp;
                                        <Button icon="pi pi-times" class="p-button-rounded p-button-danger" @click="confirm($event,slotProps.data._id)"/>
									</template>
								</Column>
							</DataTable>
						</div>
					</template>
				</DataTable>
                <div >
            <Dialog header="Editar Regra" v-model:visible="displayEditRegra" :breakpoints="{'1000px': '75vw'}" :style="{width: '25vw'}" :modal="true">
                <div class="p-grid p-fluid">
                    <div class="p-col-12 p-md-12">
                            <div class="p-grid p-formgrid">
                            <div class="p-col-12 p-mb-2 p-lg-12 p-mb-lg-0">
                                        Número da conta: <br>
                                        <span class="p-input-icon-left">
                                            <i class="pi pi-list" />
                                            <InputText class="p-inputtext" type="text" :required="true" v-model="account_idEdit"/>
                                        </span>
                                        <div class="p-col-12 "> <br></div>
                                    </div>
                                    <div class="p-col-12 p-mb-2 p-lg-12 p-mb-lg-0">
                                       1º Valor:
                                        <span class="p-input-icon-left">
                                            <Dropdown v-model="selectedValor1" :options="valores1" optionLabel="name"  />
                                            </span>
                                    <div class="p-col-12 "> <br></div>
                                    </div>
                                    <div class="p-col-12 p-mb-2 p-lg-12 p-mb-lg-0">
                                        Operção:
                                        <span class="p-input-icon-left">
                                            <Dropdown v-model="selectedOperacao" :options="operacao" optionLabel="name"  />
                                        </span>
                                        <div class="p-col-12 "> <br></div>
                                    </div>
									<div class="p-col-12 p-mb-2 p-lg-12 p-mb-lg-0">
                                       2º Valor:
                                        <span class="p-input-icon-left">
                                            <Dropdown v-model="selectedValor2" :options="valores2" optionLabel="name"  />
                                        </span>
                                        <div class="p-col-12 "> <br></div>
                                    </div>
                                    <div class="p-col-12 p-mb-2 p-lg-12 p-mb-lg-0">
                                       Condição: <br>
                                        <span class="p-input-icon-left">
                                            <Dropdown v-model="selectedComparacao" :options="comparacao" optionLabel="name"  />
                                        </span>
                                        <div class="p-col-12 "> <br></div>
                                    </div>
                                    <div v-if="selectedComparacao.code != 'Sem Comparacao'" class="p-col-12 p-mb-2 p-lg-12 p-mb-lg-0">
                                        Valor a comparar: <br>
                                        <span class="p-input-icon-left">
                                            <InputText class="p-inputtext" type="text" :required="true" v-model="valorComparar"/>
                                        </span>
                                        <div class="p-col-12 "> <br></div>
                                    </div>
                                    <div class="p-col-12 p-mb-2 p-lg-12 p-mb-lg-0">
                                       Adicionar ou Subtrair ao valor final: <br>
                                        <span class="p-input-icon-left">
                                            <Dropdown v-model="selectedAdicionarFinal" :options="adicionarFinal" optionLabel="name"  />
                                        </span>
                                        <div class="p-col-12 "> <br></div>
                                    </div>
                                  
                                 
                                </div>
                            </div>
                        </div>
						<template #footer>
                                <Button type="submit" @click="updateRegra" label="Editar Regra" icon="pi pi-check" />
                                <Button label="Cancelar" @click="close" icon="pi pi-times" class="p-button-secondary"/>
                            </template>
                        </Dialog>
					
	           
            <Dialog header="Adicionar Regra" v-model:visible="displayAdicionarRegra" :breakpoints="{'1000px': '75vw'}" :style="{width: '25vw'}" :modal="true">
                <Toast group='addRule' />
                <div class="p-grid p-fluid">
                    <div class="p-col-12 p-md-12">
                            <div class="p-grid p-formgrid">
                            <div class="p-col-12 p-mb-2 p-lg-12 p-mb-lg-0">
                                        Número da conta: <br>
                                        <span class="p-input-icon-left">
                                            <i class="pi pi-list" />
                                            <InputText placeholder="Insira o numero da conta" class="p-inputtext" type="text" :required="true" v-model="account_idEdit"/>
                                        </span>
                                        <div class="p-col-12 "> <br></div>
                                    </div>
                                    <div class="p-col-12 p-mb-2 p-lg-12 p-mb-lg-0">
                                       1º Valor:
                                        <span class="p-input-icon-left">
                                            <Dropdown v-model="selectedValor1" :options="valores1" optionLabel="name"  />
                                            </span>
                                    <div class="p-col-12 "> <br></div>
                                    </div>
                                    <div class="p-col-12 p-mb-2 p-lg-12 p-mb-lg-0">
                                        Operção:
                                        <span class="p-input-icon-left">
                                            <Dropdown v-model="selectedOperacao" :options="operacao" optionLabel="name"  />
                                        </span>
                                        <div class="p-col-12 "> <br></div>
                                    </div>
									<div class="p-col-12 p-mb-2 p-lg-12 p-mb-lg-0">
                                       2º Valor:
                                        <span class="p-input-icon-left">
                                            <Dropdown v-model="selectedValor2" :options="valores2" optionLabel="name"  />
                                        </span>
                                        <div class="p-col-12 "> <br></div>
                                    </div>
                                    <div class="p-col-12 p-mb-2 p-lg-12 p-mb-lg-0">
                                       Condição: <br>
                                        <span class="p-input-icon-left">
                                            <Dropdown v-model="selectedComparacao" :options="comparacao" optionLabel="name"  />
                                        </span>
                                        <div class="p-col-12 "> <br></div>
                                    </div>
                                    <div v-if="selectedComparacao.code != 'Sem Comparacao'" class="p-col-12 p-mb-2 p-lg-12 p-mb-lg-0">
                                        Valor a comparar: <br>
                                        <span class="p-input-icon-left">
                                            <InputText class="p-inputtext" type="text" :required="true" v-model="valorComparar"/>
                                        </span>
                                        <div class="p-col-12 "> <br></div>
                                    </div>
                                    <div class="p-col-12 p-mb-2 p-lg-12 p-mb-lg-0">
                                       Adicionar ou Subtrair ao valor final: <br>
                                        <span class="p-input-icon-left">
                                            <Dropdown v-model="selectedAdicionarFinal" :options="adicionarFinal" optionLabel="name"  />
                                        </span>
                                        <div class="p-col-12 "> <br></div>
                                    </div>
                                </div>
                            </div>
                        </div>
						<template #footer>
                                <Button type="submit" @click="addRegra" label="Editar Regra" icon="pi pi-check" />
                                <Button label="Cancelar" @click="close" icon="pi pi-times" class="p-button-secondary"/>
                            </template>
            </Dialog>
					
	                </div>
			</div>
		</div>
	</div>
</template>

<script>
    import BarraMenu from '../components/BarraMenu.vue';

    import axios from 'axios'
    import {store} from '../store'
	import {FilterMatchMode,FilterOperator} from 'primevue/api';
    import { compile } from 'vue';
    import Dropdown from 'primevue/dropdown';

	export default {
		data() {
			return {
                id_company: '',
                rulesPassivo:'',
                rules:[{"tipoBalanco":"Ativo", "_id": "activo", "rules": []}, {"tipoBalanco":"Passivo", "_id": "passivo", "rules": []}, {"tipoBalanco":"Capital Próprio" , "_id": "capitalProprio", "rules": []}],
                rulesType: null,
                accounts: null,
                multiSortMeta: [
                            {field: 'tipoBalanco', order: 1},
                        ],

                
				params: '',
                display: false,
                
				loading1: true,
				loading2: true,
				idFrozen: false,
				expandedRows: [],
				minDate: null,
			
                id : "",
				token: "",
                nome: "",
                nif:"",

                nomeAddRegra: "",
                tipoBalancoAddRegra: "",
                displayAdicionarRegra: false,
                displayEditRegra: false,
                editRegra: null,
                account_idEdit: "",
                valorComparar: 0,
                selectedValor1:  null,
                valores1: [
                    {name: 'Débito', code: 'debito'},
                    {name: 'Crédito', code: 'credito'}
                ],
                selectedValor2:  null,
                valores2: [
                    {name: 'Débito', code: 'debito'},
                    {name: 'Crédito', code: 'credito'}
                ],
                selectedOperacao:  null,
                operacao: [
                    {name: 'Substrair', code: '-'},
                    {name: 'Somar', code: '+'}
                ],
                selectedComparacao:   {name: 'Sem Comparação', code: 'Sem Comparacao'},
                comparacao: [
                    {name: 'Sem Comparação', code: 'Sem Comparacao'},
                    {name: '>', code: '>'},
                    {name: '<', code: '<'}
                ],
                selectedAdicionarFinal:  null,
                adicionarFinal: [
                    {name: 'Adicionar', code: true},
                    {name: 'Subtrair', code: false}
                ]
				
				
			}
		},
		created() {
			
		},
		mounted() {
           this.id_company = this.$route.query.id_company;

            this.token = JSON.parse(localStorage.getItem("token"));
             axios({
						url: process.env.VUE_APP_URLBack + '/company/listCompanyBalancoRules',
						data: {
                            id_company: this.id_company
						},
						method: 'POST'
						})
					.then(data => {
                        
						this.rulesType = data.data.rules;
						
					});
		
		},
		methods: {
            nomeTipoBalanco(string) {
				if ("activo" == string){
                    return "Ativo"
                }else if ("capitalProprio" == string){
                    return "Capital Próprio"
                }else if ("passivo" == string){
                    return "Passivo"
                }

            },
            nomeTipoValor(string) {
				if ("credito" == string){
                    return "Crédito"
                }else if ("debito" == string){
                    return "Débito"
                }
            },
            nomeTipoOperacao(string) {
				if ("-" == string){
                    return "Substrair"
                }else if ("+" == string){
                    return "Somar"
                }
            },
            nomeTipoComparação(string) {
				if ("Sem Comparacao" == string){
                    return "Sem Comparação"
                }else {
                    return string
                }
            },
            adicionarFinalNome(string) {
				if (true == string){
                    return "Adicionar"
                }else {
                    return "Subtrair"
                }
            },
            nomeTipo(string) {
				if ("somaResultadoLiquido" == string){
                    return "Resultados Liquidos"
                }else if ("somaCapitalSubscrito" == string){
                    return "Capital Subscrito"
                }else if ("somaActivoFixoTantigiveis" == string){
                    return "Ativo fixo tangivel"
                }else if ("somaProvisoes" == string){
                    return "Provisões"
                }else if ("somaReservasLegais" == string){
                    return "Reservas legais"
                }else if ("somaActivoFixoIntantigiveis" == string){
                    return "Ativo fixo Intangivel"
                }else if ("somaPassivosImpDiferidos" == string){
                    return "Passivos por Impostos Diferidos	"
                }else if ("somaOutrasReservas" == string){
                    return "Outras Reservas	"
                }else if ("somaParticipacoesFinanceiras" == string){
                    return "Participações financeiras"
                }else if ("somaResponsabilidade" == string){
                    return "Responsabilidade por Beneficios Pós-emprego	"
                }else if ("somaResultadosTransitados" == string){
                    return "Resultados Transitados"
                }else if ("somaOutrosInvestimentosFinanceiros" == string){
                    return "Outros Investimentos Financeiros	"
                }else if ("somaFornecedores" == string){
                    return "Fornecedores"
                }else if ("somaAjustamentoCP" == string){
                    return "Ajustamentos Capital Proprio"
                }else if ("somaAdiamentoClientes" == string){
                    return "Adiamento de Clientes	"
                }else if ("somaTotalClientes" == string){
                    return "Clientes"
                }else if ("somaEstadosOutrosPassivoCorrente" == string){
                    return "Estado e Outros Publicos	"
                }else if ("somaOutrosCreditosFinanceiros" == string){
                    return "Outros Créditos Financeiros	"
                }else if ("somaFinanciamentoObtidosCorrente" == string){
                    return "Financimento Obtidos	"
                }else if ("somaDiferimentos" == string){
                    return "Diferimentos"
                }else if ("somaOutrasDividas" == string){
                    return "Outras Dividas a Pagar	"
                }else if ("somaAtivoNCorrentesVenda" == string){
                    return "Ativos não correntes detidos para venda	"
                }else if ("somaDiferimentosPassivoCorrente" == string){
                    return "Diferimentos Passivo	"
                }else if ("somaCaixaDepositosBancarios" == string){
                    return "Caixa depósitos bancários	"
                }else if ("somaActivosFinanceiros" == string){
                    return "Activos financeiros	"
                }else if ("somaEstadosOutros" == string){
                    return "Estados e outros"
                }

            },
            AdicionarRemover(string) {
				if (true == string){
                    return "Adicionar"
                }else {
                    return "Subtrair"
                }
            },
            nomeRegras(regras) {
				if (regras[0].condicao == "Sem Comparacao"){
                    return (regras[0].valor1+ " " + regras[0].operacao+ " " + regras[0].valor2)
                }else{
                    return regras[0].valor1 +" " + regras[0].operacao+" " + regras[0].valor2 +" "+ regras[0].condicao+" " + regras[0].valorComprar1
                }

			},
			onRowExpand(event) {
                this.expandedRows =  this.rulesType.filter(p => p._id == event.data._id);
                 axios({
						url: process.env.VUE_APP_URLBack + '/company/listCompanyBalancoRulesAccounts',
						data: {
                            id_company: this.id_company,
                            nome : event.data.nome
						},
						method: 'POST'
						})
					.then(data => {
                        
						this.accounts = data.data.rules;
						
					});
            
				this.$toast.add({severity: 'info', summary: 'Regra expandida', detail: this.nomeTipo(event.data.nome), life: 3000});
			},
			onRowCollapse(event) {
				this.$toast.add({severity: 'success',  summary: 'Regra recolhida', detail: this.nomeTipo(event.data.nome), life: 3000});
			},
			confirm2(event,id) {
    	        this.$confirm.require({
					target: event.currentTarget,
					message: 'Tem a certeza que deseja apagar?',
					acceptClass: 'p-button-danger',
					accept: () => {
						this.$toast.add({severity:'info', summary:'Confirmado', detail:'Agendamento apagado', life: 3000});
						console.log(id)
					},
					reject: () => {
						this.$toast.add({severity:'error', summary:'Recusado', detail:'Recusado com sucesso', life: 3000});
					}
				});
            },
            openEditRegra(regra) {
                this.displayEditRegra = true;
                this.editRegra = regra.data
                this.account_idEdit = regra.data.account_id
                this.valorComparar = regra.data.regra[0].valorComprar1
                var name = this.nomeTipoValor(this.editRegra.regra[0].valor1)
                var name2 = this.nomeTipoValor(this.editRegra.regra[0].valor2)
                var operação = this.nomeTipoOperacao(this.editRegra.regra[0].operacao)
                var comparacao = this.nomeTipoComparação(this.editRegra.regra[0].condicao)
                var adicionarFinal = this.adicionarFinalNome(this.editRegra.regra[0].AdicionarFinal)
                this.selectedValor1 = {"name":   name, "code":  this.editRegra.regra[0].valor1}
                this.selectedValor2 = {"name":   name2, "code":  this.editRegra.regra[0].valor2}
                this.selectedOperacao = {"name":   operação, "code":  this.editRegra.regra[0].operacao}
                this.selectedComparacao = {"name":   comparacao, "code":  this.editRegra.regra[0].condicao}
                this.selectedAdicionarFinal = {"name":   adicionarFinal, "code":  this.editRegra.regra[0].AdicionarFinal}

                
            },
            openAdicionarRegra(regra) {
                this.displayAdicionarRegra = true;
                this.nomeAddRegra = regra.data.nome
                this.tipoBalancoAddRegra = regra.data.tipoBalanco
               console.log(regra)                
            },
            updateRegra() {
               var editRegraFinal = { 
                    "account_id": this.account_idEdit ,
                        "regra": [{
                            "valor1": this.selectedValor1.code,
                            "operacao":  this.selectedOperacao.code,
                            "valor2": this.selectedValor2.code,
                            "condicao":  this.selectedComparacao.code,
                            "valorComprar1": this.valorComparar,
                            "AdicionarFinal": this.selectedAdicionarFinal.code
                        }]
                }
                var _idAccount = this.editRegra._id
                var id_company = this.id_company
				store.dispatch('updateRegra', { id_company, _idAccount, editRegraFinal })
					.then(() => {

					})
					.catch(err => console.log(err))
            },
            addRegra() { 
                if (this.account_idEdit == null || this.selectedValor1 == null || this.selectedValor2 == null || this.selectedOperacao == null || this.selectedComparacao == null || this.selectedAdicionarFinal == null ){
                        this.$toast.add({severity:'error', summary:'Erro', detail:'Preencha os campos todos e tente outra vez!', life: 4000 , group: 'addRule'})
                }else{
                    var addRegraFinal = { 
                        "account_id": this.account_idEdit ,
                            "regra": [{
                                "valor1": this.selectedValor1.code,
                                "operacao":  this.selectedOperacao.code,
                                "valor2": this.selectedValor2.code,
                                "condicao":  this.selectedComparacao.code,
                                "valorComprar1": this.valorComparar,
                                "AdicionarFinal": this.selectedAdicionarFinal.code
                            }]
                    }
                    var id_company = this.id_company
                    var nome = this.nomeAddRegra
                    var tipoBalanco = this.tipoBalancoAddRegra
                    store.dispatch('addRegra', { id_company, nome, tipoBalanco, addRegraFinal })
                        .then(() => {

                        })
                        .catch(err => 
                            this.$toast.add({severity:'error', summary:'Confirmado', detail:'Preencha os campos todos e tente outra vez!', life: 3000})
                        )
                }
               
            },
            confirm(event,id) {
    	        this.$confirm.require({
					target: event.currentTarget,
					message: 'Tem a certeza que deseja eliminar esta regra?',
					acceptClass: 'p-button-danger',
					accept: () => {
                        this.$toast.add({severity:'info', summary:'Confirmado', detail:'Regra apagada com sucesso', life: 3000});
                        this.removeRegra(id)
					},
					reject: () => {
						this.$toast.add({severity:'error', summary:'Recusado', detail:'Recusado com sucesso', life: 3000});
					}
				});
            },
            removeRegra(id) {
               var account_idObject = id
                var id_company = this.id_company
				store.dispatch('removeRegra', { id_company, account_idObject })
					.then(() => {

					})
					.catch(err => console.log(err))
            },
            close() {
                this.displayEditRegra = false;
                this.displayAdicionarRegra = false
			},
			
		},components: {
        BarraMenu,
    }
	}
</script>

<style scoped lang="scss">
	::v-deep(.p-datatable-frozen-tbody) {
		font-weight: bold;
	}

	::v-deep(.p-datatable-scrollable .p-frozen-column) {
		font-weight: bold;
	}

	::v-deep(.p-progressbar) {
		height: .5rem;
		background-color: #D8DADC;

		.p-progressbar-value {
			background-color: #607D8B;
		}
	}

	.p-datatable .p-column-filter {
		display: none;
	}

	.table-header {
		display: flex;
		justify-content: space-between;
	}

	::v-deep(.p-datatable.p-datatable-customers) {
		.p-datatable-header {
			padding: 1rem;
			text-align: left;
			font-size: 1.5rem;
		}

		.p-paginator {
			padding: 1rem;
		}

		.p-datatable-thead > tr > th {
			text-align: left;
		}

		.p-datatable-tbody > tr > td {
			cursor: auto;
		}

		.p-dropdown-label:not(.p-placeholder) {
			text-transform: uppercase;
		}
	}

	/* Responsive */
	.p-datatable-customers .p-datatable-tbody > tr > td .p-column-title {
		display: none;
	}


	.p-progressbar-value.ui-widget-header {
		background: #607d8b;
	}

	@media (max-width: 640px) {
		.p-progressbar {
			margin-top: .5rem;
		}
	}

	.product-image {
		width: 100px;
		box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)
	}

	.orders-subtable {
		padding: 1rem;
	}

	.product-badge {
		border-radius: 2px;
		padding: .25em .5rem;
		text-transform: uppercase;
		font-weight: 700;
		font-size: 12px;
		letter-spacing: .3px;

		&.status-green {
			background: #C8E6C9;
			color: #256029;
		}

		&.status-red {
			background: #FFCDD2;
			color: #C63737;
		}

		&.status-lowstock {
			background: #FEEDAF;
			color: #8A5340;
		}
	}

	.order-badge {
		border-radius: 2px;
		padding: .25em .5rem;
		text-transform: uppercase;
		font-weight: 700;
		font-size: 12px;
		letter-spacing: .3px;

		&.order-TRUE {
			background: #C8E6C9;
			color: #256029;
		}

		&.order-cancelled {
			background: #FFCDD2;
			color: #C63737;
		}

		&.order-pending {
			background: #FEEDAF;
			color: #8A5340;
		}

		&.order-returned {
			background: #ECCFFF;
			color: #694382;
		}
	}

	@media screen and (max-width: 960px) {
		::v-deep(.p-datatable) {
			&.p-datatable-customers {
				.p-datatable-thead > tr > th,
				.p-datatable-tfoot > tr > td {
					display: none !important;
				}

				.p-datatable-tbody > tr {
					border-bottom: 1px solid var(--surface-d);

					> td {
						text-align: left !important;
						display: block;
						border: 0 none !important;
						width: 100% !important;
						float: left;
						clear: left;
						border: 0 none;

						.p-column-title {
							padding: .4rem;
							min-width: 30%;
							display: inline-block;
							margin: -.4rem 1rem -.4rem -.4rem;
							font-weight: bold;
						}

						.p-progressbar {
							margin-top: .5rem;
							display: inline-block;
							width: 60%;
						}

						.p-rating {
							display: inline-block;
						}
					}
				}

				.p-datatable-tbody > tr.p-rowgroup-footer{
					display: flex;
				}
			}
		}
	}

	.true-icon {
		color: #256029;
	}

	.false-icon {
		color: #C63737;
	}
</style>
