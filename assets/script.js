const pikainicio = document.getElementById('pikainicio')
const pikachu = document.getElementById('pikachu')
const pokemon = document.getElementById('pokemon')
const bg = document.getElementById('bg')
const gameover = document.getElementById('gameover')
const iniciarbtn = document.getElementById('iniciar')
const reiniciar = document.getElementById('reiniciar')
const pokedexBtn = document.getElementById('pokedexBtn')
const logo = document.getElementById('logo')
const mostraPlacar = document.getElementById('mostraPlacar')
const jumpBtn = document.getElementById('jumpbtn')
const pokebola = document.getElementById('pokeballCaptura')
const carregando = document.getElementById('carregando')
const telaInicial = document.getElementById('telaInicial')

const pokedex = []
const mostraPokedex = document.getElementById('pokedex') 
const pokedexLista = document.getElementById('pokedexLista')
let numeroPokemon = 1
let carregado = false
let capturados = 1
let placar = document.getElementById('placar')
let iniciar = false
let capturado = false
let arrayPoke = {}
let descPoke = {}
const tipos = document.getElementById('tipos')
const pokedexCapturados = document.getElementById('pokedexCapturados')
const pokedexCompletada = document.getElementById('pokedexCompletada')
x = window.screen.width;
y = window.screen.height;


// SONS
const music = document.getElementById('musica')
music.volume =0.02
const jumpSound = new Audio('assets/mp3/jump.mp3');
const capturaSound = new Audio('assets/mp3/captura.mp3');
capturaSound.playbackRate = 2
capturaSound.volume =0.05
jumpSound.volume =0.08
const gameoverSound = new Audio('assets/mp3/gameover.mp3');
const pikaInicio = new Audio('assets/mp3/pikachuInicio.mp3');
const pikaFim = new Audio('assets/mp3/pikachuFim.mp3');
const pikaBate = new Audio('assets/mp3/pikachuBate.mp3');

// PEGANDO VALORES NA API 
const fetchPokemon = () => {
const getPokemonURL = id => `https://pokeapi.co/api/v2/pokemon/${id}`
const getDescricoes = id => `https://pokeapi.co/api/v2/pokemon-species/${id}`
const pokemonPromises = []
const descPromises = []
for (let i = 1; i <= 151; i++){
pokemonPromises.push(fetch(getPokemonURL(i)).then(response => response.json()))
descPromises.push(fetch(getDescricoes(i)).then(response => response.json()))
}

Promise.all(pokemonPromises)
.then(pokemons =>{
    arrayPoke = pokemons
})
Promise.all(descPromises)
.then(descricoes =>{
    descPoke = descricoes
    console.log(arrayPoke)
})


}

fetchPokemon()

// FIM DO USO DA API



setInterval(()=>{
    carregando.style.display ='none'
    telaInicial.style.display ='flex'
},1000)

function iniciaJogo(){
    iniciar = true
    gameover.style.display='none'
    music.play()
    iniciarbtn.style.display = 'none'
    pikainicio.style.display = 'none'
    mostraPlacar.style.display = 'block'
    pikachu.style.display = 'block'
    pokemon.style.display = 'block'
    logo.style = 'position:absolute; width:300px;top: 20px;left: 10px;'
    
}

function carregaPokedex() {
    let lis = document.querySelectorAll('li');
    for (let index = 1; index <= 151; index++) {
        pokedexLista.innerHTML += `
        <li id="${index}" onmouseenter="atualizaPokedex('${index}')"><img src="assets/img/interrogacao.png" class="pokedexItem">
        </li>`
    }
    for (let index = 0; index < pokedex.length; index++) {
        let lis = document.querySelectorAll('li');
        lis[index].classList.add('capturado')
        lis[index].innerHTML = `
        <img src="assets/img/pokedex/pokemon (${pokedex[index]}).png" class="pokedexImg" alt="">`
    }
    pokedexCapturados.innerText =`Capturados: ${capturados-1}`
    pokedexCompletada.innerText =`Completada: ${((capturados*100)/151).toFixed(0)}%`
    
}

