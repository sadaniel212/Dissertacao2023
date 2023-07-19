<template>
	<div class="p-col-12">
	
		<DataTable :value="documentsValid" dataKey="_id" responsiveLayout="scroll" >
                    <template #empty>
                        Sem faturas encontradas.
                    </template>
					<Column field="documentsValid" header="Document ID" :sortable="true">
						<template #body="slotProps">
							<p>{{slotProps.data.document_id}}</p>
						</template>
					</Column>
					<Column field="nifEmitente" header="Issuer NIF" :sortable="true" >
						<template #body="slotProps">
							{{slotProps.data.nifEmitente}}
						</template>
					</Column>
                   
                    <Column field="dataEmissaoDocumento" header="Date of Emission" :sortable="true">
						<template #body="slotProps">
                            {{slotProps.data.dataEmissaoDocumento.substring(0, 10)}}

						</template>
					</Column>

                    <Column field="valorTotal" header="Total" :sortable="true">
						<template #body="slotProps">
							{{slotProps.data.valorTotal}}
						</template>
					</Column>
                    <template #footer>

                    </template>
				</DataTable>
      </div>
      


</template>



<script>
import axios from "axios";

import { mapState } from "vuex";
import {store} from "../../store";

export default {
  name: "Fatura",
  data() {
    return {
      documentsValid: [],
      githubUrl: process.env.VUE_APP_URLBack + "/company/companyInfo",
      cats: [],
      error: null,
      user: [],
      company: [],
      username: "",
      id_company: 0,
      clients: [],
      documents: [],
      clientsLength:0,
      nif: '',
      dataInicio:'',
      dataFim:'',
      searchDocumentId:'',
      searchNifEmitente:'',
      searchEmissionDate:'',
      searchValueWithoutIva:'',
      searchValueIva:'',
      searchTotal:'',
      resultsaftT: [],
      resultsaftC: [],

     //SAFTC
      validSaftC:[],
      searcTransactionIdValidSAFTC:'',
      searchTransactionDateValidSAFTC:'',
      searchCreditoValidSAFTC:'',
      invalidSaftC:[],
      searcTransactionIdInvalidSAFTC:'',
      searchTransactionDateInvalidSAFTC:'',
      searchCreditoInvalidSAFTC:'',

      validDocumentsC: [],
      searcDataEmissaoDocumentoValidDocC: '',
      searchDocumentIdValidDocC: '',
      searchNidEmitenteValidDocC: '',
      searchValorTotalValidDocC:'',

      invalidDocumentsC: [],
      searcDataEmissaoDocumentoInvalidDocC: '',
      searchDocumentIdInvalidDocC: '',
      searchNidEmitenteInvalidDocC: '',
      searchValorTotalInvalidDocC:'',
      //SAFTT
      validSaftT:[],
      searcCustomerIDValidSAFTT:'',
      searchCustomerTaxIDValidSAFTT:'',
      searchGrossTotalValidSAFTT:'',
      searchInvoicDateValidSAFTT:'',
      searchInvoiceNoValidSAFTT:'',

      invalidSaftT:[],
      searcCustomerIDInvalidSAFTT:'',
      searchCustomerTaxIDInvalidSAFTT:'',
      searchGrossTotalInvalidSAFTT:'',
      searchInvoiceDateInvalidSAFTT:'',
      searchInvoiceNoInvalidSAFTT:'',

      validDocumentsT: [],
      searcDataEmissaoDocumentoValidDocT: '',
      searchDocumentIdValidDocT: '',
      searchNidEmitenteValidDocT: '',
      searchValorTotalValidDocT:'',

      invalidDocumentsT: [],
      searcDataEmissaoDocumentoInvalidDocT: '',
      searchDocumentIdInvalidDocT: '',
      searchNidEmitenteInvalidDocT: '',
      searchValorTotalInvalidDocT:'',

    };
  },
  computed:{  
      
    sortedDocuments: function() {
      let result = this.documents
      result = result.filter(result => result.document_id.toString().includes(this.searchDocumentId) && result.dataEmissaoDocumento.toString().substring(0, 10).includes(this.searchEmissionDate) &&  result.nifEmitente.toString().includes(this.searchNifEmitente) &&  result.valorTotalSemIva.toString().includes(this.searchValueWithoutIva) &&  result.valorTotalIva.toString().includes(this.searchValueIva) &&  result.valorTotal.toString().includes(this.searchTotal) )
      
      return result.sort((a, b) => new Date(a.dataEmissaoDocumento) - new Date(b.dataEmissaoDocumento))

    },
    
        ...mapState(["token"])},
  methods: {
    callInfoCompany() {
      var token = JSON.parse(localStorage.getItem("token"));
      this.id_company = this.$route.query.id_company;
      var id_company = this.id_company;
      axios
        .get(this.githubUrl, {
          headers: { token: token, id_company: id_company }
        })
        .then(data => {
          //  console.log(data);
          this.user = data.data.user;
          this.company = data.data.company;
          this.username = data.data.user.username;
          var id_company = this.id_company;
          var username = this.username;
        //  console.log("Teste id: " + id_company +" "+ username);
           
        })
        .catch(error => {
          // Request failed.
          console.log("error", error.response);
          this.error = error.response.statusText;
        });
    },
    searchDocuments() {
      var token = JSON.parse(localStorage.getItem("token"));
      var id_company = this.$route.query.id_company;
      this.dataInicio = this.$route.query.dataInicio;
      this.dataFim = this.$route.query.dataFim;
     axios({
          url: process.env.VUE_APP_URLBack + '/compare/invalidDocumentsC',
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
 

   
  
   
    
  
    
   

  },
  
  mounted() {
    // console.log("Teste query " + this.$route.query.id_company);
    this.searchDocuments(),
    this.callInfoCompany()



  }

        
      
    
};
</script>
