const pikachu = document.getElementById('pikachu')
const pokemon = document.getElementById('pokemon')

const jump =()=>{
    pikachu.classList.add('jump')

    setTimeout(()=>{
        pikachu.classList.remove('jump')
    },1000)
}

const loop = setInterval(()=>{

const pokePosition = pokemon.offsetLeft

if(pokePosition <= 50){
    pokemon.src='assets/img/pokeball.gif'
    pokemon.style= 'width:50px;'
}else if (pokePosition <= -100){
    pokemon.src=`assets/img/pokemon/pokemon (${Math.floor(Math.random() * 152)}).gif`
    console.log(pokemon.src)
}


},10)


document.addEventListener('keydown', jump)