<template>
    <div class="p-grid p-fluid">
        <div class="p-col-12 p-md-12">
            <div class="card">
                <h5>Perfil</h5>
                <div class="p-grid p-formgrid">

                    <div class="p-col-12 p-mb-2 p-lg-6 p-mb-lg-0">
                        Name:
                        <span class="p-input-icon-left">
                            <i class="pi pi-user" />
                            <InputText class="p-inputtext-lg" type="text" placeholder="Name" v-model="name" />
                        </span>
                    </div>

                    <div class="p-col-12 p-mb-2 p-lg-6 p-mb-lg-0">
                        Last name:
                        <span class="p-input-icon-left">
                            <i class="pi pi-user" />
                            <InputText class="p-inputtext-lg" type="text" placeholder="Last name" v-model="last_name" />
                        </span>
                    </div>
                    <div class="p-col-12 "> <br></div>
                    <div class="p-col-12 "> <br></div>
                    <div class="p-col-12 p-mb-2 p-lg-6 p-mb-lg-0">
                        Phone:
                        <span class="p-input-icon-left">
                            <i class="pi pi-user" />
                            <InputText class="p-inputtext-lg" type="text" placeholder="Phone" v-model="phone" />
                        </span>
                    </div>
                    <div class="p-col-12 p-mb-2 p-lg-6 p-mb-lg-0">
                        Address:
                        <span class="p-input-icon-left">
                            <i class="pi pi-user" />
                            <InputText class="p-inputtext-lg" type="text" placeholder="Address" v-model="address" />
                        </span>
                    </div>
                    <div class="p-col-12 "> <br></div>
                    <div class="p-col-12 "> <br></div>
                    <div class="p-col-12 p-mb-2 p-lg-6 p-mb-lg-0">
                        Postal Code:
                        <span class="p-input-icon-left">
                            <i class="pi pi-user" />
                            <InputText class="p-inputtext-lg" type="text" placeholder="Postal Code"
                                v-model="postalCode" />
                        </span>
                    </div>
                    <div class="p-col-12 p-mb-2 p-lg-6 p-mb-lg-0">
                        Country:
                        <span class="p-input-icon-left">
                            <i class="pi pi-user" />
                            <InputText class="p-inputtext-lg" type="text" placeholder="Country" v-model="country" />
                        </span>
                    </div>
                    <div class="p-col-12 "> <br></div>
                    <div class="p-col-12 "> <br></div>
                    <div class="p-col-12 p-mb-2 p-lg-6 p-mb-lg-0">
                        City:
                        <span class="p-input-icon-left">
                            <i class="pi pi-user" />
                            <InputText class="p-inputtext-lg" type="text" placeholder="City" v-model="city" />
                        </span>
                    </div>
                    <div class="p-col-12 p-mb-2 p-lg-6 p-mb-lg-0">
                        Profession:
                        <span class="p-input-icon-left">
                            <i class="pi pi-question-circle" />
                            <Dropdown class="p-inputtext-lg" v-model="newProfession" :options="dropdownValues"
                                optionLabel="name" placeholder="Profession" :required="true" />
                        </span>
                    </div>
                    <div class="p-col-12 "> <br></div>
                    <div class="p-col-12 "> <br></div>
                    <div class="p-col-12 p-mb-2 p-lg-6 p-mb-lg-0">
                        <span class="p-input-icon-left">
                            <i class="pi pi-question-circle" />
                            <InputText class="p-inputtext-lg" type="password" placeholder="Password" v-model="password"
                                :required="true" />
                        </span>
                    </div>
                    <div class="p-col-12 p-mb-2 p-lg-6 p-mb-lg-0">
                        <span class="p-input-icon-left">
                            <i class="pi pi-question-circle" />
                            <InputText class="p-inputtext-lg" type="password" placeholder="Confirmar password"
                                v-model="password2" :required="true" />
                        </span>
                        <div class="p-col-12 "> <br></div>
                        <div class="p-col-12 "> <br></div>
                    </div>
                    <div class="p-col-2 p-offset-3 ">
                        <Button @click="updateUser" label="Confirm edit" class="p-mr-2 p-mb-2"></Button>
                    </div>
                    <div class="p-col-2 p-offset-2">
                        <Button @click="profile" label="Back" class="p-mr-2 p-mb-2"></Button>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { store } from '../store'
export default {
    data(router) {
        return {
            name: '',
            last_name: '',
            profession: '',
            address: '',
            postalCode: '',
            country: '',
            city: '',
            phone: '',
            password: '',
            password2: '',
            dropdownValues: [
                { name: 'CEO', value: 'CEO' },
                { name: 'CTO', value: 'CTO' },
                { name: 'Contabilista', value: 'Contabilista' },
                { name: 'Funcionario', value: 'Funcionario' },
                { name: 'Outro', value: 'Outro' }
            ],
            newProfession: '',
        };
    },
    methods: {
        updateUser() {
            let name = this.name
            let last_name = this.last_name
            let newProfession = this.profession
            let address = this.address
            let postalCode = this.postalCode
            let country = this.country
            let city = this.city
            let phone = this.phone
            let password = this.password
            let password2 = this.password2
            if (this.dropdownValues == null) {
                newProfession == this.profession
            } else {
                newProfession = this.newProfession.value
            }
            console.log(last_name)
            store.dispatch('updateUser', { name, last_name, newProfession, address, postalCode, country, city, phone, password, password2 })
                .then(() => {
                    console.log('teste')
                    // this.$router.push('/')
                })
                .catch(err => console.log(err))
        },
        profile() {
            this.$router.push('/profile')
        },
    },
    mounted() {
        var token = JSON.parse(localStorage.getItem('token'))
        axios.get(process.env.VUE_APP_URLBack + '/user/me', { headers: { token: token } })
            .then(data => {
                console.log(data.data.user)
                this.name = data.data.user.name;
                this.last_name = data.data.user.last_name;
                this.profession = data.data.user.profession;
                this.address = data.data.user.address;
                this.postalCode = data.data.user.postalCode;
                this.country = data.data.user.country;
                this.city = data.data.user.city;
                this.phone = data.data.user.phone;
            });
    }

};
</script>

<style scoped lang="scss">
::v-deep(.p-multiselect) {
    min-width: 15rem;
}

.multiselect-custom-virtual-scroll .p-multiselect {
    min-width: 20rem;
}

::v-deep(.multiselect-custom .p-multiselect-label) {
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
}

.multiselect-custom .country-item.country-item-value {
    padding: 0.25rem 0.5rem;
    border-radius: 3px;
    display: inline-flex;
    margin-right: 0.5rem;
    background-color: var(--primary-color);
    color: var(--primary-color-text);
}

.multiselect-custom .country-item.country-item-value img.flag {
    width: 17px;
}

.country-item {
    display: flex;
    align-items: center;
}

.country-item img.flag {
    width: 18px;
    margin-right: 0.5rem;
}

.multiselect-custom .country-placeholder {
    padding: 0.25rem;
}
</style>
