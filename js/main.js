// fetch call api -> return promise -> to put await -> xmlHttpRequest their steps
// inside fetch apply ajax
// try - catch -> dosen't stop the code

let inputSearch = document.querySelector('input');
let btnSearch = document.getElementById('searchID');
let innerRecipes = document.getElementById('innerRecipe');
let errorData = document.getElementById('errorData');
let loading = document.getElementById('loading')

btnSearch.addEventListener('click', function() {
    getRecipes(inputSearch.value);
});

async function showDetails(id) {
    try {
        loading.classList.remove('d-none')
        let res = await (await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${id}`)).json();
        let final = res.recipe;
        innerRecipes.innerHTML = `
        <img src="${final.image_url}" class="w-100" style="height: 400px;"/>
        <h3>${final.title}</h3>
        `;
        errorData.classList.add('d-none');
    } catch (error) {
        console.log('erroorrr')
        errorData.classList.remove('d-none');
        loading.classList.add('d-none')
    }
}

getRecipes('pizza');

async function getRecipes(meal) {
    try {
        loading.classList.remove('d-none');
        let res = await (await fetch(`https://forkify-api.herokuapp.com/api/search?q=${meal}`)).json();
        let allRecipes = res.recipes;
        displayData(allRecipes);
        errorData.classList.add('d-none');
    } catch (error) {
        console.log('errorrr')
        errorData.classList.remove('d-none');  
    }
    finally {
        loading.classList.add('d-none')
    }
}

function displayData(arr) {
    let cartona = '';
    for(let i = 0; i<arr.length; i++) {
        cartona += `
                <div class="col-md-3">
                    <div class="card">
                        <img class="card-img-top" style="height:300px" src="${arr[i].image_url}" alt="">
                        <div class="card-body">
                            <h4 class="card-title">${arr[i].title.split(" ", 2).join(" ")}</h4>
                            <button onclick="showDetails(${arr[i].recipe_id})" class="btn btn-info text-white" id="showDetails" data-bs-toggle="modal" data-bs-target="#exampleModal"> Show Details</button>
                        </div>
                    </div>
                </div>
    `
    }
    document.getElementById('rowData').innerHTML = cartona;
}