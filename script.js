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
        categoryLi.onclick = () => loadAllNewsInACategory(category.category_id, category.category_name);
        categoryLi.innerHTML = `
        <a href="#" class="nav-link">${category.category_name}</a>
        `;
        categoriesUl.appendChild(categoryLi);
    });
}

// load all news in a category and display them
async function loadAllNewsInACategory(categoryId, categoryName) {

    const allNewsInACategoryContainer = document.querySelector("#all-news-in-a-category");
    // remove previous child nodes of all news container
    removeAllChild(allNewsInACategoryContainer);

    try {
        // show spinner while fetching
        toggleSpinner(true);
        const response = await fetch(`https://openapi.programming-hero.com/api/news/category/${categoryId}`);
        const object = await response.json();

        // sort in most viewed first
        sortNews(object.data, allNewsInACategoryContainer);
        // then add event handler to the select element to change order
        document.querySelector("#sort-news").onchange = () => sortNews(object.data, allNewsInACategoryContainer);

        // display how much items found in a category
        showItemsFoundMessage(object.data, categoryName);
    } catch (err) {

        // exact error in console
        console.log(err.message);

        // error in ui
        const errorContainer = document.createElement("p");
        errorContainer.className = "text-decoration-underline pt-5 mt-5";
        errorContainer.textContent = "Error: Unable to load news!";
        allNewsInACategoryContainer.appendChild(errorContainer);
    } finally {
        // hide spinner after fetching done
        toggleSpinner(false);
    }
}

function showItemsFoundMessage(allNews, categoryName) {
    // showing items found message
    const itemsFoundContainer = document.querySelector("#items-found");
    itemsFoundContainer.textContent = `${allNews.length} items found for category ${categoryName}`;
}

function addAllNewsToUI(allNews, allNewsInACategoryContainer) {
    allNews.forEach(news => {
        const newsCard = document.createElement("div");
        newsCard.className = "card mb-3";
        newsCard.innerHTML = `
        <div class="row g-0 bg-white">
            <div class="col-md-4 col-lg-3 p-1">
                <img src="${news.thumbnail_url}" class="w-100 h-100 thumbnail" alt="news thumbnail">
            </div>
            <div class="col-md-8 col-lg-9">
                <div class="card-body d-flex flex-column h-100 justify-content-evenly">
                    <h5 class="card-title fw-bold">${news.title}</h5>
                    <p class="card-text text-muted">${news.details.slice(0, 185)}</p>
                    <p class="card-text text-muted">${news.details.slice(185, 277)}...</p>
                    <div class="row align-items-center">
                        <div class="col-6 col-md d-flex align-items-center">
                            <img src="${news.author.img}" class="rounded-circle news-author-img" alt="avatar">
                            <div class="d-flex flex-column ms-2">
                                <small class="mb-0">${news.author?.name || 'Not Available'}</small>
                                <small class="mb-0 text-muted">${news.author?.published_date?.split(" ")[0] ?? 'Not Available'}</small>
                            </div>
                        </div>
                        <div class="col-6 text-center col-md">
                            <i class="fa-regular fa-eye"></i><small class="ms-2">${news.total_view ?? 'Not Available'}</small>
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


// sort news
function sortNews(allNews, allNewsInACategoryContainer) {
    // remove previous news in the container
    if (allNewsInACategoryContainer.childNodes) {
        removeAllChild(allNewsInACategoryContainer);
    }

    const sortOrder = document.querySelector("#sort-news").value;
    console.log(sortOrder);
    if (sortOrder === "most-viewed") {
        allNews.sort((a, b) => b.total_view - a.total_view);
        addAllNewsToUI(allNews, allNewsInACategoryContainer);
    } else {
        allNews.sort((a, b) => a.total_view - b.total_view);
        addAllNewsToUI(allNews, allNewsInACategoryContainer);
    }
}


// spinner
function toggleSpinner(isLoading) {
    const spinner = document.querySelector(".spinner");
    if (isLoading) {
        spinner.classList.remove("d-none");
        spinner.classList.add("d-flex");
    } else {
        spinner.classList.add("d-none");
        spinner.classList.remove("d-flex");
    }
}

// remove all child nodes of a particular parent
function removeAllChild(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

loadNewsCategories();
loadAllNewsInACategory("08", "All News");