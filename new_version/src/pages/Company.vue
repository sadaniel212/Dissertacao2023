<template>

    <div class="p-grid">
        <div class="p-col">
            <Button label="New Company" @click="displayNewCompanyModal" icon="pi pi-plus" />
        </div>
        <div class="p-col-12">
            <div class="card p-grid p-align-start vertical-container">
                <div class="p-col-12 p-md-6 p-lg-4" v-for="cats in cats" :key="cats">
                    <div class="card user-card">
                        <div class="user-card-header" style="background-color: #0772B3">
                        </div>
                        <div class="user-card-content">
                            <img src="assets/layout/images/avatar.png" alt="roma-layout" />

                            <Button type="button" icon="pi pi-cog" v-on:click="idCompany(cats.id_company)"
                                @click="toggle" />
                            <Menu :model="menuItems" :popup="true" ref="menu" appendTo="body" />


                            <!-- BOTAO DE SUBMETER FICHEIRO SAFT  -->

                            <!-- FIM BOTAO -->
                            <div class="user-card-name text-white bg-dark">
                                <span>{{ cats.name }}</span>
                            </div>
                            <div class="user-detail">
                                <span>Latest SAFT C info</span>
                                <p></p>
                                <div class="p-grid">
                                    <div class="p-col-4">
                                        <div class="user-detail-box">
                                            <div class="user-detail-box-name">Accounts</div>
                                            <div class="user-detail-box-detail">{{ cats.accountSaftc }}</div>
                                            <i class="pi pi-wallet"></i>
                                            <ProgressBar :value="100" />
                                        </div>
                                    </div>
                                    <div class="p-col-4">
                                        <div class="user-detail-box">
                                            <div class="user-detail-box-name">Clients</div>
                                            <div class="user-detail-box-detail">{{ cats.clientSaftc }}</div>
                                            <i class="pi pi-user"></i>
                                            <ProgressBar :value="100" />
                                        </div>
                                    </div>
                                    <div class="p-col-4">
                                        <div class="user-detail-box">
                                            <div class="user-detail-box-name">Sales</div>
                                            <div class="user-detail-box-detail">{{ cats.salesSaftc }}</div>
                                            <i class="pi pi-dollar"></i>
                                            <ProgressBar :value="100" />
                                        </div>
                                    </div>
                                </div>
                                <span>Latest SAFT T info</span>
                                <p></p>
                                <div class="p-grid">
                                    <div class="p-col-4">
                                        <div class="user-detail-box">
                                            <div class="user-detail-box-name">Products</div>
                                            <div class="user-detail-box-detail">{{ cats.productsSaftt }}</div>
                                            <i class="pi pi-tags"></i>
                                            <ProgressBar :value="100" />
                                        </div>
                                    </div>
                                    <div class="p-col-4">
                                        <div class="user-detail-box">
                                            <div class="user-detail-box-name">Clients</div>
                                            <div class="user-detail-box-detail">{{ cats.clientSaftt }}</div>
                                            <i class="pi pi-user"></i>
                                            <ProgressBar :value="100" />
                                        </div>
                                    </div>
                                    <div class="p-col-4">
                                        <div class="user-detail-box">
                                            <div class="user-detail-box-name">Sales</div>
                                            <div class="user-detail-box-detail">{{ cats.invoiceSaftt }}</div>
                                            <i class="pi pi-dollar"></i>
                                            <ProgressBar :value="100" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <Dialog header="New Company" v-model:visible="displayNewCompany" :breakpoints="{ '1000px': '75vw' }"
                    :style="{ width: '40vw' }" :modal="true">
                    <div class="p-grid p-fluid">
                        <div class="p-col-12 p-md-12">
                            <br>
                            <div class="p-grid p-formgrid">

                                <div class="p-col-12 p-mb-2 p-lg-6 p-mb-lg-0">
                                    <span class="p-float-label p-input-icon-left">
                                        <i class="pi pi-user" />
                                        <InputText class="p-inputtext-lg" type="text" v-model="name" />
                                        <label for="inputtext-left">Company Name</label>
                                    </span>
                                </div>

                                <div class="p-col-12 p-mb-2 p-lg-6 p-mb-lg-0">
                                    <span class="p-float-label p-input-icon-left">
                                        <i class="pi pi-user" />
                                        <InputText class="p-inputtext-lg" type="text" v-model="description" />
                                        <label for="inputtext-left">Description</label>

                                    </span>
                                </div>
                                <div class="p-col-12 "> <br></div>
                                <div class="p-col-12 "> <br></div>
                                <div class="p-col-12 p-mb-2 p-lg-6 p-mb-lg-0">
                                    <span class="p-float-label p-input-icon-left">
                                        <i class="pi pi-user" />
                                        <InputText class="p-inputtext-lg" type="text" v-model="nif" />
                                        <label for="inputtext-left">NIF</label>

                                    </span>
                                </div>
                                <div class="p-col-12 p-mb-2 p-lg-6 p-mb-lg-0">
                                    <span class="p-float-label p-input-icon-left">
                                        <i class="pi pi-user" />
                                        <InputText class="p-inputtext-lg" type="text" v-model="address" />
                                        <label for="inputtext-left">Address</label>

                                    </span>
                                </div>
                                <div class="p-col-12 "> <br></div>
                                <div class="p-col-12 "> <br></div>
                                <div class="p-col-12 p-mb-2 p-lg-6 p-mb-lg-0">
                                    <span class="p-float-label p-input-icon-left">
                                        <i class="pi pi-user" />
                                        <InputText class="p-inputtext-lg" type="text" v-model="cae" />
                                        <label for="inputtext-left">CAE</label>

                                    </span>
                                </div>
                                <div class="p-col-12 p-mb-2 p-lg-6 p-mb-lg-0">
                                    <span class="p-float-label p-input-icon-left">
                                        <i class="pi pi-user" />
                                        <InputText class="p-inputtext-lg" type="text" v-model="legalForm" />
                                        <label for="inputtext-left">Legal Form</label>
                                    </span>
                                </div>
                                <div class="p-col-12 "> <br></div>
                                <div class="p-col-12 "> <br></div>
                                <div class="p-col-12 ">
                                    <div class="p-grid">
                                        <div class="p-col-11">
                                            Do you want your data public or private ?: <br><br>
                                        </div>
                                        <div class="p-col-10 p-offset-1">
                                            <div class="p-field-radiobutton">
                                                <RadioButton id="option1" name="option" :value="'public'"
                                                    v-model="publicS" />
                                                <label for="option1">Public</label>
                                            </div>
                                        </div>
                                        <div class="p-col-10 p-offset-1">
                                            <div class="p-field-radiobutton">
                                                <RadioButton id="option2" name="option" :value="'private'"
                                                    v-model="publicS" />
                                                <label for="option2">Private</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="p-col-12 "> <br></div>
                                <div class="p-col-4 p-offset-4">
                                    <Button @click="registerCompany" label="Register Company"
                                        class="p-mr-2 p-mb-2"></Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <template #footer>

                    </template>
                </Dialog>
            </div>
        </div>
    </div>

