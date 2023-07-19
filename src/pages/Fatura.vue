<template>
	<div class="p-grid p-fluid">


		<div class="p-col-12">

			<div class="card card-w-title">
				<h5>E-fatura </h5>
				<TabMenu :model="nestedRouteItems" />
				<router-view/>
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
						label: 'Faturas',
						to: '/fatura?id_company='+this.$route.query.id_company+'&nif='+this.$route.query.nif+'&dataInicio='+this.$route.query.dataInicio+'&dataFim='+this.$route.query.dataFim
					},
					{
						label: 'Fatura com SAFT C',
						to: '/fatura/compareSAFTC/validDocumentsSaftC?id_company='+this.$route.query.id_company+'&nif='+this.$route.query.nif+'&dataInicio='+this.$route.query.dataInicio+'&dataFim='+this.$route.query.dataFim
					},
					{
						label: 'Fatura com SAFT C Versão 2',
						to: '/fatura/compareSAFTT/validDocumentsSaftT?id_company='+this.$route.query.id_company+'&nif='+this.$route.query.nif+'&dataInicio='+this.$route.query.dataInicio+'&dataFim='+this.$route.query.dataFim
					}
                ],
			}
        },
        created() {
		
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
</style>
