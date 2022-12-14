let urlParams = new URLSearchParams(window.location.search);
let postId = urlParams.get("id");
let picNum = urlParams.get("pic-num");
let authorSignature = urlParams.get("author");

fetchposts();

async function fetchposts() {
    try {
        console.log(postId)
        const response = await fetch (`https://blog-api-assignment.up.railway.app/posts/${postId}`);
        const post = await response.json();
        
        let postDate = new Date(post.date);
        const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

            document.querySelector("#date").innerHTML = `<p>${postDate.getDate()}-${months[postDate.getMonth()]}-${postDate.getFullYear()}</p>`;
            document.querySelector("#time").innerText =`${postDate.getHours()}:${postDate.getMinutes()}:${postDate.getSeconds()}`

            if(post.title != null) {
                let title = post.title.charAt(0).toUpperCase() + post.title.slice(1);
                document.querySelector("h1").innerText = title;
                console.log(title)
                
            } else {
                document.querySelector("h1").innerText = "No title"
            }

            if (post.author != null) {
                document.querySelector("#author-wrapper").innerHTML += `<p id=${authorSignature}>${post.author}</p><br>`
            } else {
                document.querySelector("#author-wrapper").innerHTML = `<p id=${authorSignature}> Unknown</p>`
            }

            document.querySelector("#pic-div").innerHTML = `<img class="img-post" src="https://picsum.photos/id/${picNum}/600/300">`

                document.querySelector("#content").innerText = post.content;

            if (post.tags != null && post.tags != "") {
                document.querySelector("#tags").innerHTML = `<i><b>Tags: </b>${post.tags.join(", ")}</i>`
            } else {
                document.querySelector("#tags").innerText = ``;
            }
            

        } catch (error) {
            console.log(error);
        }
    }