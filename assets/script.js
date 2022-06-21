const pikainicio = document.getElementById('pikainicio')
const pikachu = document.getElementById('pikachu')
const pokemon = document.getElementById('pokemon')
const bg = document.getElementById('bg')
const gameoverTela = document.getElementById('gameover')
const iniciarbtn = document.getElementById('iniciar')
const reiniciar = document.getElementById('reiniciar')
const pokedexBtn = document.getElementById('pokedexBtn')
const logo = document.getElementById('logo')
const mostraPlacar = document.getElementById('mostraPlacar')
const jumpBtn = document.getElementById('jumpbtn')
const pokebola = document.getElementById('pokeballCaptura')
const carregando = document.getElementById('carregando')
const telaInicial = document.getElementById('telaInicial')
let textoCentral = document.getElementById('textoCentral')
const pokedex = []
const mostraPokedex = document.getElementById('pokedex') 
const pokedexLista = document.getElementById('pokedexLista')
let numeroPokemon = 1
let carregado = false
let loading = true
let capturados = 1
let placar = document.getElementById('placar')
let iniciar = false
let gameover = false
let final = false
let capturado = false
let pokedexCarregada = false
let infoPoke = {}
let descPoke = {}
const tipos = document.getElementById('tipos')
const pokedexCapturados = document.getElementById('pokedexCapturados')
const pokedexCompletada = document.getElementById('pokedexCompletada')
x = window.screen.width;
y = window.screen.height;


// SONS
const music = document.getElementById('musica')
music.volume =0.04
const jumpSound = new Audio('assets/mp3/jump.mp3');
const capturaSound = new Audio('assets/mp3/captura.mp3');
const readyGo = new Audio('assets/mp3/readygo.mp3');
capturaSound.playbackRate = 2
capturaSound.volume =0.05
jumpSound.volume =0.1
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
    infoPoke = pokemons
})
Promise.all(descPromises)
.then(descricoes =>{
    
    descPoke = descricoes
})


}

fetchPokemon()

// FIM DO USO DA API





function carregar() {
    document.getElementById('info').style.display='none'
    carregando.style.display ='flex'
    var cache = document.createElement("CACHE");
    cache.style = "position:absolute;z-index:-1000;opacity:0;";
    document.body.appendChild(cache);

    
        for (let index = 1; index < 152; index++) {
            var img = new Image();
            img.src = `assets/img/pokemon/pokemon (${index}).gif`
            img.style = "position:absolute";
            cache.appendChild(img);   
        
        }
        cache.src = 'assets/img/pikaend.png'
        cache.src = 'assets/img/charizard.gif'
        cache.src = 'assets/img/eevee.gif'
        cache.src = 'assets/img/mew.gif'
        cache.src = 'assets/img/red.gif'
        cache.src = 'assets/img/hooh.gif'
        cache.style.display='none'
        loading= false
        if(!loading){
            setTimeout(()=>{
            carregando.style.display ='none'
            telaInicial.style.display ='flex'
            music.play()
            pikaInicio.play()
            if(x < 480){
            document.getElementById('instrucoesPC').style.display='none'    
            }
            },1000)
        }
        
        

}
        



function iniciaJogo(){
    gameover = false
    final = false
    document.getElementById('instrucoesPC').style.display='none'
    document.getElementById('instrucoesMobile').style.display='none'
    gameoverTela.style.display='none'
    iniciarbtn.style.display = 'none'
    pikainicio.style.display = 'none'
    mostraPlacar.style.display = 'block'
    pikachu.style.display = 'block'
    logo.style = 'position:absolute; width:300px;top: 20px;left: 10px;'
    music.src='assets/mp3/musica.mp3'
    textoCentral.style.display='flex'
    
    iniciar = true
    rodaJogo()
}

function reiniciaJogo(){
    pokemon.style.left ='1200px'
    mostraPokedex.style.display='none'
    pokedexBtn.style.display='none'
    reiniciar.style.display='none'
    pikachu.style.display = 'none'
    gameover = false
    final = false
    iniciar = false
    gameoverTela.style.display='none'
    iniciarbtn.style.display = 'block'
    pikainicio.style.display = 'block'
    mostraPlacar.style.display = 'block'
    pokemon.style.display ='none'
    
    music.src='assets/mp3/temaInicial.mp3'
}


function carregaPokedex() {
    if(!pokedexCarregada){
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
    pokedexCompletada.innerText =`Completada: ${(((capturados-1)*100)/151).toFixed(0)}%`
}
pokedexCarregada = true
    
}

function mostrarPokedex() {
    carregaPokedex()  
    mostraPokedex.style.display='flex'
    pokedexBtn.style.display='none'
    mostraPlacar.style.display='none'
    
}


