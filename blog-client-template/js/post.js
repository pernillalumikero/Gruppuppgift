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
                ${post.author}`
            } else {
                document.querySelector("#author").innerText = `
                Unknown`
            }

                document.querySelector("#content").innerText = post.content;

            if (post.tags != null && post.tags != "") {
                document.querySelector("#tags").innerText = `${post.tags.join(", ")}`
            } else {
                document.querySelector("#tags").innerText = ``;
            }
            

        } catch (error) {
            console.log(error);
        }
    }