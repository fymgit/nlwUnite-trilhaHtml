
let participantes = [
  {
    nome: "Mayk",
    email: "mayk@cmail.com",
    dateSubscription: new Date(2024, 2, 22, 19, 20),
    dateCheckin: new Date(2024, 2, 25, 22, 00),
  },
  {
    nome: "João",
    email: "joao@gmail.com",
    dateSubscription: new Date(2024, 1, 15, 14, 30),
    dateCheckin: new Date(2024, 2, 20, 9, 45),
  },
  {
    nome: "Maria",
    email: "maria@yahoo.com",
    dateSubscription: new Date(2024, 0, 5, 10, 0),
    dateCheckin: new Date(2024, 1, 10, 17, 30),
  },
  {
    nome: "Pedro",
    email: "pedro@hotmail.com",
    dateSubscription: new Date(2024, 2, 8, 8, 15),
    dateCheckin: new Date(2024, 2, 15, 12, 10),
  },
  {
    nome: "Ana",
    email: "ana@example.com",
    dateSubscription: new Date(2024, 1, 18, 16, 45),
    dateCheckin: new Date(2024, 2, 21, 20, 20),
  },
  {
    nome: "Carlos",
    email: "carlos@outlook.com",
    dateSubscription: new Date(2024, 1, 3, 21, 0),
    dateCheckin: new Date(2024, 1, 28, 11, 55),
  },
  {
    nome: "Laura",
    email: "laura@mail.com",
    dateSubscription: new Date(2024, 0, 30, 12, 10),
    dateCheckin: new Date(2024, 2, 1, 8, 40),
  },
  {
    nome: "Fernanda",
    email: "fernanda@gmail.com",
    dateSubscription: new Date(2024, 1, 5, 17, 30),
    dateCheckin: new Date(2024, 1, 10, 14, 20),
  },
  {
    nome: "Rafael",
    email: "rafael@yahoo.com",
    dateSubscription: new Date(2024, 0, 10, 9, 45),
    dateCheckin: new Date(2024, 0, 15, 18, 30),
  },
  {
    nome: "Sara",
    email: "sara@hotmail.com",
    dateSubscription: new Date(2024, 2, 1, 20, 30),
    dateCheckin: null,
  }
];


const criarNovoParticipante = (participante) => {

  const subscription = dayjs(Date.now()).to(participante.dateSubscription)
  let check = dayjs(Date.now()).to(participante.dateCheckin)

  if(participante.dateCheckin == null) {
    check = `
      <button
        data-email="${participante.email}"
        onclick="doCheckin(event)"
      >Fazer Check-in</button>
    `
  }

  return `
    <tr>
      <td>
        <strong>${participante.nome}</strong>
        <br/>
        <small>${participante.email}</small>
      </td>
      <td>${subscription}</td>
      <td>${check}</td>
    </tr>
  `
}


const atualizarLista = (participantes) => {
  //pegar info do html
  //loop
  let output = ''
  for (let item of participantes) {
    output = output + criarNovoParticipante(item)
  }

  //substituir info do html
  document.querySelector('tbody').innerHTML = output
}

atualizarLista(participantes)


const addParticipant = (e) => {
  e.preventDefault()

  const formData = new FormData(e.target)
  //formData.get('name', 'email')

  const participanteObj = {
    nome: formData.get('nome'),
    email:  formData.get('email'),
    dateSubscription: new Date(),
    dateCheckin: null,
  }

  //verificar se o participante já existe
  const participanteExiste = participantes.find((p) => {
    return p.email == participanteObj.email
  })

  if(participanteExiste) {
    alert('Email já cadastrado!')
    return
  }

  participantes = [participanteObj, ...participantes]
  atualizarLista(participantes)
  //limpar o form
  e.target.querySelector('[name="nome"]').value= ''
  e.target.querySelector('[name="email"]').value= ''
}


const doCheckin = (e) => {
  
  if(confirm('Tem certeza em fazer o check-in?') === false) {
    return 
  }

  //encontrar o participante dentro da lista
  const participante = participantes.find((p) => {
    return p.email == e.target.dataset.email
  })
  //atualizar o check-in do participante
  participante.dateCheckin = new Date()
  //atualizar a lista com a info nova
  atualizarLista(participantes)

}