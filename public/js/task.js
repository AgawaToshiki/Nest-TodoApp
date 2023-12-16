const deleteUser = document.getElementById('delete-user')
deleteUser.addEventListener('click', async () => {
  const confirmed = confirm('アカウントを削除しますか？')
    if(confirmed){
      await doDeleteUser();
    }
})

async function doDeleteUser(){
  try{
    await fetch("/deleteUser", {
      method: "POST",
    }).then((response) => {
      if(response.redirected){
        const redirectUrl = response.url;
        window.location.href = redirectUrl;
      }else{
        return response.json();
      }
    })
  }catch(error){
    console.error(error)
  }
}


const toggleBtn = document.querySelector('.toggle-button');
const dropBox = document.querySelector('.dropdown')
const changeModalWindow = () => {
  dropBox.classList.toggle('active');
} 
toggleBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  changeModalWindow();
})

document.documentElement.addEventListener('click', () => {
  if(dropBox.classList.toggle('active')){
    changeModalWindow();
  }
})