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
const spanLives = d.querySelector('#lives')
const spanTime = d.querySelector('#time')
const spanRecord = d.querySelector('#record')
const spanResult = d.querySelector('#result')
let canvasSize;
let elementSize;
let level = 0
let lives = 3;
let record = `0 s`
let timeStart;
let timeInterval;
let playerTime;


const playerPosition = {
    x: undefined,
    y: undefined 
}

const giftPosition = {
    x:undefined,
    y:undefined
}

let enemypositions = []

const enemyPos= {
    x: undefined,
    y: undefined
}

function setCanvasSize(){

    if(window.innerWidth > window.innerHeight){
        canvasSize = Number((window.innerHeight * 0.7).toFixed(0))
    }else{
        canvasSize = Number((window.innerWidth * 0.7).toFixed(0))
    }

    canvas.setAttribute('width', canvasSize)
    canvas.setAttribute('height', canvasSize)
    playerPosition.x = undefined
    playerPosition.y = undefined
    startGame()
}


function startGame(){

    elementSize = Number(((canvasSize / 10) - 1).toFixed(0))

    game.font = elementSize + 'px Verdana'
    game.textAlign = "start"

    const map = maps[level]

    if(!map){
        gameWin()
        return;
        
    }

    if(!timeStart){
        timeStart = Date.now()
        timeInterval = setInterval(showTime, 100)
        showRecord()
    }


    const mapRows = map.trim().split('\n')
    const mapRowCols = mapRows.map(row => row.trim().split(''))
    showLives()

    enemypositions = []
    game.clearRect(0,0,canvasSize,canvasSize)

    
   mapRowCols.forEach((row, rowI)=>{
    row.forEach((col, colI)=>{
        const emoji = emojis[col]
        const posX = elementSize * colI
        const posY = elementSize *(rowI + 1)

        console.log(rowI)

        if(col == 'O'){
            if(!playerPosition.x & !playerPosition.y){
            playerPosition.x = posX
            playerPosition.y = posY
            }
        }else if( col == 'I'){
            giftPosition.x = posX
            giftPosition.y = posY
        }else if(col == 'X'){
            enemypositions.push({
                x: posX,
                y: posY
            })
        }

        
        game.fillText(emoji, posX , posY)
        
    })
   })



   movePlayer()

   console.log(playerPosition)

   


    /* for(let row = 0 ; row <=10; row++){
        for(let col = 0 ; col <10; col++)
        game.fillText(emojis[mapRowCols[row][col]], elementSize * col   , elementSize * row + 50 )

    } */
    
    console.log({canvasSize, elementSize})  
    console.log(window.innerHeight)
    console.log(window.innerWidth)
}

function showLives(){
    const livesArray = Array(lives).fill(emojis['HEART'])
    spanLives.innerHTML = ''
    livesArray.forEach(heart => spanLives.append(heart))
}

function showRecord(){
    const isRecordIn = localStorage.getItem('record_time')
    if(!isRecordIn){
        spanRecord.innerHTML = record
        spanResult.innerHTML = '¿Primera vez jugando? ¡Haz lo mejor que puedas! 💪🎮'
    }else{
        spanRecord.innerHTML = localStorage.getItem('record_time')
    }
    
   
}

function showTime(){
     
    spanTime.innerHTML = `${(Date.now() - timeStart)/ 1000} s`
}

function setRecord(){
    playerTime = `${(Date.now() - timeStart) / 1000}s`;
    const playerRecord = localStorage.getItem('record_time');

    if(!playerRecord){
        localStorage.setItem('record_time', playerTime)  
    }else{
        if(playerTime < playerRecord){
            localStorage.setItem('record_time', playerTime)
            spanResult.innerHTML = '¡Bien hecho! 🎉 ¡Superaste el récord! 🏆'
        }else{
            spanResult.innerHTML = 'Lo siento, ¡No superaste el récord! 😔🚫'
        }
    }


    console.log({
        playerTime,
        playerRecord

    })
}

function stopTime(){
    const timeStop = clearInterval(timeInterval)
    return timeStop;
}

function gameWin(){
    console.log('!you passed this game!')
    setRecord()
    stopTime()
    showResumeModal()
    livesResult.innerHTML = 'You were able to keep your lives intact, showcasing your excellent skills in navigating this game.'
    startCountdown()
    
}

function enemyCollision(){

    console.log(enemyPos)

     enemypositions.forEach(enemy=>{
        if(enemy.x == playerPosition.x && enemy.y == playerPosition.y) {
            enemyPos.x = enemy.x
            enemyPos.y = enemy.y
            levelFail()
        }

    })

    if(enemyPos.x && enemyPos.y){
         game.fillText(emojis['BOMB_COLLISION'], enemyPos.x , enemyPos.y) 
         enemyPos.x = undefined
         enemyPos.y = undefined;
    }

    
}


function movePlayer(){


    const giftCollisionX = playerPosition.x == giftPosition.x
    const giftCollisionY = playerPosition.y == giftPosition.y
    const giftCollision = giftCollisionX && giftCollisionY

    if(giftCollision){
       levelWin()
    }

    enemyCollision()

    

   /*  const enemyCollision = enemypositions.find(enemy=>{
        const enemyCollisionX = enemy.x == playerPosition.x
        const enemyCollisionY = enemy.y == playerPosition.y
        return enemyCollisionX && enemyCollisionY
        

    })

    if(enemyCollision){
        console.log('Chocaste con un enemigo')
        levelFail()
    
    } */

    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y)
    
   }

   function levelWin(){
    level++;
    startGame()
   }

   function levelFail(){
    lives--

    if(lives<=0){
        level =0
        lives =3
        //timeStart = undefined;
        stopTime()
        showResumeModal() 
        livesResult.innerHTML = 'Your performance in navigating this game was subpar, resulting in the loss of your lives.'
        startCountdown()  
    }

    playerPosition.x = undefined;
    playerPosition.y= undefined;
    startGame()
    
   }

window.addEventListener('keydown', moveByKeys)

function moveByKeys(e){

    
    if(e.key == 'ArrowUp') moveUp()
    else if(e.key == 'ArrowLeft') moveLeft()
    else if(e.key == 'ArrowRight') moveRight()
    else if(e.key == 'ArrowDown') moveDown()
}

function moveUp(){
    if((playerPosition.y - elementSize) < elementSize) {
        console.log('OUT')
    }else{
       playerPosition.y -= elementSize 
        startGame()
        console.log('I am moving Up ⬆️') 
    }
    

}

function moveLeft(){
    if(playerPosition.x  < elementSize) {
        console.log('OUT')
    }else{
       playerPosition.x -= elementSize 
        startGame()
        console.log('I am moving Up ⬆️') 
    }
    
}

function moveRight(){
    if((playerPosition.x + elementSize + 20) > canvasSize) {
        console.log('OUT')
    }else{
       playerPosition.x += elementSize 
        startGame()
        console.log('I am moving Up ⬆️') 
    }
    
}
function moveDown(){
    if((playerPosition.y + elementSize) > canvasSize) {
        console.log('OUT')
    }else{
       playerPosition.y += elementSize 
        startGame()
        console.log('I am moving Up ⬆️') 
    }
}

btnUp.addEventListener('click', moveUp)
btnLeft.addEventListener('click', moveLeft)
btnRight.addEventListener('click', moveRight)
btnDown.addEventListener('click', moveDown)





