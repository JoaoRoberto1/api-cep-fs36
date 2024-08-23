document.querySelector('#cep-input').addEventListener('input', function () {
    const cep = this.value.replace(/\D/g, '');
    const cepInput = document.querySelector('#cep-input')
    const estado = document.querySelector('#estado')
    const cidade = document.querySelector('#cidade')
    const bairro = document.querySelector('#bairro')
    const rua = document.querySelector('#rua')
    const noCep = 'CEP não encontrado'
    if (cep.length === 8) {
        fetch(`https://brasilapi.com.br/api/cep/v2/${cep}`)
            .then(response => response.json())
            .then(data => {
                if (data && !data.errors) {
                    estado.value = data.state || '';
                    cidade.value = data.city || '';
                    bairro.value = data.neighborhood || '';
                    rua.value = data.street || '';
                } else {
                    throw new Error('CEP não encontrado');
                }
            })
            .catch(error => {
                console.error('Erro ao buscar o CEP:', error);
                alert('CEP NÃO ENCONTRADO')
            });
    } else {
        estado.value = '';
        cidade.value = '';
        bairro.value = '';
        rua.value = '';
    }
})

/* const cidadesPorEstado = {
    'AC': ['Acrelândia', 'Brasileia', 'Cruzeiro do Sul', 'Feijó', 'Rio Branco'],
    'AL': ['Maceió', 'Arapiraca', 'Palmeira dos Índios', 'São Miguel dos Campos'],
    'AP': ['Macapá', 'Santana', 'Laranjal do Jari', 'Oiapoque'],
    'AM': ['Manaus', 'Parintins', 'Itacoatiara', 'Tefé'],
    'BA': ['Salvador', 'Feira de Santana', 'Vitória da Conquista', 'Ilhéus'],
    'CE': ['Fortaleza', 'Caucaia', 'Juazeiro do Norte', 'Sobral'],
    'DF': ['Brasília', 'Ceilândia', 'Taguatinga', 'Gama'],
    'ES': ['Vitória', 'Serra', 'Vila Velha', 'Cariacica'],
    'GO': ['Goiânia', 'Anápolis', 'Rio Verde', 'Aparecida de Goiânia'],
    'MA': ['São Luís', 'Imperatriz', 'Caxias', 'Timon'],
    'MT': ['Cuiabá', 'Várzea Grande', 'Rondonópolis', 'Sinop'],
    'MS': ['Campo Grande', 'Dourados', 'Três Lagoas', 'Corumbá'],
    'MG': ['Belo Horizonte', 'Uberlândia', 'Juiz de Fora', 'Betim'],
    'PA': ['Belém', 'Ananindeua', 'Santarem', 'Marabá'],
    'PB': ['João Pessoa', 'Campina Grande', 'Santa Rita', 'Patos'],
    'PR': ['Curitiba', 'Londrina', 'Maringá', 'Ponta Grossa'],
    'PE': ['Recife', 'Olinda', 'Jaboatão dos Guararapes', 'Caruaru'],
    'PI': ['Teresina', 'Parnaíba', 'Picos', 'Floriano'],
    'RJ': ['Rio de Janeiro', 'Niterói', 'Campos dos Goytacazes', 'Duque de Caxias'],
    'RN': ['Natal', 'Mossoró', 'Parnamirim', 'Santa Cruz'],
    'RS': ['Porto Alegre', 'Caxias do Sul', 'Pelotas', 'Santa Maria'],
    'RO': ['Porto Velho', 'Ji-Paraná', 'Humaitá', 'Vilhena'],
    'RR': ['Boa Vista', 'Rorainópolis', 'Caracaraí', 'Mucajaí'],
    'SC': ['Florianópolis', 'Joinville', 'Blumenau', 'Chapecó'],
    'SP': ['São Paulo', 'Campinas', 'Santos', 'Sorocaba'],
    'SE': ['Aracaju', 'Nossa Senhora do Socorro', 'Lagarto', 'Itabaiana'],
    'TO': ['Palmas', 'Araguaína', 'Gurupi', 'Porto Nacional']
};

document.getElementById('estado').addEventListener('change', function() {
    const estado = this.value;
    const cidadeSelect = document.getElementById('cidade');

    cidadeSelect.innerHTML = '<option value="" selected>Selecione a cidade...</option>';

    if (estado && cidadesPorEstado[estado]) {
        cidadeSelect.disabled = false;
        cidadesPorEstado[estado].forEach(cidade => {
            const option = document.createElement('option');
            option.value = cidade;
            option.textContent = cidade;
            cidadeSelect.appendChild(option);
        });
    } else {
        cidadeSelect.disabled }}) */


        // const estadoSelect = document.getElementById('estado');
        // const cidadeSelect = document.getElementById('cidade');
        
        // async function buscarCidadesPorEstado(estado) {
        //     try {
              
        //         const response = await fetch(`https://api.example.com/cidades?estado=${estado}`);
                
        //         if (!response.ok) {
        //             throw new Error(`HTTP error! Status: ${response.status}`);
        //         }
        
        //         const cidades = await response.json();
        
                
        //         console.log('Cidades recebidas:', cidades);
        
         
        //         cidadeSelect.innerHTML = '<option value="" selected>Selecione a cidade...</option>';
                
        //         cidades.forEach(cidade => {
        //             const option = document.createElement('option');
        //             option.value = cidade.nome; 
        //             option.textContent = cidade.nome; 
        //             cidadeSelect.appendChild(option);
        //         });
        
        //         cidadeSelect.disabled = false;
        //     } catch (error) {
        //         console.error('Erro ao buscar cidades:', error);
        //         cidadeSelect.disabled = true;
        //         cidadeSelect.innerHTML = '<option value="" selected>Erro ao carregar cidades</option>';
        //     }
        // }
        
        // estadoSelect.addEventListener('change', function() {
        //     const estado = this.value;
        //     if (estado) {
        //         buscarCidadesPorEstado(estado);
        //     } else {
        //         cidadeSelect.disabled = true;
        //         cidadeSelect.innerHTML = '<option value="" selected>Selecione a cidade...</option>';
        //     }
        // });
        
        // document.getElementById('cep-input').addEventListener('blur', async function() {
        //     const cep = this.value.replace(/\D/g, '');
        //     if (cep.length === 8) {
        //         try {
        //             const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                    
        //             if (!response.ok) {
        //                 throw new Error(`HTTP error! Status: ${response.status}`);
        //             }
        
        //             const data = await response.json();
        
        //             if (data.erro) {
        //                 alert('CEP não encontrado.');
        //                 return;
        //             }
        
        //             document.getElementById('estado').value = data.uf;
        //             document.getElementById('cidade').value = data.localidade;
        //             document.getElementById('bairro').value = data.bairro;
        //             document.getElementById('rua').value = data.logradouro;
        
        //             buscarCidadesPorEstado(data.uf);
        
        //         } catch (error) {
        //             console.error('Erro ao buscar CEP:', error);
        //             alert('Erro ao buscar CEP.');
        //         }
        //     }
        // });
        
        