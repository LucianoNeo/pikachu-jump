const pikachu = document.getElementById('pikachu')
const pokemon = document.getElementById('pokemon')
const bg = document.getElementById('bg')
const gameover = document.getElementById('gameover')
const reiniciar = document.getElementById('reiniciar')
let capturados = 0

const jump =()=>{
    pikachu.classList.add('jump')

    setTimeout(()=>{
        pikachu.classList.remove('jump')
    },1000)
}

const loop = setInterval(()=>{

let placar = document.getElementById('placar')
const pokePosition = pokemon.offsetLeft
const pikaPosition = window.getComputedStyle(pikachu).bottom.replace('px','')
console.log(pikaPosition)
if (pokePosition <= 120 && pokePosition > 0 && pikaPosition <50){
    bg.style.animation = 'none'
    pokemon.style.animation = 'none'
    pokemon.style.left = `${pokePosition}px`
    pikachu.style.animation = 'none'
    gameover.classList.add('gameoveranimation')
    gameover.style.opacity='1'
    reiniciar.style.display='block'
    clearInterval(loop)
}


if (pokePosition == -107){
    pokemon.src=`assets/img/pokemon/pokemon (${Math.floor(Math.random() * 152)}).gif`
    capturados = capturados + 1
    placar.innerText = capturados;
    
}

},15)


document.addEventListener('keydown', jump)