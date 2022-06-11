const pikainicio = document.getElementById('pikainicio')
const pikachu = document.getElementById('pikachu')
const pokemon = document.getElementById('pokemon')
const bg = document.getElementById('bg')
const gameover = document.getElementById('gameover')
const iniciarbtn = document.getElementById('iniciar')
const reiniciar = document.getElementById('reiniciar')
const logo = document.getElementById('logo')
const mostraPlacar = document.getElementById('mostraPlacar')
const jumpBtn = document.getElementById('jumpbtn')
let capturados = 0
let placar = document.getElementById('placar')
let iniciar = false
const music = document.getElementById('musica')
music.volume =0.03
const jumpSound = new Audio('assets/mp3/jump.mp3');
const gameoverSound = new Audio('assets/mp3/gameover.mp3');


function iniciaJogo(){
    iniciar = true
    music.play()
    jumpBtn.style.display = 'block'
    iniciarbtn.style.display = 'none'
    pikainicio.style.display = 'none'
    mostraPlacar.style.display = 'block'
    pikachu.style.display = 'block'
    pokemon.style.display = 'block'
    logo.style = 'width:300px;top: 10;left: 10px;'
}

const jump =()=>{
    pikachu.classList.add('jump')
    jumpSound.play()
    setTimeout(()=>{
        pikachu.classList.remove('jump')
    },1200)
}

const loop = setInterval(()=>{
    
if (iniciar){
const pokePosition = window.getComputedStyle(pokemon).left.replace('px','')
const pikaPosition = window.getComputedStyle(pikachu).bottom.replace('px','')
const pokeCapturado = pokemon.getBoundingClientRect().right.toFixed(0)
console.log(pokeCapturado)
if (pokePosition <= 125 && pokePosition > 0 && pikaPosition < 70){
    music.pause()
    gameoverSound.play()
    bg.style.animation = 'none'
    bg.style.left = '0'
    pokemon.style.animation = 'none'
    pokemon.style.left = `${pokePosition}px`
    pikachu.style.animation = 'none'
    pikachu.style.bottom = '0'
    pikachu.src = 'assets/img/pikaend.png'
    pikachu.style.width= '100px'
    gameover.classList.add('gameoveranimation')
    gameover.style.opacity='1'
    reiniciar.style.display='block'
    clearInterval(loop)
}

if (pokeCapturado <= 140 && pokeCapturado >= 135){
    pokemon.src=`assets/img/pokemon/pokemon (${Math.floor(Math.random() * 152)}).gif`
    capturados++
    placar.innerText = capturados;

    
}
iniciar = true
}},15)

// window.onload = ()=>{
//    
// }

document.addEventListener('keydown', jump)
