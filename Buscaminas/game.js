console.log(maps)
const d = document;
window.addEventListener('load',startGame )

/*Se accede al elemento canvas*/ 
const canvas = d.querySelector('#canvas') 
/*se accede al contexto canvas para poder acceder a los metodos que tiene canvas. */
const game = canvas.getContext('2d') 

function startGame(){

    let canvasSize;

    if(window.innerWidth > window.innerHeight){
        canvasSize = window.innerHeight * 0.8
    }else{
        canvasSize = window.innerWidth * 0.8
    }

    canvas.setAttribute('width', canvasSize)
    canvas.setAttribute('height', canvasSize)

    const elementSize = (canvasSize / 10)  - 1

    game.font = elementSize + 'px Verdana'
    game.textAlign = ""


    
   /*  for(let i=0; i<10; i++){
        for(let z=1 ; z<11; z++)
        

    } */

    for(let i = 0 ; i<10; i++){
        for(let z = 1 ; z<=10; z++)
        game.fillText(emojis['X'], elementSize * i  , elementSize * z )

    }
    

    console.log({canvasSize, elementSize})


    
    console.log(window.innerHeight)
    console.log(window.innerWidth)
   

    //game.fillRect(0,0,100,100)
    //game.clearRect(50,0,50,50)
    //game.clearRect(0,50,50,50)
    //game.clearRect(0,0,50,100)
    //game.clearRect(50,0,50,100)

    /* game.fillStyle = 'red'
    game.font= '30px verdana'
    game.textAlign = 'center'
    game.fillText('Dreamer', 50 , 50) */

}


