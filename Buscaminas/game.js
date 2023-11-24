console.log(maps)
const d = document;
window.addEventListener('load', setCanvasSize )
window.addEventListener('resize', setCanvasSize)
const canvas = d.querySelector('#canvas') 
const game = canvas.getContext('2d') 
const btnUp = d.querySelector('#up')
const btnLeft = d.querySelector('#left')
const btnRight = d.querySelector('#right')
const btnDown = d.querySelector('#down')
let canvasSize;
let elementSize;


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


function startGame(){

    elementSize = (canvasSize / 10)  - 1

    game.font = elementSize + 'px Verdana'
    game.textAlign = "start"

    const map = maps[0]
    const mapRows = map.trim().split('\n')
    const mapRowCols = mapRows.map(row => row.trim().split(''))

    
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

   console.log({
    mapRows,
    mapRowCols
    })



    /* for(let row = 0 ; row <=10; row++){
        for(let col = 0 ; col <10; col++)
        game.fillText(emojis[mapRowCols[row][col]], elementSize * col   , elementSize * row + 50 )

    } */
    
    console.log({canvasSize, elementSize})
    console.log(window.innerHeight)
    console.log(window.innerWidth)
}

window.addEventListener('keydown', moveByKeys)

function moveByKeys(e){
    if(e.key == 'ArrowUp') moveUp()
    else if(e.key == 'ArrowLeft') moveLeft()
    else if(e.key == 'ArrowRight') moveRight()
    else if(e.key == 'ArrowDown') moveDown()
}

function moveUp(){
    console.log('I am moving Up ⬆️')

}

function moveLeft(){
    console.log('I am moving Left ⬅️')
    
}

function moveRight(){
    console.log('I am moving Right ➡️')
    
}
function moveDown(){
    console.log('I am moving Down ⬇️')
}

btnUp.addEventListener('click', moveUp)
btnLeft.addEventListener('click', moveLeft)
btnRight.addEventListener('click', moveRight)
btnDown.addEventListener('click', moveDown)





