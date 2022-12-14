document.querySelector("main").addEventListener("mouseenter", (e) => {
    e.target.style.backgroundImage = "url('./img/hyde-bg.jpg')";
    e.target.innerHTML = `
    <h2 id="author-hyde-header" class="hyde-colors">Mr Hyde</h2>
            <p class="hyde-colors">Mr Hyde is an eccentric, spontaneous, highly irregular person trapped in Dr Jekylls body. But he manages to break out every now and then when Dr Jekyll finds himself in stressed or unconfortable situations. Mr Hyde can deal with anything, with a crazy grin on his face.</p>
            <div id="author-wrapper">
                <div class="pic-holder" id="author-pic-holder"><img class="img-author" src="./img/hyde.jpg" alt=""></div>
                <div class="pic-text" id="author-pic-text">
                    <p class="hyde-colors" id="hyde-signature"><b>Mr Hyde</b></p><br><br><p class="hyde-colors">Photo by Armin Lotfi on 
                    <a class="hyde-colors" href="https://unsplash.com/license">Unsplash</a></p>
                </div>
            </div>`;
 })
 document.querySelector("main").addEventListener("mouseleave", (e) => {
    e.target.style.backgroundImage = "unset";
     e.target.innerHTML = `
     <h2>Dr Jekyll</h2>
            <p>Dr Jekyll is a very calm and well put together, balanced and secure person who you might not always notice in a room. He favors a moderate and minimalistic design, whether it be regarding his clothes, home decor or blog. Sometimes though he has black-outs and wierd, crazy things show up in the most unexpected places...</p>
            <div id="author-wrapper">
                <div class="pic-holder" id="author-pic-holder"><img class="img-author" src="./img/jekyll.jpg" alt=""></div>
                <div class="pic-text" id="author-pic-text">
                    <p class="author-jekyll"><b>Dr Jekyll</b></p><br><br><p> Photo by Paolo Bendandi on <a href="https://unsplash.com/license">Unsplash</a></p>
                </div>
            </div>
            `
 })


fetchTitles();

async function fetchTitles() {
    try {
        const response = await fetch("https://blog-api-assignment.up.railway.app/posts");
        const posts = await response.json();
        let i = 0;
        
        for(let post of posts) {

            const blog_date = new Date(`${post.date}`);
                let year = blog_date.getFullYear();
                let month = blog_date.getMonth()+1;
                let day = blog_date.getDate();
                let hours = blog_date.getHours();
                let minutes = blog_date.getMinutes();
    
                if (minutes < 10) {
                    minutes = "0" + minutes;
                }

            if (i < 4) {
                i++;

                if(post.title != null) {
                    let title = post.title.charAt(0).toUpperCase() + post.title.slice(1);
                    document.querySelector("aside").innerHTML += `
                    <a class="aside-link" href="index.html">
                        <h2 class="author-aside-titles">${title}</h2>
                        <i><b>Date:</b> ${year}/${month}/${day} <b>Time:</b> ${hours}:${minutes}</i>
                    </a>`
                    
                } else {
                    document.querySelector("aside").innerHTML += `
                    <a class="aside-link" href="index.html">
                    <h2 class="author-aside-titles">No title</h2>
                    <i><b>Date:</b> ${year}/${month}/${day} <b>Time:</b> ${hours}:${minutes}</i>
                    </a>`
                }
        } else {
            break;
        }
        }

    } catch (error) {
        console.log(error);
    }
}