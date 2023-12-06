const resume = d.querySelector('.resume')
const btnYes = d.querySelector('#resumeGame')
const btnNo = d.querySelector('#noResumeGame')
const previousRecord = d.querySelector('#previousRecord')
previousRecord.innerHTML = localStorage.getItem('record_time')
let interval;
let resumeSize;
console.log(resumeSize);




window.addEventListener('load', setResumeSize)
window.addEventListener('resize', setResumeSize)
btnYes.addEventListener('click', restartGame)
btnNo.addEventListener('click', ()=> clearInterval(interval))

function showResumeModal(){
    resume.classList.remove('hide')
    resume.classList.add('resume')
}

function hideResumeModal(){
    resume.classList.add('hide')
    resume.classList.remove('resume')
    restartGame()
}

function restartGame(){
    location.reload()
}



function startCountdown() {
    const time = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
    let index = 0;
    const pResult = document.querySelector('#timerCount');

    interval = setInterval(() => {
        pResult.innerHTML = `${time[index]}S`;
        index++;

        if (index >= time.length) {
            clearInterval(interval);
            hideResumeModal()
        }
    }, 1000);
}

function setResumeSize(){
    
    resume.classList.remove('resume')
    if(window.innerWidth > window.innerHeight){
        resumeSize = window.innerHeight * 0.8
    }else{
        resumeSize = window.innerWidth * 0.8
    }

    resume.style.width = resumeSize + 'px';
    resume.style.height = resumeSize + 'px';
}