function atualizaPokedex(id) {
    let liPoke = pokedexLista.children[id-1]
    let idPoke = document.getElementById('idPoke');
    let facePokemon = document.getElementById('faces');
    let nomePokedex = document.getElementById('nomePokedex');
    let nomeSelecionado = infoPoke[id-1].name
    let descricaoPoke = descPoke[id-1].flavor_text_entries[0].flavor_text
    let descricao = document.getElementById('descricao')
    let conteudoTipos = `<img src="assets/img/tipos/${infoPoke[id-1].types[0].type.name}.webp">`
    if(infoPoke[id-1].types[1]){
        conteudoTipos += `<img src="assets/img/tipos/${infoPoke[id-1].types[1].type.name}.webp">`
    }
    if(liPoke.classList.contains('capturado')){ 
    idPoke.innerText = `ID #${id}`
    facePokemon.src = `assets/img/pokemon/pokemon (${id}).gif`;
    nomePokedex.innerText = nomeSelecionado.toUpperCase();
    descricao.innerText = descricaoPoke.replace('\n','')
    tipos.innerHTML = conteudoTipos
    }
}

function fechaPokedex(){
    mostraPokedex.style.display='none'
    pokedexBtn.style.display='flex'
}


const jump =()=>{
   if(carregado){
    pikachu.classList.add('jump')
    jumpSound.play()
    setTimeout(()=>{
        pikachu.classList.remove('jump')
    },900)
}
}

function rodaJogo(){
    
    if(iniciar){
        setTimeout(()=>{readyGo.play()},500)
            setTimeout(()=>{
            textoCentral.style.display='none'
            document.getElementById('imgCentral').style.display='flex'
            setTimeout(()=>{document.getElementById('imgCentral').style.display='none'},1000)
            pokemon.style.display = 'block'
            },2000)

const loop = setInterval(()=>{
    if(gameover || final){
        clearInterval(loop)
        return
    }
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
    const pordosol = document.getElementById('porDoSol')
    pordosol.style.display ='flex'
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
    pikachu.style.animation='none'
    pikachu.style.bottom = '0'
    pikachu.src = 'assets/img/pikaend.png'
    pikachu.style.width= '100px'
    pikaBate.play()
    setTimeout(()=>{pikaFim.play()},500)
    music.pause()
    gameoverSound.play()
    bg.style.animation = 'none'
    bg.style.left = '0'
    pokemon.style.animation = 'none'
    pokemon.style.left = '80px'
    gameoverTela.style.display='block'
    gameoverTela.classList.add('gameoveranimation')
    gameoverTela.style.opacity='1'
    reiniciar.style.display='block'
    pokedexBtn.style.display='block'
    carregado = false
      
    gameover = true
    
}

if ( pokePosition < 115 ){
    pokebola.style.display = 'block'
    capturaSound.play()
    void pokebola.offsetWidth;
    setTimeout(()=>{pokebola.style.display = 'none'},1000)
        
 }

if ( pokePosition < 0){
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

 if(capturados == 152){
    final= true
    finalJogo()
 }

},15)
}
}


function finalJogo() {
    music.src='assets/mp3/musicaFinal.mp3'
    document.getElementById('ending').style.display='flex'
    textoCentral.innerText ='PARABÉNS! VOCÊ COMPLETOU A POKEDEX'
    textoCentral.style.display='flex'
    textoCentral.classList.remove('textoCentral')
    textoCentral.classList.add('crescetexto')
    setTimeout(()=>{
        textoCentral.style.display='none'
        pokedexBtn.style="display:flex;width:57px;position:absolute;top: 59px;right: 63px;border: none;z-index: 4;cursor: pointer;"
        document.getElementById('contPokemonFinal').style.display='flex'
        if (x <600){
            pokedexBtn.style="display:flex;width:57px;position:absolute;top: 211px;right: 16px;border: none;z-index: 4;cursor: pointer;"
        }
    },7000)

    setTimeout(()=>{
        document.getElementById('contPokemonFinal').innerHTML='<img src="assets/img/charizard.gif" id="correndoEsq"class="correndoEsq">'
        document.getElementById('contPokemonFinal').style.bottom='200px'
        document.getElementById('contPokemonFinal').classList.remove('pokemonFinal')
        document.getElementById('correndoEsq').style.width='400px'
        document.getElementById('contPokemonFinal').classList.add('pokemonFinal2')
    },16000)

    setTimeout(()=>{
        document.getElementById('contPokemonFinal').innerHTML='<img src="assets/img/red.gif" id="correndoEsq"class="correndoEsq">'
        document.getElementById('contPokemonFinal').style.bottom='30px'
        document.getElementById('correndoEsq').style.width='200px'
        document.getElementById('contPokemonFinal').classList.remove('pokemonFinal2')
        document.getElementById('contPokemonFinal').classList.add('pokemonFinal')
    },36200)

    setTimeout(()=>{
        document.getElementById('contPokemonFinal').innerHTML='<img src="assets/img/mew.gif" id="correndoEsq"class="correndoEsq">'
        document.getElementById('contPokemonFinal').style.bottom='400px'
        document.getElementById('correndoEsq').style.width='100px'
    },56000)

    setTimeout(()=>{
        document.getElementById('contPokemonFinal').innerHTML='<img src="assets/img/hooh.gif" id="correndoEsq"class="correndoEsq">'
        document.getElementById('contPokemonFinal').style.bottom='200px'
        document.getElementById('correndoEsq').style.width='200px'
        document.getElementById('correndoEsq').style.animationDuration='35s'
    },76000)

    setTimeout(()=>{document.getElementById('escureceTela').style.display='flex'},75000)
    setTimeout(()=>{document.getElementById('creditos').style.display='flex'},78000) 
}
document.addEventListener('keydown', jump)
document.addEventListener('click', jump)
