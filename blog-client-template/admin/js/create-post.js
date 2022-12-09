document.getElementById('create-post-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const form = e.target;

    let formDataObject = serializeForm(form);

    // if(formDataObject.title.trim() == '' || formDataObject.author.trim() == '' || formDataObject.content.trim() == '') {
    //     alert("You fill out the entire from!"); //Reminder: Create error-message-banner
    // } else {
        try {
            const response = await fetch('https://blog-api-assignment.up.railway.app/posts', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(formDataObject)
            });
            let data = await response.json();
            // console.log(data.message.errors);

            // if(data.message.errors) {
            //     document.getElementById('error-message').innerHTML = `
            //     <span>Error: ${data.message.errors.title.message}</span>
            //     <span>Error: ${data.message.errors.author.message}</span>
            //     <span>Error: ${data.message.errors.content.message}</span>
            // `;
            // }
            
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