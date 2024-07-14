//closeNavSide

// $(".closeNav").click(function () {
//   $(".side-Nav-Menu").css({ left: `-255px `, transition: "left 1s" });
//   $(".closeNav").addClass("fa-align-justify");
//   $(".closeNav").removeClass("fa-x");
// });

// //openNavSide

// $(".fa-align-justify").click(function () {
  
//   alert('suuuuuu')
  
// });



// function openSideNav()
// {

//     $('.side-Nav-Menu').animate({left:0},1000);
//     $('.openNav-closeNav').removClass('fa-align-justify');
//     $('.openNav-closeNav').addClass('fa-x');
// }


// function closeSideNav()
// {
//     let sideNavWidth=$('.side-Nav-Menu .nav-tab').outerWidth()
//     $('.side-Nav-Menu').animate({left:$-{sideNavWidth}},1000);
//     $('.openNav-closeNav').addClass('fa-align-justify');
//     $('.openNav-closeNav').removClass('fa-x')
// }
// closeSideNav()

// $('.side-Nav-Menu a i .openNav-closeNav').click(()=>
// {
// if($('.side-Nav-Menu').css("left")=="0px")
// {
//     closeSideNav() 
// }
// else{
//     openSideNav() 
// }

// })

let rowData = document.getElementById("rowData");
let searchContainer = document.getElementById("searchContainer");
let submitBtn;



function openSideNav() {
    $(".side-Nav-Menu").animate({
        left: 0
    }, 500)

    $(".openNav-closeNav").removeClass("fa-align-justify");
    $(".openNav-closeNav").addClass("fa-x");


    for (let i = 0; i < 5; i++) {
        $(".nav-links ul li").eq(i).animate({
            top: 0
        }, (i + 5) * 100)
    }
}

function closeSideNav() {
    let boxWidth = $(".side-Nav-Menu .nav-tab").outerWidth()
    $(".side-Nav-Menu").animate({
        left: $-{boxWidth}
    }, 500)

    $(".openNav-closeNav").addClass("fa-align-justify");
    $(".openNav-closeNav").removeClass("fa-x");


    $(".nav-links ul li").animate({
        top: 300
    }, 500)
}

closeSideNav()
$(".side-Nav-Menu a i .openNav-closeNav").click(() => {
    if ($(".side-Nav-Menu").css("left") == "0px") {
        closeSideNav()
    } else {
        openSideNav()
    }
})


function displayMeals(arr)
{
    let cartona='';
    for(let i=0;arr<cartona.length;i++)
    {
        cartona+=`
        <div class="col-md-3">
                    <div onclick="getMealDetails('${arr[i].idMeal}')"
                        class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                        <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
                        <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                            <h3>${arr[i].strMeal}</h3>
                        </div>
                    </div>
                </div>
        `
    }
    rowData.innerHTML = cartoona;
}


async function getCategories()
{
rowData.innerHTML="";
    $('.innerLoadingScreen').fadeIn(300);
    searchContainer.innerHTML="";

    let response=await fetch(`www.themealdb.com/api/json/v1/1/categories.php`);
    response=await response.json();
    displayCategories(response.categories);
 $('.innerLoadingScreen').fadeOut(300);

}


function displayCategories(arr)
{
let cartona="";
for(let i=0;i<arr.length;i++)
{
    cartona+=`
     <div class="col-md-3">
                <div onclick="getCategoryMeals('${arr[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strCategoryThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute text-center text-black p-2">
                        <h3>${arr[i].strCategory}</h3>
                        <p>${arr[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
                </div>
        </div>

    `
}
rowData.innerHTML=cartona;
}


async function getArea()
{
    rowData.innerHTML="";
    $('.innerLoadingScreen').fadeIn(300);
    searchContainer.innerHTML="";

    let respone=await fetch(`www.themealdb.com/api/json/v1/1/list.php?c=list`);
    respone=await respone.json();
    console.log(respone.meals);
    displayArea(respone.meals)
    $('.innerLoadingScreen').fadeOut(300);
}

function displayArea(arr)
{
    let cartona="";
    for(leti=0;i<arr.length;i++)
    {
        cartona+=`
        <div class="col-md-3">
                <div onclick="getAreaMeals('${arr[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${arr[i].strArea}</h3>
                </div>
        </div>
        `
    }
    rowData.innerHTML=cartona;
}

