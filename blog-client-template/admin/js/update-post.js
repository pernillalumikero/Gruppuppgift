let urlParams = new URLSearchParams(window.location.search);
let postId = urlParams.get("id");


// let updateTitle = document.getElementById("title-input");
// let updateAuthor = document.getElementById("author-input");
// let updateContent = document.getElementById("post-textarea");

getPost();

async function getPost() {
    try {
    let response = await fetch (`https://blog-api-assignment.up.railway.app/posts/${postId}`)
    
    let post = await response.json();

    document.getElementById("title-input").value = post.title;
    console.log(post.title)
    document.getElementById("author-input").value = post.author;
    document.getElementById("post-textarea").value = post.content;
    
    let select = document.getElementById("tags-select");

    //loop trough tags and option.values to see if they match, if so - mark as preselected
    for (let tag of post.tags) {

        for (let i = 0; i < select.length; i++){
            let option = select.options[i];
            if (tag == option.value)
            option.setAttribute("selected", "")
        }
    }

    } catch (error) {
        console.log(error);
    }
}

document.getElementById("update-post-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    let select = document.getElementById("tags-select");

    let titleFromInput = document.getElementById("title-input").value;
    let contentFromTextArea = document.getElementById("post-textarea").value;
    let authorFromInput = document.getElementById("author-input").value;

    let tags = [];

    for (let i = 0; i < select.length; i++) {
        let option = select.options[i];
        console.log(tags)
        if (option.getAttribute("selected") != null) {
            tags += option;
        }
    }
    

        let formDataObject = {
            // tags: tags,
            title: titleFromInput,
            content: contentFromTextArea,
            author: authorFromInput
        }
    
    try { 
        await fetch(`https://blog-api-assignment.up.railway.app/posts/${postId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(formDataObject)
        })

    } catch (error) {
            console.log(error);
        }

    //location.replace("index.html");
    })
