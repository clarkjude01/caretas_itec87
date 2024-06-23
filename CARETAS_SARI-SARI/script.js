function toggleActive(btn) {
    var buttons = document.querySelectorAll('nav button');
    buttons.forEach(function(button) {
      if (button === btn) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    });
  }

function showMenu(menuType) {
    var menuItems = document.querySelectorAll('.inventory');
    menuItems.forEach(function(menuItem) {
      if (menuItem.id === menuType) {
        menuItem.classList.add('active');
      } else {
        menuItem.classList.remove('active');
      }
    });
  }