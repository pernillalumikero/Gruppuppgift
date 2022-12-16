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

            if(!response.ok) {
                throw new Error(response.status);
            }
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
    getWikiHowContent();
    document.getElementById("tags-select").value = document.getElementById("tags-select").getElementsByTagName('option')[0].value;
    
});

// Function to fill fields with random text from the WikiHow API
const getWikiHowContent = () => {
    let dataContent = '';
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'c039d7b0c5msh324122ad4915cfap146c4bjsnb594a77cb312',
                'X-RapidAPI-Host': 'hargrimm-wikihow-v1.p.rapidapi.com'
            }
        };
        fetch('https://hargrimm-wikihow-v1.p.rapidapi.com/steps?count=10', options)
        .then(response => response.json())
        .then(response => {
            const dataValues = Object.values(response);
            document.getElementById('title-input').value = dataValues[0].slice(0, -1);
            document.getElementById('author-input').value = "Dr. Jekyll / Mr. Hyde";
            for(let value of dataValues) {
                dataContent += value + " ";
            }

            document.getElementById('post-textarea').innerText = dataContent;
        })
        .catch(err => console.error(err));
}