

const API_KEY = '377397cd2e9e4010bd2061e6303b7f33'
const url = 'https://newsapi.org/v2/everything?q='
let DATA_ARRAY = []; //articles

async function fetchData(query){
    const response = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    console.log(`${url}${query}&apiKey=${API_KEY}`)
    const data = await response.json();
    console.log(data)
    return data;
}

fetchData("all").then(data => renderMain(data.articles));

//menu btn
let mobilemenu = document.querySelector(".mobile");
let menuBtn = document.querySelector(".menuBtn");
let menuBtnDisplay = true;

menuBtn.addEventListener("click",()=>{
    mobilemenu.classList.toggle("hidden")
})


//render articles
function renderMain(arr){  
    let mainHTML = '';
    for(let i = 0; i < arr.length; i++){
        if(arr[i].urlToImage){
        mainHTML +=`
                    <div class="card">
                    <a href=${arr[i].url}>
                        <img src=${arr[i].urlToImage} />
                        <h4>${arr[i].title}</h4>
                        <div class="publishbyDate">
                            <p>${arr[i].source.name}</p>
                            <span>|</span>
                            <p>${new Date(arr[i].publishedAt).toLocaleDateString()}</p>
                        </div>
                        <div class="description">
                            ${arr[i].description}
                        </div></a>
                    </div>
                    `
                }
    }
    document.querySelector("main").innerHTML = mainHTML

}
const searchBtn = document.getElementById("searchForm");
const searchBtnMobile = document.getElementById("searchFormMobile");
const searchInputMobile = document.getElementById("searchInputMobile");
const searchInput = document.getElementById("searchInput");

searchBtn.addEventListener('submit',async (e)=>{e.preventDefault()
    const data = await fetchData(searchInput.value)
    renderMain(data.articles)
});

searchBtnMobile.addEventListener('submit',async (e)=>{e.preventDefault()
    const data = await fetchData(searchInputMobile.value)
    renderMain(data.articles)
});

async function Search(query){
    const data = await fetchData(query)
    renderMain(data.articles)
}