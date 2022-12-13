fetchposts();

console.log(document.getElementById("pic-holder"))

document.querySelector("aside").addEventListener("mouseenter", (e) => {
    e.target.style.backgroundImage = "url('./img/hyde-bg.jpg')";
    e.target.innerHTML = `
    <a class="aside-link" href="author.html">
            <h2 class="aside-header-hyde">About the author</h2>
            <div class="pic-holder" id="hyde-style-pic"><img src="./img/hyde.jpg" alt=""></div>
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
    <div class="pic-holder"><img src="./img/jekyll.jpg" alt=""></div>
    <div class="pic-text">
        <p class="author-jekyll"><b>Dr Jekyll</b></p>
        <br>
        <br>
        <p> Photo by Paolo Bendandi on <a href="https://unsplash.com/license">Unsplash</a></p>
    </div>`
})

async function fetchposts() {
    try {
        const response = await fetch("https://blog-api-assignment.up.railway.app/posts");
        const posts = await response.json();
        
        for (let post of posts) {

            const blog_date = new Date(`${post.date}`);
            let year = blog_date.getFullYear();
            let month = blog_date.getMonth()+1;
            let day = blog_date.getDate();
            let hours = blog_date.getHours();
            let minutes = blog_date.getMinutes();

            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            
            if(post.title != null) {
                let title = post.title.charAt(0).toUpperCase() + post.title.slice(1);
                document.querySelector("main").innerHTML += `<h2>${title}</h2>
                <i><b>Date:</b> ${year}/${month}/${day} <b>Time:</b> ${hours}:${minutes}</i>
                <br>
                <br>`
                
            } else {
                document.querySelector("main").innerHTML += `<h2>No title</h2>
                <i><b>Date:</b> ${year}/${month}/${day}<b>Time:</b> ${hours}:${minutes}</i>
                <br>
                <br>`
            }

            let signiture = "";

            function choseSignature(min, max) {
            
                if (post.author == "Mr Hyde") {
                    signiture = "hyde-signature"
                } else if (post.author == "Dr Jekyll") {
                    signiture = "jekyll-signiture";
                } else {
                    let number = Math.random()*(max-min)+min;
                    if (number > min+1) {
                        signiture = "hyde-signature";
                    } else {
                        signiture = "jekyll-signiture";
                    }
                }
            
                return signiture;
            }

            choseSignature(0, 3);

            if (post.author != null) {
                document.querySelector("main").innerHTML += `
                <p>Author: </p><p id=${signiture}>${post.author}</p><br>`
            } else {
                document.querySelector("main").innerHTML += `
                <p>Author: </p><p id=${signiture}>Unknown</p>
                <br>`

            }

                document.querySelector("main").innerHTML += `
                    <p>${addReadMe(post.content)}</p>
                    <b><a class="post-link" href="post.html?id=${post._id}">Read more<a></b>
                    <br>
                    <br>
                    <br>
                `;

            if (post.tags != null && post.tags != "") {
                document.querySelector("main").innerHTML += `<i>Tags: ${post.tags.join(", ")}</i><br><br>`
            } else {
                document.querySelector("main").innerHTML += ``;
            }
            
            }

    } catch (error) {
        console.log(error);
    }
}

function addReadMe(content) {
    if (content.length > 100) {
        content = content.substring(0, 100) + "...";
    } else {
        content += " ";
    }
    return content
}