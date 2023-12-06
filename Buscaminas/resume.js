
const resume = d.querySelector('.resume')
let resumeSize;
console.log(resumeSize)

window.addEventListener('load', setResumeSize)
window.addEventListener('resize', setResumeSize)

function showResumeModal(){
    resume.classList.remove('hide')
    resume.classList.add('resume')
}

function hideResumeModal(){
    resume.classList.add('hide')
    resume.classList.remove('resume')
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