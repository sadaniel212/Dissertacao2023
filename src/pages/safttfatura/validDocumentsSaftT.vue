<template>
	<div class="p-grid p-fluid">

	<div >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
		<div class="p-col-11">

			<div class="">
				<DataTable :value="company" v-model:expandedRows="expandedRows" dataKey="nifEmitente" responsiveLayout="scroll" @rowExpand="onRowExpand" @rowCollapse="onRowCollapse">
					<!-- <template #header>
						<div class="table-header-container">
							<Button icon="pi pi-plus" label="Expand All" @click="expandAll" class="p-mr-2 p-mb-2" />
							<Button icon="pi pi-minus" label="Collapse All" @click="collapseAll" class="p-mb-2" />
						</div>
					</template> -->
					<Column :expander="true" headerStyle="width: 3rem" />
					<Column  field="nome" header="Nome" :sortable="true">
						<template #body="slotProps">
							<span class="p-column-title">Nome da empresa</span>
							<p>{{slotProps.data.nomeEmitente}}</p>
						</template>
					</Column>
                    <Column  field="NIF" header="NIF" :sortable="true">
						<template #body="slotProps">
							<span class="p-column-title">NIF</span>
							<p>{{slotProps.data.nifEmitente}}</p>
						</template>
					</Column>
					<Column field="numero_faturas" header="Nº de faturas da empresa" >
						<template #body="slotProps">
                            <div v-if="slotProps.data.numero_faturasNotFound != 0" >
								<p  class="product-badge status-red"> {{slotProps.data.numero_faturas}} </p>
                            </div>
							<div v-else class="stock">
								<p class=" product-badge status-green">{{slotProps.data.numero_faturas}} </p>
                            </div>
						</template>
                        
					</Column>
                    <Column field="numero_faturasNotFound" header="Nº de faturas sem comparação" :sortable="true">
						<template #body="slotProps">
                            <div v-if="slotProps.data.numero_faturasNotFound != 0" >
								<p  class="product-badge status-red"> {{slotProps.data.numero_faturasNotFound}} </p>
                            </div>
							<div v-else class="stock">
								<p class=" product-badge status-green">{{slotProps.data.numero_faturasNotFound}} </p>

                            </div>
						</template>
					</Column>
					<template #expansion="slotProps">
						<div class="orders-subtable">
							<h5>Invoices of {{slotProps.data.nomeEmitente}}</h5>
							<DataTable :value="slotProps.data.documentos" responsiveLayout="scroll">
									<Column field="searchDocumentId" header="Document ID" :sortable="true">
										<template #body="slotProps">
											<p>{{slotProps.data.document_id}}</p>
										</template>
									</Column>
									<Column field="nifEmitente" header="Issuer NIF" :sortable="true" >
										<template #body="slotProps">
											{{slotProps.data.nifEmitente}}
										</template>
									</Column>
									<Column field="nomeEmitente" header="Issuer name" :sortable="true">
										<template #body="slotProps">
											{{slotProps.data.nomeEmitente}}
										</template>
									</Column>
									<Column field="dataEmissaoDocumento" header="Date of Emission" :sortable="true">
										<template #body="slotProps">
											{{slotProps.data.dataEmissaoDocumento.substring(0, 10)}}

										</template>
									</Column>
									<Column field="tipoDocumentoDesc" header="Document type" :sortable="true">
										<template #body="slotProps">
											{{slotProps.data.tipoDocumentoDesc}} 
										</template>
									</Column>
									<Column field="valorTotalSemIva" header="Value without IVA" :sortable="true">
										<template #body="slotProps">
											{{slotProps.data.valorTotalSemIva}} €
										</template>
									</Column>
									<Column field="valorTotalIva" header="Value of IVA" :sortable="true">
										<template #body="slotProps">
											{{slotProps.data.valorTotalIva }} €
										</template>
									</Column>
									<Column field="valorTotal" header="Total" :sortable="true">
										<template #body="slotProps">
											{{slotProps.data.valorTotal}}
										</template>
									</Column>
									<Column field="valorTotal" header="Match" :sortable="true">
										<template #body="slotProps">
											<p v-if="slotProps.data.matchSaftCS == true" class="product-badge status-green"> {{slotProps.data.matchSaftCS}} </p>
											<p v-else class="product-badge status-red" > {{slotProps.data.matchSaftCS}} </p>
										</template>
									</Column>					
							</DataTable>
						</div>
					</template>
				</DataTable>
			</div>
		</div>



	</div>