async function getIngredients()
{
    rowData.innerHTML="";
    $('.innerLoadingScreen').fadeIn(300);
    searchContainer.innerHTML="";

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    respone = await respone.json()
    console.log(respone.meals);
    displayIngredients(respone.meals.slice(0, 20))
    $('.innerLoadingScreen').fadeOut(300);
}

function displayIngredients(arr)
{
    let cartona=""
    for(let i=0;i<arr.length;i++)
    {
        cartona+=`
         <div class="col-md-3">
                <div onclick="getIngredientsMeals('${arr[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${arr[i].strIngredient}</h3>
                        <p>${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>
        </div>
        `
    }
    rowData.innerHTML=cartona;
}

async function getCategoryMeals(category)
{
    rowData.innerHTML="";
    $('.innerLoadingScreen').fadeIn(300);

    let response=await fetch(`www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    response= await response.json();
    displayMeals(response.meals.slice(0, 20));
    $('.innerLoadingScreen').fadeOut(300);
}


async function getAreaMeals(area)
{
    rowData.innerHTML="";
    $('.innerLoadingScreen').fadeIn(300);
    
    let response=await fetch(`www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    response=await response.json();
    displayMeals(response.meals.slice(0, 20));
    $('.innerLoadingScreen').fadeOut(300);
}


async function getIngredientsMeals(Ingredient)
{
    rowData.innerHTML="";
    $('.innerLoadingScreen').fadeIn(300);

    let response=await fetch(`www.themealdb.com/api/json/v1/1/filter.php?i=${Ingredient}`);
    response=await response.json();
    displayMeals(response.meals.slice(0, 20));
    $('.innerLoadingScreen').fadeOut(300);
}

async function getMealDetails(mealId)
{
    closeSideNav()
rowData.innerHTML="";
$('.innerLoadingScreen').fadeIn(300);

let respone=await fetch(`www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
respone=await respone.json();
displayMealDetails(respone.meals[0]);
$('.innerLoadingScreen').fadeOut(300);
}

function displayMealDetails(meal)
{
    searchContainer.innerHTML="";

    let ingredients="";

for(let i=1;i<=20;i++)
{
    if(meal[`strIngredient${i}`])
    {
        ingredients+=`<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
    }
}

let tags = meal.strTags?.split(",")
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }

let cartona=`
  <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>
`
rowData.innerHTML=cartona;

}

function showSearchInputs()
{
    rowData.innerHTML="";

    searchContainer.innerHTML=`
     <div class="row py-4 ">
        <div class="col-md-6 ">
            <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByFLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
    </div>
    `
    rowData.innerHTML="";
}

async function searchByName(term)
{
    closeSideNav()
    rowData.innerHTML="";
    $('.innerLoadingScreen').fadeIn(300);

    let respone=await fetch(`www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
    respone=await respone.json();

    respone.meals ? displayMeals(respone.meals) : displayMeals([])
    $('.innerLoadingScreen').fadeIn(300);

}

async function searchByLetter(term)
{
    closeSideNav()
    rowData.innerHTML="";
    $('.innerLoadingScreen').fadeIn(300);

    let response=await fetch(`www.themealdb.com/api/json/v1/1/search.php?f=${term}`);
    response=await response.json();
    response.meals ? displayMeals(response.meals) : displayMeals([])
    $('.innerLoadingScreen').fadeOut(300);
}

function showContacts()
{
    rowData.innerHTML=`
    <div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> 
    `
    submitBtn = document.getElementById("submitBtn")


    document.getElementById("nameInput").addEventListener("focus", () => {
        nameInputTouched = true
    })

    document.getElementById("emailInput").addEventListener("focus", () => {
        emailInputTouched = true
    })

    document.getElementById("phoneInput").addEventListener("focus", () => {
        phoneInputTouched = true
    })

    document.getElementById("ageInput").addEventListener("focus", () => {
        ageInputTouched = true
    })

    document.getElementById("passwordInput").addEventListener("focus", () => {
        passwordInputTouched = true
    })

    document.getElementById("repasswordInput").addEventListener("focus", () => {
        repasswordInputTouched = true
    })

}
let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;

function inputsValidation() {
    if (nameInputTouched) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailInputTouched) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInputTouched) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageInputTouched) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordInputTouched) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInputTouched) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }
}


