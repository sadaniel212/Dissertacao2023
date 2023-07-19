<template>
  <div class="card">
    <div class="p-col-12">
      <TabView>
        <TabPanel header="Em comum">
          <DataTable :loading="loading1" :value="sortedCompareSaft" dataKey="_id" responsiveLayout="scroll">
            <template #loading>
              Loading SAFT. Please wait.
            </template>
            <template #empty>
              No SAFT found.
            </template>
            <Column field="customer" header="Customer" :sortable="true">
              <template #body="slotProps">
                <span class="p-column-title">Start date</span>
                {{ slotProps.data.customer }}
              </template>
            </Column>
            <Column field="invoiceNumber" header="Invoice Number" :sortable="true">
              <template #body="slotProps">
                <span class="p-column-title">End Date</span>
                {{ slotProps.data.invoiceNumber }}
              </template>
            </Column>
            <Column field="invoiceDate" header="Date of Invoice" :sortable="true">
              <template #body="slotProps">
                <span class="p-column-title">End Date</span>
                {{ slotProps.data.invoiceDate }}
              </template>
            </Column>
            <Column field="invoiceAmount" header="Invoice Amount" :sortable="true">
              <template #body="slotProps">
                <span class="p-column-title">End Date</span>
                {{ slotProps.data.invoiceAmount }}
              </template>
            </Column>
            <Column field="transaction" header="Transaction" :sortable="true">
              <template #body="slotProps">
                <span class="p-column-title">End Date</span>
                {{ slotProps.data.transaction }}
              </template>
            </Column>
          </DataTable>
        </TabPanel>
        <TabPanel header="SAFT C sem comparação">
          <DataTable :loading="loading1" :value="sortedInvalidSaftCs" dataKey="_id" responsiveLayout="scroll">
            <template #loading>
              Loading SAFT. Please wait.
            </template>
            <template #empty>
              No SAFT found.
            </template>
            <Column field="valorSemIva" header="Valor sem iva" :sortable="true">
              <template #body="slotProps">
                <span class="p-column-title">Start date</span>
                {{ slotProps.data.valorSemIva }}
              </template>
            </Column>
            <Column field="data" header="Date" :sortable="true">
              <template #body="slotProps">
                <span class="p-column-title">End Date</span>
                {{ slotProps.data.data }}
              </template>
            </Column>
            <Column field="transaction" header="Transaction ID" :sortable="true">
              <template #body="slotProps">
                <span class="p-column-title">End Date</span>
                {{ slotProps.data.transaction }}
              </template>
            </Column>
          </DataTable>
        </TabPanel>
        <TabPanel header="SAFT T sem comparação">
          <DataTable :loading="loading1" :value="sortedInvalidSaftTs" dataKey="_id" responsiveLayout="scroll">
            <template #loading>
              Loading SAFT. Please wait.
            </template>
            <template #empty>
              No SAFT found.
            </template>
            <Column field="customer" header="Customer" :sortable="true">
              <template #body="slotProps">
                <span class="p-column-title">Start date</span>
                {{ slotProps.data.customer }}
              </template>
            </Column>
            <Column field="invoiceNumber" header="Invoice Number" :sortable="true">
              <template #body="slotProps">
                <span class="p-column-title">End Date</span>
                {{ slotProps.data.invoiceNumber }}
              </template>
            </Column>
            <Column field="data" header="Date of Invoice" :sortable="true">
              <template #body="slotProps">
                <span class="p-column-title">End Date</span>
                {{ slotProps.data.data }}
              </template>
            </Column>
            <Column field="valorSemIva" header="Value withou IVA" :sortable="true">
              <template #body="slotProps">
                <span class="p-column-title">End Date</span>
                {{ slotProps.data.valorSemIva }} €
              </template>
            </Column>
          </DataTable>
        </TabPanel>
      </TabView>


    </div>
  </div>
</template>     
				


<script>
import axios from "axios";

import { mapState } from "vuex";
// import store from "../store";

// import Chart from "chart.js";

