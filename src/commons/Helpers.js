import axios from '../../src/axios-orders'
export const verifyLoggedAdmin = () => {
    if(localStorage.getItem('id') == null){
        localStorage.removeItem('id')
        localStorage.removeItem('adm')
        localStorage.removeItem('userName')
    }else{
        axios.get('https://tisv-flood-control-api.herokuapp.com/users/' + localStorage.getItem('id'), {
          })
            .then(response => {
              localStorage.setItem('id', response.data.id)
              localStorage.setItem('userName', response.data.name)
              localStorage.setItem('adm', response.data.adm)
            })
            .catch(error => {
            });
    }
}

