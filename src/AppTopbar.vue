<template>
	<div class="layout-topbar" style="background-color: #0d3c61">


		<button class="p-link layout-menu-button layout-topbar-icon" @click="onMenuButtonClick">
			<i class="pi pi-bars"></i>
		</button>

		<router-link to="/company" class="p-link layout-topbar-logo">
			<img src="assets/layout/images/logoLetras.svg"  alt="roma-vue" />
		</router-link>

		<ul class="topbar-menu">
			<li :class="['user-profile', { 'active-topmenuitem fadeInDown': activeTopbarItem === 'profile' }]">
				<button class="p-link" v-if="!this.inlineUser"
					@click="$emit('topbar-item-click', { originalEvent: $event, item: 'profile' })">
					<img src="assets/layout/images/user.png" alt="roma-layout" />
					<div class="layout-profile-userinfo">
						<span class="layout-profile-name">{{ name }}</span>
						<span class="layout-profile-role">{{ profession }}</span>
					</div>
				</button>
				<transition name="layout-submenu-container">
					<ul class="fadeInDown" v-show="activeTopbarItem === 'profile'">
						<li role="menuitem">
							<button class="p-link" @click="perfil">
								<i class="pi pi-fw pi-user"></i>
								<span>Profile</span>
							</button>
						</li>
						<li role="menuitem">
							<button class="p-link" v-on:click="logout">
								<i class="pi pi-fw pi-sign-out"></i>
								<span>Logout</span>
							</button>
						</li>
					</ul>
				</transition>
			</li>


		</ul>
	</div>
</template>

<script>
import { store } from './store/index';
import axios from 'axios'
export default {
	data() {
		return {
			name: "",
			last_name: '',
			profession: '',
			address: '',
			postalCode: '',
			country: '',
			city: '',
			phone: '',
		}
	},
	emits: ['menubutton-click', 'topbar-menubutton-click', 'topbar-item-click', 'right-menubutton-click'],
	props: {
		topbarMenuActive: Boolean,
		activeTopbarItem: String,
		inlineUser: Boolean,

	},
	mounted() {
		var token = JSON.parse(localStorage.getItem('token'))
		axios.get(process.env.VUE_APP_URLBack + '/user/me', { headers: { token: token } })
			.then(data => {
				// console.log(data.data.user)
				// this.name = data.data.user.username;
				this.name = data.data.user.name + " " +  data.data.user.last_name ;
				this.last_name = data.data.user.last_name;
				this.profession = data.data.user.profession;
				this.address = data.data.user.address;
				this.postalCode = data.data.user.postalCode;
				this.country = data.data.user.country;
				this.city = data.data.user.city;
				this.phone = data.data.user.phone;
				// console.log("name " + this.name)     
			});
	},
	methods: {
		onMenuButtonClick(event) {
			this.$emit('menubutton-click', event);
		},
		onTopbarMenuButtonClick(event) {
			this.$emit('topbar-menubutton-click', event);
		},
		onRightMenuButtonClick(event) {
			this.$emit('right-menubutton-click', event);
		},
		logout() {
			console.log("LOGOUT")
			store
				.dispatch("logout")
				.then(() => {
					console.log("teste");
					this.$router.push("/");
				})
				.catch(err => console.log(err));
		},
		perfil() {
			this.$router.push('/profile')
		},
	}
}
</script>
