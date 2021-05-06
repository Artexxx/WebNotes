let darkTheme = false;
// Объекты веб-хранилища localStorage  позволяют хранить пары ключ/значение в браузере.
if (localStorage.getItem('Theme') != null) {
  let root = document.documentElement;
  if (localStorage.getItem('Theme') == "true") {
    console.log('Dark mode starting');
    darkTheme = true;
    document.documentElement.setAttribute('data-theme', 'dark');
  }
}

var item = document.getElementById("theme");
item.addEventListener('click', changeTheme);

function changeTheme() {
  let root = document.documentElement;
  if (darkTheme) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } 
  else {
    document.documentElement.setAttribute('data-theme', 'light');
  }
  darkTheme = !darkTheme;
  localStorage.setItem(`Theme`, `${darkTheme}`)
}
