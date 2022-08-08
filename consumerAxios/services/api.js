const api = axios.create({
    baseURL: 'http://localhost:3000/',
    timeout: 1000,
    headers: {
        Authorization: "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqaG9uQGdtYWlsLmNvbSIsImlhdCI6MTY1OTkxMjkxNywiZXhwIjoxNjU5OTMwOTE3fQ.1vATfaQOluDMc_s38dk21wvmuTm8dc1U0mdaQadpNcg",
        "Content-type": 'application/json'
    }
});


api.get('games').then(resp => {
    console.log(resp.data);
    resp.data.forEach(game => {
        createGame(game)
    });
}).catch(err => {
    console.error(err)
})

function createGame(game) {
    const li = document.createElement('li')
    li.innerText = game.title
    li.setAttribute('id', game.id)
    deleteGame()
    const ul = document.querySelector('#games')
    ul.appendChild(li)
}

function saveGame(event, form) {
    event.preventDefault()
    console.log(form.children[0].value);
    let gameModel = {
        // id: Math.floor(Math.random() * 100),
        title: form.children[0].value,
        year: form.children[1].value,
        price: form.children[2].value,
    }
    console.log(gameModel);
    api.post('game', gameModel).then(resp => {
        console.log(resp);
    }).catch(err => {
        console.log(err);
    })
}
function deleteGame() {
    const items = document.querySelectorAll('#games li')
    items.forEach(i => {
        i.addEventListener('click', () => {
            api.delete(`game/${i.id}`).then(resp => {
                console.log(resp);
            }).catch(err => {
                console.error(err)
            })
        })
    })
    console.log('clicked', items);
}