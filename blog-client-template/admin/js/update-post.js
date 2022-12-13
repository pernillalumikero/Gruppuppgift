let urlParams = new URLSearchParams(window.location.search);
let postId = urlParams.get("id");

getPost();

async function getPost() {
    try {
    let response = await fetch (`https://blog-api-assignment.up.railway.app/posts/${postId}`)
    
    let post = await response.json();

    //prefill input fields
    document.getElementById("title-input").value = post.title;
    document.getElementById("author-input").value = post.author;
    document.getElementById("post-textarea").value = post.content;

    let select = document.getElementById("tags-select");

    //if there are tags, loop trough them and option.values to see if they match, if so - mark as preselected
    if (post.tags.length >= 0) {
        for (let tag of post.tags) {
            for (let i = 0; i < select.length; i++){
                let option = select.options[i];
                if (tag == option.value)
                option.setAttribute("selected", "")
            }
        }
    }

    } catch (error) {
        console.log(error);
    }
}

document.getElementById("update-post-form").addEventListener("submit", async function (e) {
    e.preventDefault();
    let form = e.target;

    let formDataObject = serializeForm(form);
    
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

    location.replace("index.html");
    })

    let serializeForm = function (form) {
    var obj = {};
    var formData = new FormData(form);

    for (var key of formData.keys()) {
        let inputData = formData.getAll(key);

        if (inputData.length > 1) {
            obj[key] = inputData;
        } else {
            obj[key] = inputData[0];    
        }
    }
    return obj;
};
