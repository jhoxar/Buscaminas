console.log(maps)

const canvas = document.querySelector('#game')
const game = canvas.getContext('2d')

window.addEventListener('load', startGame)


//inicializamos el Juego
function startGame(){

    let canvasSize

    if(window.innerHeight > window.innerWidth){
        canvasSize = window.innerWidth * 0.8
    }else{
        canvasSize = window.innerHeight * 0.8
    }

    canvas.setAttribute('width', canvasSize)
    canvas.setAttribute('height', canvasSize)

    const elementsSize = (canvasSize / 10) - 1

    game.font = elementsSize + 'px verdana' 
    game.textAlign = ""
    

     for(let i = 0; i<10; i++){
        game.fillText(emojis['X'], elementsSize * i , elementsSize)

    } 



    console.log({
        canvasSize,
        elementsSize
    })

    //window.innerHeight =
    //game.fillRect(0,50,100,100)
    //game.clearRect(0,0,50,50)
    //game.clearRect(50,50,50,50)

    //game.font = '25px Verdana'
    //game.fillStyle = 'purple'
    //game.textAlign = 'start'
    //game.fillText('Platzi', 25 , 25)
}

