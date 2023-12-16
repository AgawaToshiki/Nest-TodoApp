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