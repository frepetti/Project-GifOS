const myKey = "RoFq898LQn130ZY7iP2TBlrDuefnjvV0";

//Get theme on opening window
window.onload = loadTheme()

function loadTheme() {
    let theme;
    if (!window.localStorage.getItem('theme')) {
        theme = 'light'
    } else{
        theme = window.localStorage.getItem('theme');
    }

    document.getElementById('theme').className = theme;
}

//Open Theme Menu

document.getElementById('buttonGrp').addEventListener('click',openMenu);

function openMenu() {
    let themeOp = document.getElementById("themeOp")
    themeOp.classList.toggle("display");
}

//Switch Theme

document.getElementById('light').addEventListener('click', setLight);
document.getElementById('dark').addEventListener('click', setDark);

function setLight() {
    document.getElementById('theme').className = 'light';
    //Save Theme
    let theme = document.getElementById('theme').className;
    window.localStorage.setItem('theme',theme);
    //Hide theme Dropdown
    document.getElementById('themeOp').classList.toggle('display');
}

function setDark() {
    document.getElementById('theme').className = 'dark';
    //Save Theme
    let theme = document.getElementById('theme').className;
    window.localStorage.setItem('theme',theme);
    //Hide theme Dropdown
    document.getElementById('themeOp').classList.toggle('display');
}

//Open Crear Gif
document.getElementById('createGif').addEventListener('click',function () {
    document.getElementById('navBtns').classList.toggle('noDisplay');
    document.getElementById('navBtns').classList.toggle('displayFlex');
    let displayBtns = document.getElementById('navBtns').className;
    let gifRecorder = 'displayFlex';
    window.localStorage.setItem('gifRecorder',gifRecorder);
    window.localStorage.setItem('displayBtns',displayBtns);
    window.location.href = 'myGifos.html';
});

//Open Mis Guifos
document.getElementById('misGifos').addEventListener('click',function () {
    let displayBtns = document.getElementById('navBtns').className;
    let gifRecorder = 'noDisplay';
    window.localStorage.setItem('gifRecorder',gifRecorder);
    window.localStorage.setItem('displayBtns',displayBtns);
    window.location.href = 'myGifos.html';
});

//Search gifs

document.getElementById('search').addEventListener('click',search);
function search() {
    document.getElementById('gifResults').innerHTML = '';
    let searchTerm = document.getElementById('searchBar').value;
    let searchTermClean = searchTerm.replace(' ','+')
    let searchGif = fetch('https://api.giphy.com/v1/gifs/search?&api_key='+myKey+'&q='+searchTermClean+'&limit=14')
    searchGif
        .then(response => response.json())
        .then(datos => {
            for (let i = 0; i < datos.data.length; i++){
                let url = (datos.data[i].images.downsized.url);
                let newDiv = document.createElement('div');
                let newGif = document.createElement('img');
                let gifResults = document.getElementById('gifResults');
                newGif.id = 'newGifSearch'+[i];
                newDiv.className = 'gifCont';
                newDiv.appendChild(newGif);
                gifResults.appendChild(newDiv);
                document.getElementById('newGifSearch'+[i]).src = url;
                document.getElementById('searchResults').style.display = 'block';
                document.getElementById('trending').style.display = 'none';
                document.querySelector('.resultsTitle .searchTitle').innerHTML = searchTerm;
                document.getElementById('searchBar').value = '';
                document.getElementsByClassName('autocomplete')[0].classList.remove('display');
                document.getElementsByClassName('resultsTitle')[0].scrollIntoView();
            }
        })
        .catch(error => console.error(error))
}

//Show Search suggestions

function displaySugg() {
    let autocompleteCont = document.getElementsByClassName('autocomplete')[0];
    if (!autocompleteCont.classList.contains('display')) {
        autocompleteCont.classList.toggle('display');
    }
}

//Autocomplete Search bar
function autocomplete() {
    let auto = document.getElementsByClassName('auto');
    let searchTerm = document.getElementById('searchBar').value;
    let searchTermClean = searchTerm.replace(' ','+')
    url = 'https://api.giphy.com/v1/gifs/search/tags?api_key='+myKey+'&q='+searchTermClean+'&limit=3'
    let autocompleteSugg = fetch(url);
    autocompleteSugg
        .then(response => response.json())
        .then(datos => {
            for (let i = 0; i < datos.data.length; i++) {
                auto[i].innerHTML = datos.data[i].name;
            }
        })
}

