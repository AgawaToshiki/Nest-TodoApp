const form = document.getElementById('login');

form.addEventListener("submit", async(event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const res = await fetch(`http://localhost:3000/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    const data = await res.json();
    localStorage.setItem('access_token', data.token);
    window.location.href = '/tasks';
});