<template>
    <div class="">
        <h2 style="text-align: center;"> {{ companyName }}</h2>
        <Toolbar>
            <template v-slot:left>
                <Button label="Regras gerais do Balanço" icon="pi pi-fw pi-sliders-v" style="margin-right: .5em"
                    @click="rulesBalanco()" />
                    <Button v-if="path != '/balanco' " label="Balanço" icon="pi pi-fw pi-sliders-v" style="margin-right: .5em"
                    @click="balanco()" />
                    <Button v-if="path != '/demonstracaoResultados' " label="Demonstração de Resultados" icon="pi pi-fw pi-sliders-v" style="margin-right: .5em"
                    @click="backButtonMeses()" />
                    <Button v-if="path != '/racios' " label="Rácios" icon="pi pi-fw pi-sliders-v" style="margin-right: .5em"
                    @click="backButtonRacios()" />
                <Button v-if="path == '/demonstracaoResultados' " label="Mais Detalhes" @click="MaisDetalheButton()"></Button>
            </template>
            <template v-slot:right>
                <Button v-if="path == '/demonstracaoResultadosMeses'" label="Voltar ao DR" @click="backButtonMeses()"  icon="pi pi-fw pi-angle-left" style="margin-right: .5em" ></Button>
                <Button v-if="path != '/companyView'" label="Voltar pagina inicial" @click="backButton()"  icon="pi pi-fw pi-angle-double-left" style="margin-right: .5em"></Button>
            </template>
        </Toolbar>
    </div>
</template>
<script>

import axios from "axios";
import { store } from '../store'
import moment from 'moment'
// import fs from 'fs'
// import xml2js from 'xml2js'


export default {
    props: {
        companyName: String,
        id_company: String,
        username: String,
        token: String,
        layoutVerification: Number
    },
    data() {
        return {
            path: "",

        }
    },

    beforeMount() {
       
        console.log(this.$route.path)
        this.path = this.$route.path
        this.saftID = this.$route.query.saftid;
       
    },
    methods: {
        //--------------------------------------------------------------------------~
        backButton(){
            window.location = window.location.protocol+ '/companyView?id_company='+ this.id_company 
        },
        backButtonMeses(){
            window.location = window.location.protocol+ '/demonstracaoResultados?id_company='+ this.id_company + '&saftid='+ this.saftID
        },
        backButtonRacios(){
            window.location = window.location.protocol+ '/racios?id_company='+ this.id_company + '&saftid='+ this.saftID
        },
        MaisDetalheButton(){
            window.location = window.location.protocol+ '/demonstracaoResultadosMeses?id_company='+ this.id_company + '&saftid='+ this.saftID
        },
       rulesBalanco() {
            window.location = window.location.protocol + 'rulesCompany?id_company=' + this.id_company
        },
        balanco() {
            window.location = window.location.protocol + 'balanco?id_company=' + this.id_company  + '&saftid='+ this.saftID
        },

    }
}
</script>

