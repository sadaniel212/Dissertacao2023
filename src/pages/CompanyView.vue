<template>
	<!-- <div class="p-grid layout-dashboard"> -->

	<div class="p-grid">
		<div class="p-col-12">
			<BarraMenu :companyName=companyName :id_company=id_company :username=username :token=token
				:layoutVerification=layoutVerification>
			</BarraMenu>
		</div>
	</div>

	<div class="p-grid">
		<div class="p-col-12">
			<div class="p-grid">
				<RenderInfo :dadosInfo=dadoInfo v-for="dadoInfo in dadosInfo.slice().reverse()" :key="dadoInfo" />
			</div>

		</div>
	</div>

	<div class="p-grid">
		<RenderChart :dados=dado v-for="dado in dados.slice().reverse()" :key="dado" />
		<!-- <RenderChart :dados=dados /> -->
	</div>




</template>

<script>
import axios from "axios";
import BarraMenu from "../components/BarraMenu.vue"
import RenderChart from "../components/RenderChart.vue"
import RenderInfo from "../components/RenderInfo.vue"

export default {
	data() {
		return {
			getCompanyUrl: process.env.VUE_APP_URLBack + "/company/companyInfo",
			companyInfo: [],
			token: "",
			id_company: "",
			companyName: "",
			accountSaftc: "",
			clientSaftc: "",
			salesSaftc: "",
			username: "",
			//Dados referentes ao layout
			dados: [],
			dadosInfo: [],
			layoutVerification: 0
		}
	},
	components: {
		BarraMenu,
		RenderChart,
		RenderInfo
	},
	beforeMount() {
		this.id_company = this.$route.query.id_company;
		this.token = JSON.parse(localStorage.getItem('token'))
		this.username = JSON.parse(localStorage.getItem('username'))
		if (this.id_company === null || this.id_company === '' || this.id_company === undefined) {
			this.$router.push('/')
		}
		this.callInfoCompany();
		this.getLayout();
	},
	methods: {
		updateparent(variable) {
			this.parentvariable = variable
		},
		//Load Company INFO when mounted
		callInfoCompany() {
			var token = this.token
			var id_company = this.id_company
			axios.get(this.getCompanyUrl, { headers: { token: token, id_company: id_company } })
				.then(response => {
					if (response.status !== 200) {
						this.error = response;
						return;
					}
					this.companyName = response.data.company.name;
					this.accountSaftc = response.data.company.accountSaftc;
					this.clientSaftc = response.data.company.clientSaftc;
					this.salesSaftc = response.data.company.salesSaftc;

				})
				.catch(error => {
					// Request failed.
					console.log("error", error.response);
					this.error = error.response;
				});
		},
		getLayout() {
			// Get Layout sobre company e user
			axios({
				method: 'get',
				url: process.env.VUE_APP_URLBack + "/layout/layout",
				headers: { token: this.token, username: this.username, id_company: this.id_company },
			})
				.then(response => {
					for (let i = 0; i < response.data.layout.length; i++) {
						response.data.layout[i].colorPalette = response.data.colorPalette

						if (response.data.layout[i].tipo === "tipo1") {
							this.dados.push(response.data.layout[i]);
							this.layoutVerification += 1;

						} else if (response.data.layout[i].tipo === "tipo2") {
							this.dadosInfo.push(response.data.layout[i]);
							this.layoutVerification += 1;
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
		}
	}
}
</script>

<style scoped>
::v-deep(.fc-header-toolbar) {
	display: flex;
	flex-wrap: wrap;
}
</style>
