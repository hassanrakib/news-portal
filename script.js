// load and display categories
function loadNewsCategories() {
    fetch(`https://openapi.programming-hero.com/api/news/categories`)
        .then(response => response.json())
        .then(object => displayCategories(object.data.news_category));
}

function displayCategories(categories) {
    const categoriesUl = document.getElementById("categories");
    categories.forEach(category => {
        const categoryLi = document.createElement("li");
        categoryLi.className = "nav-item";
        // event delegation
        categoryLi.onclick = () => loadAllNewsInACategory(category.category_id);
        categoryLi.innerHTML = `
        <a href="#" class="nav-link">${category.category_name}</a>
        `;
        categoriesUl.appendChild(categoryLi);
    });
}

// load all news in a category and display them
async function loadAllNewsInACategory(categoryId) {
    const response = await fetch(`https://openapi.programming-hero.com/api/news/category/01`);
    const object = await response.json();
    displayAllNewsInACategory(object.data);
}

function displayAllNewsInACategory(allNews) {
    const allNewsInACategoryContainer = document.querySelector("#all-news-in-a-category");
    console.log(allNews);
    allNews.forEach(news => {
        const newsCard = document.createElement("div");
        newsCard.className = "card mb-3 mx-auto news-card";
        newsCard.innerHTML = `
        <div class="row g-0 bg-white">
            <div class="col-sm-5 col-md-4 col-lg-3 p-1">
                <img src="./images/thumb.png" class="img-fluid thumbnail" alt="...">
            </div>
            <div class="col-sm-7 col-md-8 col-lg-9">
                <div class="card-body">
                    <h5 class="card-title fw-bold">Card title</h5>
                    <p class="card-text text-muted">This is a wider card with supporting text below as a
                        natural
                        lead-in to additional content. This content is a little bit longer.</p>
                    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                    <div class="row align-items-center">
                        <div class="col-6 col-md d-flex align-items-center">
                            <img src="./images/avatar-2.png" alt="avatar">
                            <div class="d-flex flex-column ms-2">
                                <small class="mb-0">Jane Cooper</small>
                                <small class="mb-0 text-muted">Jan 10, 2022</small>
                            </div>
                        </div>
                        <div class="col-6 text-center col-md">
                            <i class="fa-regular fa-eye"></i><small class="ms-2">1.5M</small>
                        </div>
                        <div class="col-12 col-md text-end mt-4 mt-md-0">
                            <button class="btn btn-primary read-more-btn">Read More<i
                                    class="ms-2 fa-regular fa-circle-right"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
        allNewsInACategoryContainer.appendChild(newsCard);
    })
}

loadNewsCategories();