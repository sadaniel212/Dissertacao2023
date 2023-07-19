import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'All Companies',
        exact: true,
        component: () => import('./pages/Company.vue')
    },
    {
        path: '/companyView',
        name: 'companyView',
        exact: true,
        component: () => import('./pages/CompanyView.vue')
    },
    {
		path: '/balanco',
		name: 'balanco',
		component: () => import('./pages/Balanco.vue')
	},
    {
		path: '/demonstracaoResultados',
		name: 'demonstracaoResultados',
		component: () => import('./pages/DemonstracaoResultados.vue')
	},
	{
		path: '/demonstracaoResultadosMeses',
		name: 'demonstracaoResultadosMeses',
		component: () => import('./pages/DemonstracaoResultadosMultiMonth.vue')
	},
    {
		path: '/compareSaft',
		name: 'compareSaft',
		component: () => import('./pages/CompareSaft.vue')
	},
	{
		path: '/racios',
		name: 'racios',
		component: () => import('./pages/Racios.vue')
	},
    {
		path: '/fatura',
		component: () => import('./pages/Fatura.vue'),
		children: [{
			path: '',
			component: () => import('./pages/fatura/fatura.vue')
		},
			{
				path: '/fatura/compareSAFTC',
				component: () => import('./pages/fatura/compareSAFTC.vue'),
				children: [
					{
						path: '/fatura/compareSAFTC/validDocumentsSaftC',
						component: () => import('./pages/saftcfatura/validDocumentsSaftC.vue')
					},
					{
						path: '/fatura/compareSAFTC/invalidDocumentsSaftC',
						component: () => import('./pages/saftcfatura/invalidDocumentsSaftC.vue')
					},
					{
						path: '/fatura/compareSAFTC/validSaftC',
						component: () => import('./pages/saftcfatura/validSaftC.vue')
					},
					{
						path: '/fatura/compareSAFTC/invalidSaftC',
						component: () => import('./pages/saftcfatura/invalidSaftC.vue')
					}
				]},
			{
				path: '/fatura/compareSAFTT',
				component: () => import('./pages/fatura/compareSAFTT.vue'),
				children: [
					{
						path: '/fatura/compareSAFTT/validDocumentsSaftT',
						component: () => import('./pages/safttfatura/validDocumentsSaftT.vue')
					},
					{
						path: '/fatura/compareSAFTT/invalidDocumentsSaftT',
						component: () => import('./pages/safttfatura/invalidDocumentsSaftT.vue')
					},
					{
						path: '/fatura/compareSAFTT/validSaftT',
						component: () => import('./pages/safttfatura/validSaftT.vue')
					},
					{
						path: '/fatura/compareSAFTT/invalidSaftT',
						component: () => import('./pages/safttfatura/invalidSaftT.vue')
					}
				]}]
	},
    {
        path: '/register',
        name: 'register',
        component: () => import('./pages/Register.vue')
    },
    {
        path: '/error',
        name: 'error',
        component: () => import('./pages/Error.vue')
    },
    {
        path: '/notfound',
        name: 'notfound',
        component: () => import('./pages/NotFound.vue')
    },
    {
        path: '/access',
        name: 'access',
        component: () => import('./pages/Access.vue')
    },
    {
        path: '/company',
        name: 'company',
        component: () => import('./pages/Company.vue')
    },
    {
		path: '/profile',
		name: 'profile',
		component: () => import('./pages/Profile.vue')
	},
	{
		path: '/editProfile',
		name: 'editProfile',
		component: () => import('./pages/EditProfile.vue')
	},
	{
		path: '/rulesCompany',
		name: 'rulesCompany',
		component: () => import('./pages/CompanyBalancoRules.vue')
	},
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;