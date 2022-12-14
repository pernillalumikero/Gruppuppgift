fetchposts();
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

async function fetchposts() {
    try {
        const response = await fetch("https://blog-api-assignment.up.railway.app/posts");
        const posts = await response.json();

        let i = 8;
        
        for (let post of posts) {
            i++;

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

            document.querySelector("main").innerHTML += `<img class="img-blog" src="https://picsum.photos/id/${i}/600/300">`

            if (post.author != null) {
                document.querySelector("main").innerHTML += `
                <br>
                <p><b>Author: </b></p><p id=${choseSignature(post.author)}>${post.author}</p><br>`
            } else {
                document.querySelector("main").innerHTML += `
                <p><b>Author: </b></p><p id=${choseSignature(post.author)}>Unknown</p>
                <br>`

            }

                document.querySelector("main").innerHTML += `
                    <p>${addReadMe(post.content)}</p>
                    <b><a class="post-link" href="post.html?id=${post._id}&pic-num=${i}&author=${choseSignature(post.author)}">Read more<a></b>
                    <br>
                    <br>
                    <br>
                `;


            if (post.tags != null && post.tags != "") {
                document.querySelector("main").innerHTML += `<i><b>Tags: </b>${post.tags.join(", ")}</i><br><br>`
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

function choseSignature(author) {
    let signature = "";
    if (author == "Mr Hyde") {
        signature = "hyde-signature"
    } else if (author == "Dr Jekyll") {
        signature = "jekyll-signature";
    } else {
        signature = "other-signature"
    }

    return signature;
}