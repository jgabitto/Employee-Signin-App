const registerForm = document.getElementById('registerForm');
const errorMessage = document.getElementById('errorMessage');


registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    let formData = new FormData(registerForm);
    
    const data = {
        'firstName': formData.get('firstName'),
        'lastName': formData.get('lastName'),
        'email': formData.get('email'),
        'password': formData.get('password')
    };

    let myHeaders = new Headers({
        'Content-Type': 'application/json',
        'authorization': 'Bearer '
    });

    // fetch('/login', {
    //     method: 'POST',
    //     body: JSON.stringify(data),
    //     headers: {"Content-Type": "application/json"}
    // }).then((res) => {
    //     res.json().then((data) => {
    //         console.log(data);
    //     })
    // }).catch((e) => {
    //     console.log('Goodbye');
    // })

    try {
        const res = await fetch('/register', {
            method: 'POST',
            body: JSON.stringify(data),
            // headers: 
            // {
            //     'Content-Type': 'application/json'
            // }
            headers: myHeaders
        });
        const json = await res.json();
        console.log(json);

        const message = myHeaders.get('authorization');

        alert(message);
    
        if (json.status === 'Success') {
            window.location.href = '/home';
        } else {
            errorMessage.innerHTML = json.message;
        }

    } catch (e) {
        errorMessage.innerHTML = e;
    }
    
})
