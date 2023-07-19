<template>
	<div
		style="margin: 0;padding: 0;width: 100vw;height: 100vh;overflow: hidden; position: relative;display: flex; align-items: center; justify-content: center; background-color: #DEDEDE">
		<div class="blob" style="z-index: 0">
			<svg xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 310 350">
				<path
					d="M156.4,339.5c31.8-2.5,59.4-26.8,80.2-48.5c28.3-29.5,40.5-47,56.1-85.1c14-34.3,20.7-75.6,2.3-111  c-18.1-34.8-55.7-58-90.4-72.3c-11.7-4.8-24.1-8.8-36.8-11.5l-0.9-0.9l-0.6,0.6c-27.7-5.8-56.6-6-82.4,3c-38.8,13.6-64,48.8-66.8,90.3c-3,43.9,17.8,88.3,33.7,128.8c5.3,13.5,10.4,27.1,14.9,40.9C77.5,309.9,111,343,156.4,339.5z" />
			</svg>
		</div>
		<div class="card p-fluid" style="z-index: 1; padding: 2rem 2.5rem; ">
			<form @submit.prevent="login">
				<div class="p-col-12 p-sm-6 p-md-6 logo-container">
					<img src="assets/layout/images/image_blk.png" alt="roma" />
				</div>
				<div class="p-col-12 ">
						<InputText placeholder="Email" id="input" type="text" v-model="email" />					
				</div>
				<div class="p-col-12 ">					
						<InputText placeholder="Password" type="password" v-model="password" />					
				</div>
				<div class="p-col-6 rememberme-container">
					<Checkbox v-model="checked" :binary="true" />
					<label> Remember me</label>
				</div>
				<div class="p-col-8 p-mt-1 forgetpassword-container">
					<a href="/register" class="forget-password" style="color: #000000;">Register</a> <span> / </span>
					<a href="/" class="forget-password" style="color: #000000;">Forget Password</a>
				</div>
				<div class="p-col-6">
					<Button type="submit" label="Sign In"
						icon="pi pi-check" @click="login" />
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import { store } from '../store'
export default {
	data() {
		return {
			checked: false,
			section: 'Login',
			email: '',
			password: ''
		}
	},
	methods: {
		login() {
			let email = this.email
			let password = this.password
			store.dispatch('login', { email, password })
				.then(() => {
					// console.log('teste')
					this.$router.push({ path: '/company' });
				})
				.catch(err => console.log(err))
		}
	}
}
</script>

<style scoped></style>
