let model = document.querySelector('.modal')
let buttons = document.getElementsByTagName('header')[0].children[1]
let addMoviesToList = document.getElementsByClassName('modal__actions')[0].children[1]
let cancel = document.getElementsByClassName('modal__actions')[0].children[0]
let showMovies = document.getElementById('movie-list')
let logs = []
let del = ''


let getMovieDetails = () => {
    let movieTitle = document.getElementsByName('title')[0].value
    let YourRating = document.getElementsByName('rating')[0].value

    fetch(`https://api.unsplash.com/search/photos?page=1&query=${movieTitle}&client_id=ZGEqVh2wMD8_NVIUH1L2HGSMRHq9opBg2ohslkN7L9k`)
        .then(response => response.json())
        .then((a) => {
            let ImageURL = a.results[0].urls.small
            let newMovieElement = document.createElement('li')
            newMovieElement.className = 'movie-element'
            newMovieElement.innerHTML = `
            <div class="movie-element__image"
            > <img id='img' src="${ImageURL}" alt=${movieTitle}>
            </div> 
            <div class="movie-element__info">
            <h2>${movieTitle}</h2>
            <p>${YourRating}/5 stars</p>
            `
            showMovies.append(newMovieElement)
            const addButton = document.createElement('button')
            addButton.innerHTML = "Delete"
            addButton.className = "deleting"
            addButton.value = Math.random()
            newMovieElement.append(addButton)
            addButton.addEventListener("click", (e) => {
                let val = e.target.value
                console.log(val)
                let a = 0
                for (let i = 0; i < showMovies.children.length; i++) {
                    if (val === showMovies.children[i].querySelector('.deleting').value)
                        showMovies.children[i].remove()
                    a = i
                }
                logs.splice(a, 1)
            })
            logInObj(Math.random(), movieTitle, YourRating)

            console.log(logs)
            cancelEntering()
        }

        )
        .catch(error => console.error(error));
}


let deleteMovies = () => {
    movieList.style.display = 'none'
    console.log('ii')
}


let logInObj = (id, name, rating) => {
    let objlog = {
        num: id,
        movieName: name,
        ratings: rating
    }

    let find = logs.some(obj => obj.movieName === name)
    if (!find) {
        logs.push(objlog)
        cancelEntering()
    }
    else {
        console.log('movie name already exists')
        showMovies.children[showMovies.children.length - 1].remove()
        cancelEntering()
    }

}


let toggleElement = () => {
    if (model.style.display === "none") {
        model.style.display = "block";
    } else if (model.style.display === 'block') {
        model.style.display = "none";
    }
}

let cancelEntering = () => {
    model.style.display = "none"
    document.getElementsByName('title')[0].value = ''
    document.getElementsByName('rating')[0].value = ''
}

buttons.addEventListener('click', toggleElement)
addMoviesToList.addEventListener('click', getMovieDetails)
cancel.addEventListener('click', cancelEntering)




