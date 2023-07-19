import axios from 'axios'
import {store} from '../store'

export const actions= ({
  login({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      //  commit('auth_request')
      let url = process.env.VUE_APP_URLBack + '/user/login'
      // console.log(data.email, data.password, url)
      axios({
          url: process.env.VUE_APP_URLBack + '/user/login',
          data: {
            email: data.email,
            password: data.password
          },
          method: 'POST'
        })
        .then(resp => {
          // console.log(resp)
          const token = resp.data.token
          const user = resp.data.user

          localStorage.setItem('token', JSON.stringify(token))
          localStorage.setItem('username', JSON.stringify(user.username))
          
          // localStorage.setItem('username', JSON.stringify(token))
          // console.log('teste localStorage' + localStorage.getItem('token'))
          // Add  the following line:
          axios.defaults.headers.common['Authorization'] = token
            store.commit('SET_USER', user)
          store.commit('SET_TOKEN', token)
          resolve(resp)
          // console.log('Logged in', user)
          //  this.$router.push(data.redirect ? data.redirect : '/')
        })
        .catch(err => {
          store.commit('AUTH_ERROR')
          commit('AUTH_ERROR')
          console.log(err)
          reject(err)
          console.log('Cannot log in', data)
          alert("Wrong password or email")
        })
    })
  },
  register({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      //  commit('auth_request')
      let url = process.env.VUE_APP_URLBack + '/user/register'
      if (data.password != data.password2){
        alert("Password doesn't match")

      }else{
        console.log(data.email, data.password, data.password2, data.profession.value, data.username, url)
      axios({
          url: process.env.VUE_APP_URLBack + '/user/register',
          data: {
            email: data.email,
            password: data.password,
            password2: data.password2,
            profession: data.profession.value,
            username: data.username
          },
          method: 'POST'
        })
        .then(resp => {
          console.log(resp)
          window.location.pathname = '/'
        })
        .catch(err => {
          commit('AUTH_ERROR')
          console.log(err)
          reject(err)
          console.log('Cannot register', data)
          alert("Email already exists")
        })
      }
      
    })
  },
  newCompany({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      //  commit('auth_request')
      let url = process.env.VUE_APP_URLBack + '/company/registerCompany'
      console.log(data.email, data.password, data.password2, data.profession, data.username, url)
      axios({
          url: url,
          data: {
            email: data.email,
            password: data.password,
            password2: data.password2,
            profession: data.profession,
            username: data.username
          },
          method: 'POST'
        })
        .then(resp => {
          console.log(resp)

        })
        .catch(err => {
          commit('AUTH_ERROR')
          console.log(err)
          reject(err)
          console.log('Cannot register', data)


        })
    })
  },
  logout() {
    return new Promise((resolve, reject) => {
      store.commit('logout')
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']
      localStorage.clear()
      window.location.pathname = '/'
      console.log(reject)
      resolve()
    })
  },
  registerCompany({
    commit
  }, data) {
    var token = JSON.parse(localStorage.getItem('token'))
    return new Promise((resolve, reject) => {
      //  commit('auth_request')
      console.log(localStorage.getItem('token'))
      console.log(data.name)
      axios({
          url: process.env.VUE_APP_URLBack + '/company/registerCompany',
          data: { 
            name: data.name,
            description: data.description,
            address: data.address,
            nif: data.nif,
            cae: data.cae,
            legalForm: data.legalForm,
            state: data.state
          },
          method: 'POST',
          headers: {
            token: token
          }
        })
        .then(resp => {
          console.log(resp)
          if(resp.status === 202){
            alert(resp.data.error)
          } else{
        //  this.$router.push(data.redirect ? data.redirect : '/id_company='+data.nif)
         window.location = window.location.protocol+'company'
          }
        })
        .catch(err => {
          commit('AUTH_ERROR')
          console.log(err)
          reject(err)
          console.log('Cannot register', data, token)

        })
    })
  },
  infoCompanies({
    commit
  }) {
    return new Promise((resolve, reject) => {
      //  commit('auth_request')
      axios({
          url: process.env.VUE_APP_URLBack + '/company/infoCompanies',
          method: 'GET'
        })
        .then(resp => {
          // console.log(resp.data.company)
          store.commit('SET_COMPANIES', resp.data.company)
          //  this.$router.push(data.redirect ? data.redirect : '/login')
        })
        .catch(err => {
          commit('AUTH_ERROR')
          console.log(err)
          reject(err)
          console.log('Cannot')
        })
    })
  },
  updateUser({
    commit
  }, data) {
    var token = JSON.parse(localStorage.getItem('token'))
    return new Promise((resolve, reject) => {
      //  commit('auth_request')
      console.log(process.env.VUE_APP_URLBack + "/user/updateUser")
      axios({
          url: process.env.VUE_APP_URLBack + '/user/updateUser',
          data: {
            name: data.name,
            last_name: data.last_name,
            profession: data.newProfession,
            address: data.address,
            postalCode: data.postalCode,
            country: data.country,
            city: data.city,
            phone: data.phone,
            password: data.password,
            password2: data.password2,
          },
          method: 'POST',
          headers: {
            token: token
          }
        })
        .then(resp => {
          console.log(resp)
          window.location.pathname = '/profile'
        })
        .catch(err => {
          commit('AUTH_ERROR')
          console.log(err)
          reject(err)
          console.log('Cannot Update', data, token)
        })
    })
  },
  updatePassword({
    commit
  }, data) {
    var token = JSON.parse(localStorage.getItem('token'))
    var tokenBlockchain = JSON.parse(localStorage.getItem('tokenBlockchain'))
    return new Promise((resolve, reject) => {
      //  commit('auth_request')
      axios({
          url: process.env.VUE_APP_URLBack + '/user/updatePassword',
          data: {
            password: data.password,
            password2: data.password2,
            oldPassword : data.oldPassword
          },
          method: 'POST',
          headers: {
            token: token
          }
        })
        .then(resp => {
          window.location.pathname = '/profile'
        })
        .catch(err => {
          commit('AUTH_ERROR')
          console.log(err)
          reject(err)
          console.log('Cannot Update', data, token)
        })
    })
  },
  infoCompany({
    commit
  }) {
    return new Promise((resolve, reject) => {
      //  commit('auth_request')
      axios({
          url: process.env.VUE_APP_URLBack + '/company/infoCompanies',
          method: 'GET'
        })
        .then(resp => {
          console.log(resp.data.company)
          store.commit('SET_COMPANIES', resp.data.company)
          //  this.$router.push(data.redirect ? data.redirect : '/login')
        })
        .catch(err => {
          commit('AUTH_ERROR')
          console.log(err)
          reject(err)
          console.log('Cannot')
        })
    })
  },
  editCompany({
    commit
  }, data) {
    var token = JSON.parse(localStorage.getItem('token'))
    return new Promise((resolve, reject) => {
      //  commit('auth_request')
      console.log(localStorage.getItem('token'))
      axios({
          url: process.env.VUE_APP_URLBack + '/company/editCompany',
          data: {
            name: data.name,
            description: data.description,
            address: data.address,
            nif: data.nif,
            cae: data.cae,
            legalForm: data.legalForm,
            id_company: data.id_company,
            username: data.username,
            state: data.state
          },
          method: 'POST',
          headers: {
            token: token
          }
        })
        .then(resp => {
          console.log(resp)
          alert(resp.data.msg)
            window.location.pathname = 'companyInfo' 
            window.location.search = "?id_company=" + resp.data.id_company
            window.location = window.location.protocol+'companyInfo?id_company='+data.nif

          //  this.$router.push(data.redirect ? data.redirect : "companyInfo?id_company=" + resp.data.id_company)
        })
        .catch(err => {
          commit('AUTH_ERROR')
          console.log(err)
          reject(err)
          console.log('Cannot register', data, token)
        })
    })
  },
  registerTransaction({
    commit
  }, data) {
    var token = JSON.parse(localStorage.getItem('token'))
    var tokenBlockchain = JSON.parse(localStorage.getItem('tokenBlockchain'))
    // var username = JSON.parse(localStorage.getItem('user'))
    return new Promise((resolve, reject) => {
      //  commit('auth_request')
      console.log(localStorage.getItem('token'))
      console.log(tokenBlockchain)
      axios({
          url: process.env.VUE_APP_URLBack + '2/contracts/mybalance/0x43de30fd4e51ad98654ff3a4f132cf928423a3f2',
          headers: { Authorization: tokenBlockchain },
          method: 'GET'
        })
        .then(resp => { 
          console.log(resp)
          axios({
            url: process.env.VUE_APP_URLBack + '2/contracts/transfer',
            data: {
              name: data.username,
              customer: data.username,
              contract: "0x43de30fd4e51ad98654ff3a4f132cf928423a3f2",
              toAcccount : "0x7f72a7Efe035cCDD352d05189ed2195F83Bf9D88",
              account: resp.data.Account ,
              privateKey: resp.data.privatekey,
              amount: data.total_price
            },
            method: 'POST',
            headers: {
              Authorization: tokenBlockchain
            }
          })
          .then(resp2 => { 
            console.log(resp2)
            axios({
                url: process.env.VUE_APP_URLBack + '/transaction/registerTransaction',
                data: { 
                  id_company: data.id_company,
                  price: data.price,
                  month : data.month,
                  companyName: data.companyName,
                  total_price: data.total_price
                },
                method: 'POST',
                headers: {
                  token: token
                }
              })
              .then(resp3 => { 
                console.log(resp3)
                window.location = window.location.protocol+'companyInfo?id_company='+ data.id_company
              })
              .catch(err => {
                commit('AUTH_ERROR')
                console.log(err)
                reject(err)
                console.log('Cannot register', data, token)
          })
          .catch(err => {
            commit('AUTH_ERROR')
            console.log(err)
            reject(err)
            console.log('Cannot register')
            })
        })
      })
    })
  },
  getValidSaftCs1({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      //  commit('auth_request')
      console.log(data)
      axios({
          url: process.env.VUE_APP_URLBack + '/compare/getValidSaftCs1',
          data: {
            id_company: data.idCompany,
            dataInicio: data.dataInicioFaturaComparacaoSAFT,
            dataFim: data.dataFimFaturaComparacaoSAFT
          },
          method: 'POST'
        })
        .then(resp => {
          console.log(resp)
          window.location = window.location.protocol+'compareSaft?id_company='+data.idCompany+'&dataInicio='+data.dataInicioFaturaComparacaoSAFT+'&dataFim='+data.dataFimFaturaComparacaoSAFT
        })
        .catch(err => {
          commit('AUTH_ERROR')
          console.log(err)
          reject(err)
          console.log('Cannot')
        })
    })
  },
  verificarFaturas({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      //  commit('auth_request')
      console.log(data)
      async function getData() {

      return  axios({
          url: process.env.VUE_APP_URLBack + '/compare/verificarFaturas',
          data: {
            username: data.nifFatura,
            password: data.passwordFatura,
            dataFim: data.dataFimFatura,
            dataInicio: data.dataInicioFatura,
            id_company: data.idCompany
          },
          method: 'POST'
        })
        .then(resp => {
          console.log(resp)
          return data
        })
        .catch(err => {
          commit('AUTH_ERROR')
          console.log(err)
          reject(err)
          console.log('Cannot')
        })
      }
      getData().then(res => {
          console.log(res)
          window.location = window.location.protocol+'fatura?id_company='+res.idCompany+'&nif='+res.nifFatura+'&dataInicio='+res.dataInicioFatura+'&dataFim='+res.dataFimFatura
      } )
    })
  },
  updateRegra({
    commit
  }, data) {
    var token = JSON.parse(localStorage.getItem('token'))
    return new Promise((resolve, reject) => {
      console.log(data)
      axios({
          url: process.env.VUE_APP_URLBack + '/balanco/editBalancoRules',
          data: {
            id_company: data.id_company,
            account_idObject: data._idAccount,
            account: data.editRegraFinal
          },
          method: 'POST',
          headers: {
            token: token
          }
        })
        .then(resp => {
          console.log(resp)
          window.location = window.location.protocol+ '/rulesCompany?id_company='+ data.id_company
        })
        .catch(err => {
          commit('AUTH_ERROR')
          console.log(err)
          reject(err)
          console.log('Cannot Update', data, token)
        })
    })
  },
  addRegra({
    commit
  }, data) {
    var token = JSON.parse(localStorage.getItem('token'))
    return new Promise((resolve, reject) => {
      console.log(data)
      axios({
          url: process.env.VUE_APP_URLBack + '/balanco/addBalancoRules',
          data: {
            id_company: data.id_company,
            nome: data.nome,
            tipoBalanco: data.tipoBalanco,
            account: data.addRegraFinal
          },
          method: 'POST',
          headers: {
            token: token
          }
        })
        .then(resp => {
          console.log(resp)
          window.location = window.location.protocol+ '/rulesCompany?id_company='+ data.id_company
        })
        .catch(err => {
          commit('AUTH_ERROR')
          console.log(err)
          reject(err)
          console.log('Cannot Update', data, token)
        })
    })
  },
  removeRegra({
    commit
  }, data) {
    var token = JSON.parse(localStorage.getItem('token'))
    return new Promise((resolve, reject) => {
      console.log(data)
      axios({
          url: process.env.VUE_APP_URLBack + '/balanco/RemoveBalancoRules',
          data: {
            id_company: data.id_company,
            account_idObject: data.account_idObject
          },
          method: 'POST',
          headers: {
            token: token
          }
        })
        .then(resp => {
          console.log(resp)
          window.location = window.location.protocol+ '/rulesCompany?id_company='+ data.id_company
        })
        .catch(err => {
          commit('AUTH_ERROR')
          console.log(err)
          reject(err)
          console.log('Cannot Update', data, token)
        })
    })
  },

})