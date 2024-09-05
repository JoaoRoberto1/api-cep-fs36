const cep = document.querySelector('#cep')
const numero = document.querySelector('#numero')

const carregarListaEstados = async () => {
    const ufSelect = document.querySelector('#uf');
  
    const res = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados`);
    //console.log('estados', res.data);
  
    const listaEstados = res.data;
    //const listOption = res.data.map(u => );
  
    let optionEstados = '';
  
    listaEstados.forEach((estado) => {
      //console.log(`<option value="${estado.sigla}">${estado.nome}</option>`)
  
      optionEstados = optionEstados + `<option value="${estado.sigla}">${estado.nome}</option>`;
    });
  
    console.log('optionEstados', optionEstados);
   
    ufSelect.textHTML = optionEstados;
  }
  
  carregarListaEstados();