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