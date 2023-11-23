console.log(maps)
const d = document;
window.addEventListener('load', setCanvasSize )
window.addEventListener('resize', setCanvasSize)
const canvas = d.querySelector('#canvas') 
const game = canvas.getContext('2d') 
let canvasSize;
let elementSize;

function startGame(){

    elementSize = (canvasSize / 10)  - 1

    game.font = elementSize + 'px Verdana'
    game.textAlign = "start"

    const map = maps[0]
    const mapRows = map.trim().split('\n')
    const mapRowCols = mapRows.map(row => row.trim().split(''))

    console.log({
    mapRows,
    mapRowCols
    })

   mapRowCols.forEach((row, rowI)=>{
    row.forEach((col, colI)=>{
        const emoji = emojis[col]
        const posX = elementSize *(colI)
        const posY = elementSize *(rowI + 1)
        game.fillText(emoji, posX , posY)
    
        console.log({row, rowI})
        console.log({col, colI})
    })
   })


    /* for(let row = 0 ; row <=10; row++){
        for(let col = 0 ; col <10; col++)
        game.fillText(emojis[mapRowCols[row][col]], elementSize * col   , elementSize * row + 50 )

    } */
    
    console.log({canvasSize, elementSize})
    console.log(window.innerHeight)
    console.log(window.innerWidth)
}

function setCanvasSize(){

    if(window.innerWidth > window.innerHeight){
        canvasSize = window.innerHeight * 0.7
    }else{
        canvasSize = window.innerWidth * 0.7
    }

    canvas.setAttribute('width', canvasSize)
    canvas.setAttribute('height', canvasSize)

    startGame()

}


