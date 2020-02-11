const registerForm = document.getElementById('registerForm');
const errorMessage = document.getElementById('errorMessage');


registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    let formData = new FormData(registerForm);
    
    const data = {
        'firstName': formData.get('firstName'),
        'lastName': formData.get('lastName'),
        'email': formData.get('email'),
        'password': formData.get('password'),
        'verifyPassword': formData.get('verifyPassword')
    };

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
        console.log(data.password, data.verifyPassword);
        
        if (data.password !== data.verifyPassword) {
           throw new Error('Passwords do not match');
        }

        const res = await fetch('/register', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        });
        const json = await res.json();
    
        if (json.status === 'Success') {
            window.location.href = '/home';
        } else {
            
            errorMessage.innerHTML = json.message;
        }

    } catch (e) {
        console.log(e);
        errorMessage.innerHTML = e.message;
    }
    
})
