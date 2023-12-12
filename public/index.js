const deleteUser = getElementById('delete-user')
deleteUser.addEventListener('click', async () => {
  const confirmed = confirm('アカウントを削除しますか？')
    if(confirmed){
      await doDeleteUser();
    }
})

  async function doDeleteUser(){
    try{
      const response = await fetch("/deleteUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
    }catch(error){
      console.error(error)
    }

  }