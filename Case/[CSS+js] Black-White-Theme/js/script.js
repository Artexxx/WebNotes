let darkTheme = false;
// Объекты веб-хранилища localStorage  позволяют хранить пары ключ/значение в браузере.
if (localStorage.getItem('Theme') != null) {
  let root = document.documentElement;
  if (localStorage.getItem('Theme') == "true") {
    console.log('dark mode starting');
    darkTheme = true;
    root.style.setProperty("--primary-color", '#FDF5E6');
    root.style.setProperty("--secondary-color", '#313131');
  }
}

var item = document.getElementById("theme");
item.addEventListener('click', changeTheme);
//item.addEventListener("mouseover", changeTheme);
//item.addEventListener("mouseout", changeTheme);

function changeTheme() {
  let root = document.documentElement;
  if (darkTheme) {
    root.style.setProperty("--primary-color", '#313131');
    root.style.setProperty("--secondary-color", '#FDF5E6');
  }
  if (!darkTheme) {
    root.style.setProperty("--primary-color", '#ffffff');
    root.style.setProperty("--secondary-color", '#313131');
  }
  darkTheme = !darkTheme;
  localStorage.setItem(`Theme`, `${darkTheme}`)
}
