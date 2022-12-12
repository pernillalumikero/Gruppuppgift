let urlParams = new URLSearchParams(window.location.search);
let postId = urlParams.get("id");

fetchposts();

async function fetchposts() {
    try {
        console.log(postId)
        const response = await fetch (`https://blog-api-assignment.up.railway.app/posts/${postId}`);
        const post = await response.json();
        
        let postDate = new Date(post.date);
        const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

            // const blog_date = new Date(`${post.date}`);
            // let year = blog_date.getFullYear();
            // let month = blog_date.getMonth();
            // let day = blog_date.getDay();
            // let hours = blog_date.getHours();
            // let minutes = blog_date.getMinutes();

            document.querySelector("#date").innerHTML = `<p>${postDate.getDate()}-${months[postDate.getMonth()]}-${postDate.getFullYear()} ${postDate.getHours()}:${postDate.getMinutes()}:${postDate.getSeconds()}</p>`;

            if(post.title != null) {
                let title = post.title.charAt(0).toUpperCase() + post.title.slice(1);
                document.querySelector("h1").innerText = title;
                console.log(title)
                
            } else {
                document.querySelector("h1").innerText = "No title"
            }

            if (post.author != null) {
                document.querySelector("#author").innerText = `
                Author: ${post.author}`
            } else {
                document.querySelector("#author").innerText = `
                Author: Unknown`
            }

                document.querySelector("#content").innerText = post.content;

            if (post.tags != null && post.tags != "") {
                document.querySelector("#tags").innerText = `Tags: ${post.tags.join(", ")}`
            } else {
                document.querySelector("#tags").innerText = ``;
            }
            

        } catch (error) {
            console.log(error);
        }
    }