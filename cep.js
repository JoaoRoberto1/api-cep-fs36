// Seleciona os elementos do formulário
const cep = document.querySelector("#cep");
const numero = document.querySelector("#numero");
const logradouro = document.querySelector("#logradouro");
const bairro = document.querySelector("#bairro");
const estadoSelect = document.querySelector("#estado");
const cidadeSelect = document.querySelector("#cidade");

// Cria a div para o mapa
const divMap = document.querySelector("#map");

// Função para obter os estados da API do IBGE
const carregarEstados = async () => {
  try {
    const res = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
    const estados = res.data;

    estados.forEach(estado => {
      const option = document.createElement('option');
      option.value = estado.sigla;
      option.text = estado.nome;
      estadoSelect.appendChild(option);
    });
  } catch (error) {
    console.error('Erro ao carregar estados:', error);
  }
};

// Função para carregar as cidades de um estado
const carregarCidades = async (uf) => {
  try {
    const res = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`);
    const cidades = res.data;

    // Limpa as opções anteriores
    cidadeSelect.innerHTML = '<option value="" selected>Selecione a cidade...</option>';
    cidadeSelect.disabled = false;

    cidades.forEach(cidade => {
      const option = document.createElement('option');
      option.value = cidade.nome;
      option.text = cidade.nome;
      cidadeSelect.appendChild(option);
    });
  } catch (error) {
    console.error('Erro ao carregar cidades:', error);
  }
};

// Evento para carregar as cidades quando um estado é selecionado
estadoSelect.addEventListener('change', (e) => {
  const uf = e.target.value;
  if (uf) {
    carregarCidades(uf);
  } else {
    cidadeSelect.innerHTML = '<option value="" selected>Selecione a cidade...</option>';
    cidadeSelect.disabled = true;
  }
});

// Função que consulta o CEP na API BrasilAPI
const consultaCep = async () => {
  const cepValue = cep.value;
  
  if (cepValue.length === 8) {
    try {
      const res = await axios.get(`https://brasilapi.com.br/api/cep/v2/${cepValue}`);
      const data = res.data;
      
      preencherCampos(data);  // Preenche os campos com a resposta da API
      numero.focus();  // Foca no campo número após preencher o resto
      
      showMap(data.location.coordinates.latitude, data.location.coordinates.longitude, data.street);  // Exibe o mapa com as coordenadas
    } catch (error) {
      console.error("Erro ao consultar o CEP:", error);
    }
  }
};

// Preenche os campos de endereço com os dados da API
const preencherCampos = (data) => {
  logradouro.value = data.street;
  bairro.value = data.neighborhood;
  estadoSelect.value = data.state;
  carregarCidades(data.state);  // Carrega as cidades do estado automaticamente
  cidadeSelect.value = data.city;
};

// Função para exibir o mapa com as coordenadas usando Leaflet.js
function showMap(lat, lng, street) {
  const position = [parseFloat(lat), parseFloat(lng)];

  // Cria um novo mapa na div "map"
  const map = L.map('map').setView(position, 15);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  L.marker(position).addTo(map)
    .bindPopup(street)
    .openPopup();
}

cep.addEventListener("input", consultaCep);


carregarEstados();

const limparMapa = () => {
  divMap.innerHTML = "";
};

document.querySelector("#btn-limpar").addEventListener("click", limparMapa);
