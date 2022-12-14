asideToggleAuthor();

function asideToggleAuthor() {
    document.querySelector("aside").addEventListener("mouseenter", (e) => {
        e.target.style.backgroundImage = "url('./img/hyde-bg.jpg')";
        e.target.innerHTML = `
        <a class="aside-link" href="author.html">
                <h2 class="aside-header-hyde">About the author</h2>
                <div class="pic-holder" id="hyde-style-pic"><img class="img-author" src="./img/hyde.jpg" alt=""></div>
                <p id="hyde-signature" class="hyde-colors"><b>Mr Hyde</b></p>
                <br>
                <br>
                <p class="photo-credit">Photo by Armin Lotfi on 
                <a href="https://unsplash.com/license">Unsplash</a>
                </p>
        </a>`;
    })
    document.querySelector("aside").addEventListener("mouseleave", (e) => {
        e.target.style.backgroundImage = "unset";
        e.target.innerHTML = `
        <h2 class="aside-header">About the author</h2>
        <div class="pic-holder"><img class="img-author" src="./img/jekyll.jpg" alt=""></div>
        <div class="pic-text">
            <p class="author-jekyll"><b>Dr Jekyll</b></p>
            <br>
            <br>
            <p> Photo by Paolo Bendandi on <a href="https://unsplash.com/license">Unsplash</a></p>
        </div>`
    })
}