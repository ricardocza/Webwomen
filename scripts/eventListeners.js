function applyToJobListener() {
    const buttonsApply = document.querySelectorAll('.button-apply')
    buttonsApply.forEach(button => {
        button.addEventListener('click', (event) => {
            const currentButtonText = event.target
            const jobAppliedId = event.composedPath()[2].id.substring(2)
            const jobId = jobsData.findIndex(job => job.id === Number(jobAppliedId))
            if(currentButtonText.innerText === 'Candidatar') {
                jobsApplied.push(jobsData[jobId])
            } else {
                jobsApplied = jobsApplied.filter(element => element.id != jobAppliedId)
            }
            
            renderAppliedJobs(jobsApplied)
            currentButtonText.innerText === 'Candidatar' ? currentButtonText.innerText = 'Remover Candidatura' : currentButtonText.innerText = 'Candidatar'
        })
    })
}

function removeJobAppliedListener() {
    const buttons = document.querySelectorAll('.button-trash')
    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            const jobToRomove = event.composedPath()[2].id.substring(5)
            jobsApplied = jobsApplied.filter(element => element.id != jobToRomove)
            const jobLi = document.querySelector(`#li${jobToRomove}`)
            jobLi.children[2].children[1].innerText = 'Candidatar'
            
            renderAppliedJobs(jobsApplied)
        })
    })
}