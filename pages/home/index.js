let jobsApplied = []

function renderCardsJobs(arr) {
    const ul = document.querySelector('.job-list')
    arr.forEach(job => {
        const li = document.createElement('li')
        const currentSection = addHeaderJob(job)
        const jobDescription = document.createElement('p')
        const footer = document.createElement('footer')
        const divModalities = addModalities(job.modalities)
        const button = document.createElement('button')

        li.classList = 'job flex flex-column gap28 color-grey2'
        li.id = `li${job.id}`
        jobDescription.classList = 'text2'
        footer.classList = 'flex flex-wrap justify-space-between'
        divModalities.classList = 'flex flex-wrap gap18'
        button.classList = 'button-brand button-apply'
        
        jobDescription.innerText = job.descrition
        button.innerText = 'Candidatar'
        footer.append(divModalities, button)
        li.append(currentSection, jobDescription, footer)
        ul.append(li)

    });
    applyToJobListener()
}

function renderAppliedJobs(arrJobs) {
    const ulAppliedJobs = document.querySelector('.applied-list')
    ulAppliedJobs.innerHTML = ''
    arrJobs.forEach(job => {
        const headerInfo = [...addHeaderJob(job).children]
        const li = document.createElement('li')
        const divHeader = document.createElement('div')
        const divButton = document.createElement('div')
        const button = document.createElement('button')
        const imgButton = document.createElement('img')
        
        headerInfo[0].classList = 'title5 color-grey1'
        headerInfo[1].classList = 'text3 color-grey2 flex gap18'    
        li.classList = 'applied-job flex gap16'
        li.id = `jobId${job.id}` 
        divButton.classList = 'div-button'
        button.classList = 'button-trash'
        imgButton.src = './assets/img/trash.png'
    
        divHeader.append(headerInfo[0], headerInfo[1])
        button.append(imgButton)
        divButton.append(button)
        li.append(divHeader, divButton)
        ulAppliedJobs.append(li)
    })
    removeJobAppliedListener()
    if(!jobsApplied.length) {
        document.querySelector('.job-empty').classList.remove('hide')
    } else document.querySelector('.job-empty').classList = 'job-empty flex flex-column gap28 color-grey2 hide'
    updateLocalStorage()
}

function addHeaderJob(job) {
    const section = document.createElement('section')
    const jobTitle = document.createElement('h4')
    const divEnterprise = document.createElement('div')
    const enterpriseName = document.createElement('p')
    const enterpriseLocation = document.createElement('p')

    section.classList = 'flex flex-column gap18'
    divEnterprise.classList = 'flex text3 gap32'
    jobTitle.classList = 'title4 color-grey1'    

    enterpriseName.innerText = job.enterprise
    enterpriseLocation.innerText = job.location
    jobTitle.innerText = job.title
    
    divEnterprise.append(enterpriseName, enterpriseLocation)
    section.append(jobTitle, divEnterprise)
    return section    
}

function addModalities(list) {
    const divModalities = document.createElement('div')
    list.forEach(modalitie => {
        const tag = document.createElement('span')
        tag.classList = 'modalities'
        tag.innerText = modalitie
        divModalities.append(tag)
    })

    return divModalities
}

function updateLocalStorage() {
    const currentJobsApplied = JSON.stringify(jobsApplied)
    localStorage.setItem('appliedJobs', currentJobsApplied)
}

function firstRender() {
    const getJsonList = localStorage.getItem('appliedJobs')
    renderCardsJobs(jobsData)
    if(getJsonList) {
        jobsApplied = JSON.parse(getJsonList)
        renderAppliedJobs(jobsApplied)
        
        jobsApplied.forEach(job => {
            const liApplied = document.getElementById(`li${job.id}`)
            liApplied.children[2].children[1].innerText = 'Remover Candidatura'
        })
    }
}

firstRender()
