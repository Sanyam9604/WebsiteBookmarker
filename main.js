document.getElementById("myForm").addEventListener("submit", saveBookmark);

function saveBookmark(e) {
    var siteName = document.getElementById("site-name").value;
    var siteUrl = document.getElementById("site-url").value;
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    if (!siteName || !siteUrl) {
        document.getElementById("alertsForValidations").innerHTML = `
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
        Please fill in the form. 
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
    }else if(!siteUrl.match(regex)){
        document.getElementById("alertsForValidations").innerHTML = `
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
        Please enter a valid URL. 
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;

        document.getElementById("site-url").value = '';
    } else {
    var bookmark = {
        name: siteName,
        url: siteUrl
    }

    if(localStorage.getItem("bookmarks") === null){
        var bookmarks = [];
        bookmarks.push(bookmark);
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }else{
        var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
        bookmarks.push(bookmark);
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }

    document.getElementById("site-name").value = '';
    document.getElementById("site-url").value = '';
    fetchBookmarks(); }
    e.preventDefault();
}

function fetchBookmarks() {
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    var bookmarksResults = document.getElementById("bookmarksResults");
    bookmarksResults.innerHTML = '';
    bookmarks.map((b) => {
        bookmarksResults.innerHTML += `
        <div class="card" style="width: 18rem; margin:1rem; display:inline-block;">
        <div class="card-body">
          <h5 class="card-title">${b.name}</h5>
          <a href="${b.url}" target="_blank" class="btn btn-outline-info btn-sm">Visit</a>
          <button ${onclick= deleteBookmark} value=${b.url} " class="btn btn-outline-danger btn-sm">Delete</button>
        </div>
        </div>
    `});
}


function deleteBookmark(p) {
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    for(var i=0; i<bookmarks.length; i++) {
        if(bookmarks[i].url == p.target.value){
            bookmarks.splice(i,1);
        }
    }
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    fetchBookmarks();
}