export default {
  name: "Fatura",
  data() {
    return {
      githubUrl: process.env.VUE_APP_URLBack + "/company/companyInfo",
      cats: [],
      error: null,
      user: [],
      company: [],
      username: "",
      id_company: 0,
      clients: [],
      documents: [],
      clientsLength: 0,
      nif: '',
      dataInicio: '',
      dataFim: '',
      searchTransaction: '',
      searchInvoiceAmount: '',
      searchInvoiceDate: '',
      searchInvoiceNumber: '',
      searchCustomer: '',
      resultsaftT: [],
      resultCompareSaft: [],

      resultInvalidSaftTsCs: [],
      searchCustomerInvalidT: '',
      searchInvoiceAmountInvalidT: '',
      searchValorSemIvaInvalidT: '',
      searchDateInvalidT: '',

      resultInvalidSaftCsTs: [],
      searchTransactionC: '',
      searchValorSemIvaInvalidC: '',
      searchDateInvalidC: '',


      compareSaftT: "",
      compareSaftC: ""

    };
  },
  computed: {

    sortedCompareSaft: function () {
      let result = this.resultCompareSaft
      result = result.filter(result => result.customer.toString().includes(this.searchCustomer) && result.invoiceNumber.toString().includes(this.searchInvoiceNumber) && result.invoiceDate.toString().includes(this.searchInvoiceDate) && result.invoiceAmount.toString().includes(this.searchInvoiceAmount) && result.transaction.toString().includes(this.searchTransaction))

      return result
    },
    sortedInvalidSaftTs: function () {
      let result = this.resultInvalidSaftTsCs
      result = result.filter(result => result.customer.toString().includes(this.searchCustomerInvalidT) && result.invoiceNumber.toString().includes(this.searchInvoiceAmountInvalidT) && result.data.toString().includes(this.searchDateInvalidT) && result.valorSemIva.toString().includes(this.searchValorSemIvaInvalidT))

      return result
    },
    sortedInvalidSaftCs: function () {
      let result = this.resultInvalidSaftCsTs
      result = result.filter(result => result.valorSemIva.toString().includes(this.searchValorSemIvaInvalidC) && result.data.toString().includes(this.searchDateInvalidC) && result.transaction.toString().includes(this.searchTransactionC))
      var transaction = ""

      result.transaction = transaction
      return result
    },

    ...mapState(["token"])
  },
  methods: {
    callInfoCompany() {
      this.compareSaftC = JSON.parse(localStorage.getItem("compareSaftC"));
      this.compareSaftT = JSON.parse(localStorage.getItem("compareSaftT"));
      console.log(this.compareSaftC, this.compareSaftT)
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
          console.log("Teste id: " + id_company + " " + username);

        })
        .catch(error => {
          // Request failed.
          console.log("error", error.response);
          this.error = error.response.statusText;
        });
    },
    getValidSaftCs1() {
      this.compareSaftC = JSON.parse(localStorage.getItem("compareSaftC"));
      this.compareSaftT = JSON.parse(localStorage.getItem("compareSaftT"));
      this.id_company = this.$route.query.id_company;
      this.dataInicio = this.$route.query.dataInicio;
      this.dataFim = this.$route.query.dataFim;
      //  commit('auth_request')
      console.log(this.compareSaftT, this.compareSaftC, this.id_company, this.dataInicio, this.dataFim)
      axios({
        url: process.env.VUE_APP_URLBack + '/compare/getValidSaftCs1',
        data: {
          saftC: this.compareSaftC,
          saftT: this.compareSaftT,
          id_company: this.id_company,
          dataInicio: this.dataInicio,
          dataFim: this.dataFim
        },
        method: 'POST'
      })
        .then(data => {
          console.log("getValidSaftCs1")
          //  console.log( data.data.result);
          this.resultCompareSaft = data.data.result;
          this.getInvalidSaftTsCs()
        })
        .catch(err => {
          console.log(err)
          reject(err)
          console.log('Cannot')
        })
    },
    getInvalidSaftTsCs() {
      this.id_company = this.$route.query.id_company;
      this.dataInicio = this.$route.query.dataInicio;
      this.dataFim = this.$route.query.dataFim;
      //  commit('auth_request')
      axios({
        url: process.env.VUE_APP_URLBack + '/compare/getInvalidSaftTsCs',
        data: {
          saftC: this.compareSaftC,
          saftT: this.compareSaftT,
          id_company: this.id_company,
          dataInicio: this.dataInicio,
          dataFim: this.dataFim
        },
        method: 'POST'
      })
        .then(data => {
          console.log("teste")
          console.log(data.data.result);
          this.resultInvalidSaftTsCs = data.data.result;
          this.getInvalidSaftCsTs()
        })
        .catch(err => {
          console.log(err)
          reject(err)
          console.log('Cannot')
        })
    },
    getInvalidSaftCsTs() {
      this.id_company = this.$route.query.id_company;
      this.dataInicio = this.$route.query.dataInicio;
      this.dataFim = this.$route.query.dataFim;
      //  commit('auth_request')
      axios({
        url: process.env.VUE_APP_URLBack + '/compare/getInvalidSaftCsTS',
        data: {
          saftC: this.compareSaftC,
          saftT: this.compareSaftT,
          id_company: this.id_company,
          dataInicio: this.dataInicio,
          dataFim: this.dataFim
        },
        method: 'POST'
      })
        .then(data => {
          console.log("teste")
          console.log(data.data.result);
          this.resultInvalidSaftCsTs = data.data.result;
        })
        .catch(err => {
          console.log(err)
          reject(err)
          console.log('Cannot')
        })
    },

    // Fatura & SAFTC
    validDocumentsC() {
      this.id_company = this.$route.query.id_company;
      this.dataInicio = this.$route.query.dataInicio;
      this.dataFim = this.$route.query.dataFim;
      //  commit('auth_request')
      axios({
        url: process.env.VUE_APP_URLBack + '/compare/validDocumentsC',
        data: {
          id_company: this.id_company,
          dataInicio: this.dataInicio,
          dataFim: this.dataFim
        },
        method: 'POST'
      })
        .then(data => {
          // console.log("teste")
          //  console.log( data.data.result);
          this.resultCompareSaft = data.data.result;
        })
        .catch(err => {
          console.log(err)
          reject(err)
          console.log('Cannot')
        })
    },

  },

  mounted() {
    // console.log("Teste query " + this.$route.query.id_company);
    this.getValidSaftCs1(),
      this.callInfoCompany()


  },




};
</script>