</template>

<script>
import axios from "axios";
	export default {
		data() {
			return {
				nestedRouteItems: [
					{
						label: 'Valid E-Fatura',
						to: '/fatura/compareSAFTT/validDocumentsSaftC?id_company='+this.$route.query.id_company+'&nif='+this.$route.query.nif+'&dataInicio='+this.$route.query.dataInicio+'&dataFim='+this.$route.query.dataFim
                    },
                    {
						label: 'Invalid E-Fatura',
						to: '/fatura/compareSAFTT/invalidDocumentsSaftC?id_company='+this.$route.query.id_company+'&nif='+this.$route.query.nif+'&dataInicio='+this.$route.query.dataInicio+'&dataFim='+this.$route.query.dataFim
                    },
                ],
                company:[],
                documentsValid: [],
                countDocuments: null,
				expandedRows:[],
				id_company: '',
				dataInicio: '',
				dataFim: '',
				
			}
        },
        mounted() {
				this.dataInicio = this.$route.query.dataInicio;
				this.dataFim = this.$route.query.dataFim;
				this.id_company = this.$route.query.id_company
				console.log(this.id_company, this.dataFim, this.dataInicio)
       			axios({
						url: process.env.VUE_APP_URLBack + '/compare/getFaturaNIF',
						data: {
							id_company: this.id_company,
                            dataInicio: this.dataInicio,
                            dataFim: this.dataFim
						},
						method: 'POST'
						})
					.then(data => {
                        this.company = data.data.result.company;
                        console.log(this.documentsValid)
					}).catch(error => {
						// Request failed.
						console.log("error", error.response);
						this.error = error.response.statusText;
                    });;
		},
		methods: {
			toggleMenu(event) {
				this.$refs.menu.toggle(event);
			},
			onContextRightClick(event) {
				this.$refs.contextMenu.show(event);
            },
            printClick() {
			    window.print();
        },
        onRowExpand(event) {
                this.expandedRows =  this.company.filter(p => p.nifEmitente == event.data.nifEmitente);
				console.log(this.expandedRows)
				
			},
		onRowCollapse(event) {
			console.log(this.expandedRows)
			this.$toast.add({severity: 'success',  detail: event.data.nome, life: 3000});
		},
			
        searchDocuments() {
      var token = JSON.parse(localStorage.getItem("token"));
      var id_company = this.$route.query.id_company;
      this.dataInicio = this.$route.query.dataInicio;
      this.dataFim = this.$route.query.dataFim;
     axios({
          url: process.env.VUE_APP_URLBack + '/compare/validDocumentsC',
          data: {
            id_company: id_company,
            dataInicio: this.dataInicio,
            dataFim: this.dataFim
          },
          method: 'POST'
        }).then(data => {
         
          this.documentsValid = data.data.result;
          this.countDocuments = data.data.count
          console.log(this.documentsValid)
        })
        .catch(error => {
          // Request failed.
          console.log("error", error.response);
          this.error = error.response.statusText;
        });
    },
		}
	}
</script>

<style scoped lang="scss">
	::v-deep(.stepsdemo-content) {
		padding: 1em 0;

		p {
			font-weight: 400;
			display: inline-block;
			vertical-align: middle;
			font-size: 18px;
			margin: 0;
		}

		i {
			vertical-align: middle;
			font-size: 1.5em;
			margin: 0;
		}
	}

	.contextmenu-image {
		width: 100%;
	}
     
    .lowstock {
        font-weight: 500;
        color: #FF5252;
    }

	.product-badge {
		font-weight: 500;

		&.status-green {
		//	background: #C8E6C9;
			color: #256029;
		}

		&.status-red {
		//	background: #FFCDD2;
			color: #C63737;
		}

		&.status-lowstock {
			color: #8A5340;
		}
	}
</style>
