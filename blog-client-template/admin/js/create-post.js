document.getElementById('create-post-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const form = e.target;
    document.getElementById('error-message').innerHTML = '';
    

    let formDataObject = serializeForm(form);

        try {
            const response = await fetch('https://blog-api-assignment.up.railway.app/posts', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(formDataObject)
            });
            let data = await response.json();
            const errorData = Object.values(data.message.errors);

            for(let value of errorData) {
                document.getElementById('error-message').innerHTML += `
                    <div>${value.message}</div>
            `;
            }
            
            // location.replace('index.html'); //Reminder: Make so it redirects to the page you came from
        } catch(error) {
            
        }
})


let serializeForm = function (form) {
    var obj = {};
    var formData = new FormData(form);
    // console.log(formData.getAll());

    for (var key of formData.keys()) {
        let inputData = formData.getAll(key);

        if (inputData.length > 1) {
            obj[key] = inputData;
        } else {
            obj[key] = inputData[0];    
        }
    }
    
    // console.log(obj);
    return obj;
};