</template>


<script>
import { store } from '../store'
import axios from "axios";

export default {
    data() {
        return {
            display: false,
            menuItems: [
                {
                    label: 'Ver detalhe', icon: 'pi pi-fw pi-trash', command: () => {
                        this.$router.push('/companyView' + "?id_company=" + this.id_company)
                    }
                }
            ],
            getCompanyUrl: process.env.VUE_APP_URLBack + "/company/usersCompany",
            cats: [],
            token: "",
            id_company: "",
            displayNewCompany: false,
            publicS: 'public',
            name: '',
            description: '',
            address: '',
            nif: '',
            cae: '',
            legalForm: ''
        }
    },
    mounted() {
        this.token = JSON.parse(localStorage.getItem('token'))
        this.callInfoCompanies();

    },
    methods: {
        //Load Company when mounted
        callInfoCompanies() {
            var token = this.token
            axios.get(this.getCompanyUrl, { headers: { token: token } })
                .then(response => {
                    // console.log("Server Response:", response);
                    if (response.status !== 200) {
                        this.error = response;
                        return;
                    }
                    this.username = response.data.company[0].user
                    this.companyLength = response.data.companyLength;
                    this.cats = response.data.company;
                    // console.log(this.cats)
                })
                .catch(error => {
                    // Request failed.
                    console.log("error", error.response);
                    this.error = error.response;
                });
        },
        displayNewCompanyModal() {
            this.displayNewCompany = true
        },
        registerCompany() {
            let name = this.name
            let description = this.description
            let address = this.address
            let nif = this.nif
            let cae = this.cae
            let legalForm = this.legalForm
            let state = this.publicS
            store.dispatch('registerCompany', { name, description, address, nif, cae, legalForm, state })
                .then(() => {
                    // console.log('teste')
                    // this.$router.push('/companyInfo?id_company='+this.nif)
                })
                .catch(err =>
                    console.log(err))
        },
        toggle(event) {
            this.$refs.menu.toggle(event);
        },
        idCompany(id_company) {
            this.id_company = id_company
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