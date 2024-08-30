const cep = document.querySelector('#cep');
const numero = document.querySelector('#numero');

async function preencherEstados() {
    try {
        const respostaLocalidade = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
        const estados = respostaLocalidade.data;
        
        estados.forEach(estado => {
            console.log(estado.nome);
        });

    } catch (erro) {
        console.error('Erro ao buscar os estados:', erro);
    }
    
    
}


// Chama a função para preencher os estados
preencherEstados();


// Call the function to populate states
preencherEstados();


const consultaCep = async () => {
  let cepValue = cep.value;
  console.log(cepValue);

  if (cepValue.length === 8) {
    try {
      const res = await axios.get(`https://brasilapi.com.br/api/cep/v2/${cepValue}`);
      console.log(res.data);

      preencherCampos(res.data);
      numero.focus();

    } catch (error) {
      console.error(error);
    }
  }
}

const preencherCampos = data => {
  const logradouro = document.querySelector('#logradouro');
  const bairro = document.querySelector('#bairro');
  const uf = document.querySelector('#uf');

  logradouro.value = data.street;
  bairro.value = data.neighborhood;
  uf.value = data.state;

}