document.getElementById('searchBar').addEventListener('input',displaySugg);
document.getElementById('searchBar').addEventListener('input',autocomplete);


//Click autocomplete

document.getElementsByClassName('auto')[0].addEventListener('click',autoSearch);
document.getElementsByClassName('auto')[1].addEventListener('click',autoSearch);
document.getElementsByClassName('auto')[2].addEventListener('click',autoSearch);

//Search clicked suggestion

function autoSearch() {
    document.getElementById('searchBar').value = this.innerHTML;
    search();
}

//Suggested gifs

let suggestedGifs = fetch("https://api.giphy.com/v1/gifs/trending?api_key="+myKey+"&offset=20&limit=4");
suggestedGifs
    .then(response => response.json())
    .then(datos => {
        for (let i = 0; i < datos.data.length; i++) {
            let url = (datos.data[i].images.original.url);
            let window = document.createElement('div');
            let bar = document.createElement('div');
            let title = document.createElement('h4');
            let closeBtn = document.createElement('img');
            let gifCont = document.createElement('div');
            let newGif = document.createElement('img');
            let moreBtn = document.createElement('button');
            let gifSuggest = document.getElementsByClassName('gifSuggest')[0];
            window.className = 'window';
            bar.className = 'bar';
            title.className = 'gifTitle'
            closeBtn.src = './assets/button3.svg';
            gifCont.className = 'gif';
            newGif.id = 'newGif'+[i];
            moreBtn.className = 'more';
            gifSuggest.appendChild(window);
            window.appendChild(bar);
            window.appendChild(gifCont);
            bar.appendChild(title);
            bar.appendChild(closeBtn);
            gifCont.appendChild(newGif);
            gifCont.appendChild(moreBtn);
            moreBtn.innerHTML = 'Ver más...'
            moreBtn.setAttribute('type', 'button');
            document.getElementById('newGif'+[i]).src = url;
            let titleString = datos.data[i].title;
            let titleArray = titleString.split(' ');
            title.innerHTML = '#'+titleArray[0]+' '+titleArray[1]+' '+titleArray[2];
        };
        //Get position of Ver Mas.. clicked
        let more = document.getElementsByClassName('more');
        for (let i = 0; i < more.length; i++) {
            function getPos(index) {
                more[i].onclick = function() {
                    console.log(document.getElementsByClassName('gifTitle')[index].innerHTML.substring(1));
                    searchMore(index);
                }
            }
            getPos(i);
        }
    })
    .catch(error => console.error(error))



//Click ver mas Suggested gifs
function searchMore(pos) {
    let gifTitle = document.getElementsByClassName('gifTitle')[pos].innerHTML.substring(1);
    document.getElementById('searchBar').value = gifTitle
    search();

}
//Trending gifs

let trendingGif = fetch("https://api.giphy.com/v1/gifs/trending?api_key="+myKey+"&limit=14");
trendingGif
    .then(response => response.json())
    .then(datos => {
        for (let i = 0; i < datos.data.length; i++)     {
            let url = (datos.data[i].images.downsized.url);
            let newDiv = document.createElement('div');
            let newGif = document.createElement('img');
            let gifTrend = document.getElementById('gifTrend');
            let hoverBar = document.createElement('div');
            let tags = document.createElement('span');
            let gifTags = datos.data[i].title;
            let tagArray = gifTags.split(' ');
            hoverBar.className = 'hoverBar';
            tags.innerHTML = '#'+tagArray[0]+' #'+tagArray[1]+' #'+tagArray[2];
            newGif.className = 'newGif';
            newDiv.className = 'gifCont';
            newDiv.appendChild(newGif);
            newDiv.appendChild(hoverBar);
            hoverBar.appendChild(tags);
            gifTrend.appendChild(newDiv);
            document.getElementsByClassName('newGif')[i].src = url;
        }
    })
    .catch(error => console.error(error))
/*
function createGifCont() {
    let newDiv = document.createElement('div');
    let newGif = document.createElement('img');
    let gifTrend = document.getElementById('gifTrend');
    newGif.className = 'newGif'+[i]
    newDiv.appendChild(newGif);
    gifTrend.appendChild(newDiv);
    return gifCont
}
*/

