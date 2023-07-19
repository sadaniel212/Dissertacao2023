<template>
	<div
		style="margin: 0;padding: 0;width: 100vw;height: 100vh;overflow: hidden; position: relative;display: flex; align-items: center; justify-content: center; background-color: #DEDEDE">
		<div class="blob" style="z-index: 0; fill: #679289">
			<svg xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 310 350">
				<path
					d="M156.4,339.5c31.8-2.5,59.4-26.8,80.2-48.5c28.3-29.5,40.5-47,56.1-85.1c14-34.3,20.7-75.6,2.3-111  c-18.1-34.8-55.7-58-90.4-72.3c-11.7-4.8-24.1-8.8-36.8-11.5l-0.9-0.9l-0.6,0.6c-27.7-5.8-56.6-6-82.4,3c-38.8,13.6-64,48.8-66.8,90.3c-3,43.9,17.8,88.3,33.7,128.8c5.3,13.5,10.4,27.1,14.9,40.9C77.5,309.9,111,343,156.4,339.5z" />
			</svg>
		</div>
		<div class="card p-fluid" style="z-index: 1; padding: 2rem 3.5rem; ">

			<div class="p-col-12 ">
				<img src="assets/layout/images/image_blk.png" width="250" height="200" />
			</div>

			<div class="p-col-12">
				<span class="p-input-icon-rigth">
					<InputText placeholder="Username" :required="true" type="text" v-model="username" />
				</span>
			</div>
			<div class="p-col-12">
				<span class="p-input-icon-rigth">
					<InputText placeholder="Email" :required="true" type="email" v-model="email" />
				</span>
			</div>
			<div class="p-col-12">
				<span class="p-input-icon-rigth">
					<InputText placeholder="Password" :required="true" type="password" v-model="password" />
				</span>
			</div>
			<div class="p-col-12">

				<span class="p-input-icon-rigth">
					<InputText placeholder="Confirm Password" :required="true" type="password" v-model="password2" />
				</span>
			</div>
			<div class="p-col-12 ">
				<span class="p-input-icon-rigth">
					<Dropdown v-model="profession" :options="dropdownValues" optionLabel="name" placeholder="Profession"
						:required="true" />
				</span>
			</div>

			<div class="p-grid" style="margin-top: 0rem;">
				<div class="p-col">
					<Button style="border-color: #679289; background-color: #679289;" label="Register" icon="pi pi-check"
						@click="register" />
				</div>
				<div class="p-col">
					<Button style="border-color: #679289; background-color: #679289;" label="Back" icon="pi pi-check"
						@click="login" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { store } from '../store'
export default {
	data() {
		return {
			section: 'Register',
			email: '',
			password: '',
			password2: '',
			username: '',
			profession: '',
			dropdownValues: [
				{ name: 'CEO', value: 'CEO' },
				{ name: 'CTO', value: 'CTO' },
				{ name: 'Contabilista', value: 'Contabilista' },
				{ name: 'Funcionario', value: 'Funcionario' },
				{ name: 'Outro', value: 'Outro' }
			],
		}
	},
	methods: {
		register() {
			let email = this.email
			let password = this.password
			let password2 = this.password2
			let profession = this.profession
			let username = this.username
			store.dispatch('register', { email, password, password2, profession, username })
				.then(() => {
					console.log('teste')
					this.$router.push('/')
				})
				.catch(err => console.log(err))
		},
		login() {
			this.$router.push('/login')
		}
	}
}
</script>

<style scoped></style>
