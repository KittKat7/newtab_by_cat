document.addEventListener('DOMContentLoaded', function () {
    console.log('New tab page loaded!');
    const searchForm = document.getElementById('search-form');
    searchForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission
        searchBrave(); // Call the search function
    });
    const searchInput = document.getElementById('search-input');
    searchInput.focus();
    searchInput.select();

});

function searchBrave() {
    var sb = document.getElementById("search-input");
    var search = sb.value.replace(" ", "+");
    window.location.replace("https://search.brave.com/search?q=" + search + "&source=web");
}




