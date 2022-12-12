document.getElementById('create-post-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    let form = e.target;
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

            if(data.hasOwnProperty('_id')) {
                window.history.back();
            }

            // Assign values of the errors key to errorData
            const errorData = Object.values(data.message.errors);

            // Loops through the error messages and places each one in a different div inside the #error-messages div
            for(let value of errorData) {
                document.getElementById('error-message').innerHTML += `
                    <div>${value.message}</div>
            `;
            }            

        } catch(error) {
            console.log(error);
        }
        
});


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

// Button to auto-fill the different text fields in the form for quicker testing
document.getElementById('lazy-btn').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('title-input').setAttribute('value', 'Today was a good day');
    document.getElementById('author-input').setAttribute('value', 'Charles Boyle');
    document.getElementById('post-textarea').innerText = 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi corrupti saepe alias suscipit veritatis distinctio fuga id ad dicta aliquid eius eos illo nobis, tenetur delectus, architecto, blanditiis officia at.';
    document.getElementById("tags-select").value = document.getElementById("tags-select").getElementsByTagName('option')[0].value;
    
});