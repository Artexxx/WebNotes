function toogleMenu() {
    document.getElementById("mobile-menu__open").classList.toggle("hidden");
    document.getElementById("mobile-menu__close").classList.toggle("hidden");
    document.getElementById("mobile-menu__items").classList.toggle("hidden");
  }
  
  document.getElementById("mobile-menu__open").addEventListener(
    "click",
    () => {
      toogleMenu();
    },
    false
  );
  document.getElementById("mobile-menu__close").addEventListener(
    "click",
    () => {
      toogleMenu();
    },
    false
  );
  