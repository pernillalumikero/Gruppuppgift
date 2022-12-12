fetchAllPosts();

async function fetchAllPosts() {
    try {
        const response = await fetch('https://blog-api-assignment.up.railway.app/posts');
        let posts      = await response.json();

        let postsHTML = '';
        for(let post of posts) {
            let postDate = new Date(post.date);
            const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

            postsHTML += `
                <tr>
                    <td>${post.title}</td>
                    <td>${post.author}</td>
                    <td>${post.tags}</td>
                    <td>${postDate.getDate()}-${months[postDate.getMonth()]}-${postDate.getFullYear()} ${postDate.getHours()}:${postDate.getMinutes()}:${postDate.getSeconds()}</td>
                    <td>
                        <a href="update-post.html?id=${post._id}">Update</a>
                        <a href="#" class="del-btn" data-id="${post._id}">Delete</a>
                    </td>
                </tr>
            `
        }

        document.getElementById('blog-posts-admin').innerHTML = postsHTML;

    } catch(error) {
        console.log(error);
    }

    let deleteButtons = document.querySelectorAll('.del-btn');

    for(let button of deleteButtons) {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            const postId = e.target.dataset.id;

            const deletePost = async () => {
                try {
                    const response = await fetch(`https://blog-api-assignment.up.railway.app/posts/${postId}`, {
                        method: 'DELETE',
                        headers: {
                        'Content-Type': 'application/json'
                        }
                    });

                    if(!response.ok) {
                        throw new Error(response.status);
                    }

                    e.target.parentNode.parentNode.remove();
            
                } catch(error) {
                    console.log(error);
                }
            }
            deletePost();
        })
    }
}