function mostrarPokedex() {
    mostraPokedex.style.display='flex'
    reiniciar.style.top='426px'
    reiniciar.style.right='356px'
    pokedexBtn.style.display='none'
    mostraPlacar.style.display='none'
    gameover.style.display='none'
    logo.style.display='none'
    if(x < 600){
       reiniciar.style.top='500px'
       reiniciar.style.left='119px'
       }
}


function atualizaPokedex(id) {
    let liPoke = pokedexLista.children[id-1]
    let idPoke = document.getElementById('idPoke');
    let facePokemon = document.getElementById('faces');
    let nomePokedex = document.getElementById('nomePokedex');
    let nomeSelecionado = arrayPoke[id-1].name
    let descricaoPoke = descPoke[id-1].flavor_text_entries[0].flavor_text
    let descricao = document.getElementById('descricao')
    let conteudoTipos = `<img src="assets/img/tipos/${arrayPoke[id-1].types[0].type.name}.webp">`
    if(arrayPoke[id-1].types[1]){
        conteudoTipos += `<img src="assets/img/tipos/${arrayPoke[id-1].types[1].type.name}.webp">`
    }
    if(liPoke.classList.contains('capturado')){ 
    idPoke.innerText = `ID #${id}`
    facePokemon.src = `assets/img/pokemon/pokemon (${id}).gif`;
    nomePokedex.innerText = nomeSelecionado.toUpperCase();
    descricao.innerText = descricaoPoke.replace('\n','')
    tipos.innerHTML = conteudoTipos
    }
}

const jump =()=>{
   if(carregado){
    pikachu.classList.add('jump')
    jumpSound.play()
    setTimeout(()=>{
        pikachu.classList.remove('jump')
    },1000)
}
}

const loop = setInterval(()=>{
    
if (iniciar){
const pokePosition = window.getComputedStyle(pokemon).left.replace('px','')
const pikaPosition = window.getComputedStyle(pikachu).bottom.replace('px','')

if ( pokePosition < 600 ){
   carregado = true     
 }   


 if (capturados > 25){
    pokemon.style.animationDuration='2.5s'
    if(x < 600){
        pokemon.style.animationDuration='3.5s'
        }
 }

 if (capturados > 50){
    pokemon.style.animationDuration='2s'
    if(x < 600){
        pokemon.style.animationDuration='3s'
        }
 }

 if (capturados > 100){
    pokemon.style.animationDuration='1.5s'
    if(x < 600){
        pokemon.style.animationDuration='2.5s'
        }
 }

 if (capturados > 130){
    pokemon.style.animationDuration='1.3s'
    if(x < 600){
        pokemon.style.animationDuration='2.3s'
        }
 }


if (pokePosition <= 125 && pikaPosition < 50 && !capturado){
    pikaBate.play()
    setTimeout(()=>{pikaFim.play()},500)
    music.pause()
    gameoverSound.play()
    bg.style.animation = 'none'
    bg.style.left = '0'
    pokemon.style.animation = 'none'
    pokemon.style.left = '80px'
    pikachu.style.animation = 'none'
    pikachu.style.bottom = '0'
    pikachu.src = 'assets/img/pikaend.png'
    pikachu.style.width= '100px'
    gameover.style.display='block'
    gameover.classList.add('gameoveranimation')
    gameover.style.opacity='1'
    reiniciar.style.display='block'
    pokedexBtn.style.display='block'
    carregado = false
    carregaPokedex()
    
    
    clearInterval(loop)
    
}

if ( pokePosition < 115 ){
    pokebola.style.display = 'block'
    capturaSound.play()
    void pokebola.offsetWidth;
    setTimeout(()=>{pokebola.style.display = 'none'},1000)
        
 }

if ( pokePosition < 0 ){
    capturado = true
    pokemon.classList.remove('pokemon')
     capturados++
     placar.innerText = capturados-1;
     void pokemon.offsetWidth;
     pokemon.classList.add('pokemon')
     capturado = false
    setTimeout(()=>{pokebola.style.display = 'none'},1000)
    if(capturados ==1){}
    else{
        pokedex.push(capturados-1)
    }
    pokemon.src=`assets/img/pokemon/pokemon (${capturados}).gif`
    
     
 }

 
}},1)




document.addEventListener('keydown', jump)
document.addEventListener('click', jump)
