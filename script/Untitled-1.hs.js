//Getting gifs with the search input (Giphy's Search Endpoint)
const searchBarForm = document.getElementById('search-bar-form');
const searchInput = document.getElementById('search-input');
searchBarForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const queryDirty = searchInput.value;
    const query = queryDirty.replace(' ','+'); //Cambio espacios por +
    searchGifs(query);
    document.querySelector(".suggestions-section").classList.add('display-none');
    document.querySelector(".trends-section").classList.add('display-none');
    document.querySelector(".results-section").classList.remove('display-none');
    const searchTerm = document.querySelector(".search-term");
    searchTerm.innerText = query;
});
searchInput.addEventListener('input', async function inputListener() {
    try {
        let inputDirty = searchInput.value;//Tomo el input de la barra de busqueda
        const input = inputDirty.replace(' ','+');//cambios los espacios en blanco por un +
        let path = `http://api.giphy.com/v1/gifs/search/tags?api_key=${apikey}&q=${input}&limit=1`; //Giphy tag Endpoint
        const loadSearchSuggestions = await fetch(path).then(Response => Response.json());
        const searchSuggestionsContainer = document.querySelector(".search-bar-suggestions");
        searchSuggestionsContainer.classList.remove('hidden');
        loadSearchSuggestions.data.forEach(item => {
            let query = item.title;
            const searchSuggestions = document.createElement('button');
            searchSuggestions.innerText = query;
            searchSuggestionsContainer.appendChild(searchSuggestions);
            searchSuggestions.addEventListener('click', function() {
                searchGifs(query);
            })
        });
    if (input === "") {
        document.querySelector(".search-bar-suggestions").innerHTML = "";
        document.querySelector(".search-bar-suggestions").classList.add('hidden');
      }
    } catch (error) {
    console.log('failed', error);
    }
});
async function searchGifs(query) {
    try {
        let path = `http://api.giphy.com/v1/gifs/search?api_key=${apikey}&q=${query}`;
        const loadResults = await fetch(path).then(Response => Response.json());
        const resultsContainer = document.getElementById("results-container");
        resultsContainer.innerHTML = "";
        loadResults.data.forEach(item => {
            const resultsGifs = document.createElement('div');
            resultsGifs.classList.add('gif-frame');
            const gifContent = document.createElement('img');
            gifContent.src = item.images.downsized_large.url;
            gifContent.classList.add('results-content');
            const gifFooter = document.createElement('div');
            gifFooter.classList.add('gif-footer');
            let footerText = item.title.split("GIF", 1);
            footerText = footerText.map(i => '#' + i);
            gifFooter.innerText = footerText;
            resultsGifs.addEventListener("mouseover", function() {
                gifFooter.setAttribute("style", "visibility: visible")
            });
            resultsGifs.addEventListener("mouseout", function() {
                gifFooter.setAttribute("style", "visibility: hidden")
            });
            resultsGifs.appendChild(gifContent);
            resultsGifs.appendChild(gifFooter);
            resultsContainer.appendChild(resultsGifs);
        })
    } catch (error) {
    console.log('failed', error);
    }
}
