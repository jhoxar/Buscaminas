
const resume = d.querySelector('.resume')
let resumeSize;

console.log(resumeSize)


window.addEventListener('load', setResumeSize)
window.addEventListener('resize', setResumeSize)



function setResumeSize(){
    if(window.innerWidth > window.innerHeight){
        resumeSize = window.innerHeight * 0.8
    }else{
        resumeSize = window.innerWidth * 0.8
    }

    

    resume.style.width = resumeSize + 'px';
    resume.style.height = resumeSize + 'px';
}