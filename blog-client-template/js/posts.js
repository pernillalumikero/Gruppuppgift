fetchposts();

console.log(document.getElementById("pic-holder"))

document.querySelector("aside").addEventListener("mouseenter", (e) => {
   e.target.innerHTML = `
   <div id="pic-holder"><img src="./img/hyde.jpg" alt=""></div>
   <p><b>Mr Hyde</b></p>
   <br>
   <br>
   <p>Photo by Armin Lotfi on 
   <a href="https://unsplash.com/s/photos/crazy?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
   </p>`;
})
document.querySelector("aside").addEventListener("mouseleave", (e) => {
    e.target.innerHTML = `
    <div id="pic-holder"><img src="./img/jekyll.jpg" alt=""></div>
    <div id="pic-text">
        <p><b>Dr Jekyll</b></p>
        <br>
        <br>
        <p> Photo by Paolo Bendandi on <a href="https://unsplash.com/s/photos/crazy?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></p>
    </div>`
})

console.log(document.getElementById("pic-text").innerHTML)
async function fetchposts() {
    try {
        const response = await fetch("https://blog-api-assignment.up.railway.app/posts");
        const posts = await response.json();
        
        for (let post of posts) {

            const blog_date = new Date(`${post.date}`);
            let year = blog_date.getFullYear();
            let month = blog_date.getMonth();
            let day = blog_date.getDay();
            let hours = blog_date.getHours();
            let minutes = blog_date.getMinutes();
            
            if(post.title != null) {
                let title = post.title.charAt(0).toUpperCase() + post.title.slice(1);
                document.querySelector("main").innerHTML += `<h2>${title}</h2>
                <i><b>Date:</b> ${year}/${month}/${day} <b>Time:</b> ${hours}:${minutes}</i>
                <br>
                <br>`
                
            } else {
                document.querySelector("main").innerHTML += `<h2>No title</h2>
                <i><b>Date:</b> ${year}/${month}/${day} <b>Time:</b> ${hours}:${minutes}</i>
                <br>
                <br>`
            }

            if (post.author != null) {
                document.querySelector("main").innerHTML += `
                <p>Author: </p><p class="author">${post.author}</p><br>`
            } else {
                document.querySelector("main").innerHTML += `
                <p>Author: </p><p class="author">Unknown</p>
                <br>`

            }


                document.querySelector("main").innerHTML += `
                    <p>${post.content}</p>
                    <a href="#">Read more...<a>
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