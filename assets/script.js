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
const estoque = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151]
const pokedex = []
const mostraPokedex = document.getElementById('pokedex') 
const pokedexLista = document.getElementById('pokedexLista')
let numeroPokemon = 1
let carregado = false
let capturados = 1
let placar = document.getElementById('placar')
let iniciar = false
let capturado = false
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
    for (let index = 1; index <= 151; index++) {
        pokedexLista.innerHTML += `<li><span class="pokedexTexto">ID#${index}</span><img src="assets/img/interrogacao.png" class="pokedexItem" alt=""></li>`
    }
    for (let index = 0; index < pokedex.length; index++) {
        let lis = document.querySelectorAll('li');
        lis[index].innerHTML = `<span class="pokedexTexto">ID#${index+1}</span><img src="assets/img/pokedex/pokemon (${pokedex[index]}).png" class="pokedexItem" alt="">`
    }
    
}

function mostrarPokedex() {
    mostraPokedex.style.display='flex'
    reiniciar.style.top='426px'
    reiniciar.style.right='356px'
    pokedexBtn.style.display='none'
    if(x < 600){
       reiniciar.style.top='500px'
       reiniciar.style.left='119px'
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
 }

 if (capturados > 50){
    pokemon.style.animationDuration='2s'
 }

 if (capturados > 100){
    pokemon.style.animationDuration='1.5s'
 }

 if (capturados > 130){
    pokemon.style.animationDuration='1.3s'
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