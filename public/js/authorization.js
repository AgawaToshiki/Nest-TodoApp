    async function getData(){
        const token = localStorage.getItem('access_token');
        await fetch(`http://localhost:3000/tasks`, {
          method: "GET",
          headers: {
            'Authorization': `Bearer ${token}`  
          }
        });
        console.log("success!!!", token)
    }

    getData();