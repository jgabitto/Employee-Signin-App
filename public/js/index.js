const signInForm = document.getElementById('signInForm');
const errorMessage = document.getElementById('errorMessage');


signInForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    let formData = new FormData(signInForm);
    
    const data = {
        'email': formData.get('email'),
        'password': formData.get('password')
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
        const res = await fetch('/login', {
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
        errorMessage.innerHTML = e;
    }
    
})
