export default {
  toggleSidebar() {
    let icon = document.getElementsByClassName('hamburger')[0]
    document.body.classList.toggle('sidebar-open')
    icon.classList.toggle('is-active')
  },

  addClass(el, className) {
    if (el.classList) el.classList.add(className)
    else el.className += ' ' + className
  },

  hasClass(el, className) {
    const hasClass = el.classList
      ? el.classList.contains(className)
      : new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className)

    return hasClass
  },

  reset(prefix) {
    let regx = new RegExp('\\b' + prefix + '(.*)?\\b', 'g')
    document.body.className = document.body.className.replace(regx, '')
  },

  setLayout(layoutName) {
    this.reset('layout-')
    document.body.classList.add('layout-' + layoutName)
  },

  setSkin(skinName) {
    this.reset('skin-')
    document.body.classList.add('skin-' + skinName)
  },

  setLogo(logoSrc) {
    document.getElementById('logo-desk').src = logoSrc
  },

  toggleClassShow() {
    var menu = document.querySelector(".header-notify");
    var dropdownmenu = document.querySelector(".header-notify .dropdown-menu");
    menu.classList.toggle("show");
    dropdownmenu.classList.toggle("show");
  },
  toggleClassShowProfile() {
    var menu = document.querySelector(".profile-dropdown");
    var dropdownmenu = document.querySelector(".profile-dropdown .dropdown-menu");
    menu.classList.toggle("show");
    dropdownmenu.classList.toggle("show");
  },
  removeToggleForProfileHeaderDropdown() {
    var menu = document.querySelector(".profile-dropdown");
    if (menu.classList.contains("show")) {
      menu.classList.remove("show");
    }
    var dropdownmenu = document.querySelector(".profile-dropdown .dropdown-menu");
    if (dropdownmenu.classList.contains("show")) {
      dropdownmenu.classList.remove("show");
    }
  }
}
