/*
document.querySelector('#cep-input').addEventListener('input', function () {
    const cep = this.value.replace(/\D/g, ''); 
    const estado = document.querySelector('#estado');
    const cidade = document.querySelector('#cidade');
    const bairro = document.querySelector('#bairro');
    const rua = document.querySelector('#rua');


    if (cep.length === 8) {
        axios.get(`https://brasilapi.com.br/api/cep/v2/${cep}`)
            .then(response => {
                const data = response.data;
                estado.value = data.state || '';
                cidade.value = data.city || '';
                bairro.value = data.neighborhood || '';
                rua.value = data.street || '';
            })
            .catch(error => {
                console.error('Erro ao buscar o CEP:', error);
                alert('CEP NÃO ENCONTRADO');
  
                estado.value = '';
                cidade.value = '';
                bairro.value = '';
                rua.value = '';
            });
    } else {
        estado.value = '';
        cidade.value = '';
        bairro.value = '';
        rua.value = '';
    }
});
*/

document.querySelector('#cep-input').addEventListener('input', async (event) => {
    const cep = event.target.value.replace(/\D/g, ''); 
    const estado = document.querySelector('#estado');
    const cidade = document.querySelector('#cidade');
    const bairro = document.querySelector('#bairro');
    const rua = document.querySelector('#rua');

    if (cep.length === 8) {
        try {
            const response = await axios.get(`https://brasilapi.com.br/api/cep/v2/${cep}`);
            const data = response.data;
            estado.value = data.state || '';
            cidade.value = data.city || '';
            bairro.value = data.neighborhood || '';
            rua.value = data.street || '';
        } catch (error) {
            console.error('Erro ao buscar o CEP:', error);
            alert('CEP NÃO ENCONTRADO');
    
            estado.value = '';
            cidade.value = '';
            bairro.value = '';
            rua.value = '';
        }
    } else {
        estado.value = '';
        cidade.value = '';
        bairro.value = '';
        rua.value = '';
    }
});
