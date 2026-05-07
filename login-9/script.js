// =========================================
//  DISASTER MANAGEMENT — SCRIPT.JS
// =========================================

let currentRole = 'citizen';
let currentTab  = 'login';
let menuOpen    = false;

let tabLogin, tabRegister, panelLogin, panelRegister;
let tabVolLogin, tabVolRegister, panelVolLogin, panelVolRegister;
let citizenSection, volunteerSection, adminSection;
let roleCBtn, roleVBtn, roleABtn;
let hamburger, mobileMenu;
let navSignin, navSignup;

document.addEventListener('DOMContentLoaded', function () {
  tabLogin         = document.getElementById('tabLogin');
  tabRegister      = document.getElementById('tabRegister');
  panelLogin       = document.getElementById('panelLogin');
  panelRegister    = document.getElementById('panelRegister');

  tabVolLogin      = document.getElementById('tabVolLogin');
  tabVolRegister   = document.getElementById('tabVolRegister');
  panelVolLogin    = document.getElementById('panelVolLogin');
  panelVolRegister = document.getElementById('panelVolRegister');

  citizenSection   = document.getElementById('citizenSection');
  volunteerSection = document.getElementById('volunteerSection');
  adminSection     = document.getElementById('adminSection');

  roleCBtn   = document.getElementById('roleC');
  roleVBtn   = document.getElementById('roleV');
  roleABtn   = document.getElementById('roleA');
  hamburger  = document.getElementById('hamburger');
  mobileMenu = document.getElementById('mobileMenu');
  navSignin  = document.getElementById('navSignin');
  navSignup  = document.getElementById('navSignup');

  setRole('citizen');
  switchTab('login');
});

// =========================================
//  ROLE SWITCH
// =========================================
function setRole(role) {
  currentRole = role;

  roleCBtn.classList.toggle('active', role === 'citizen');
  roleVBtn.classList.toggle('active', role === 'volunteer');
  roleABtn.classList.toggle('active', role === 'admin');

  citizenSection.style.display   = role === 'citizen'   ? 'block' : 'none';
  volunteerSection.style.display = role === 'volunteer' ? 'block' : 'none';
  adminSection.style.display     = role === 'admin'     ? 'block' : 'none';
}

// =========================================
//  CITIZEN TAB SWITCH
// =========================================
function switchTab(tab) {
  currentTab = tab;
  if (!tabLogin || !tabRegister) return;

  const isLogin = tab === 'login';
  tabLogin.classList.toggle('active', isLogin);
  tabRegister.classList.toggle('active', !isLogin);
  panelLogin.classList.toggle('active', isLogin);
  panelRegister.classList.toggle('active', !isLogin);

  if (navSignin) {
    navSignin.classList.toggle('outline', isLogin);
    navSignin.classList.toggle('solid',   !isLogin);
  }
  if (navSignup) {
    navSignup.classList.toggle('solid',   isLogin);
    navSignup.classList.toggle('outline', !isLogin);
  }
}

// =========================================
//  VOLUNTEER TAB SWITCH
// =========================================
function switchVolTab(tab) {
  if (!tabVolLogin || !tabVolRegister) return;

  const isLogin = tab === 'login';
  tabVolLogin.classList.toggle('active', isLogin);
  tabVolRegister.classList.toggle('active', !isLogin);
  panelVolLogin.classList.toggle('active', isLogin);
  panelVolRegister.classList.toggle('active', !isLogin);
}

// =========================================
//  HAMBURGER MENU
// =========================================
function toggleNav() {
  menuOpen = !menuOpen;
  hamburger.classList.toggle('open', menuOpen);
  mobileMenu.classList.toggle('open', menuOpen);
}

function closeMobileMenu() {
  menuOpen = false;
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
}

document.addEventListener('click', function (e) {
  if (menuOpen && !hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
    closeMobileMenu();
  }
});

window.addEventListener('resize', function () {
  if (window.innerWidth > 768 && menuOpen) closeMobileMenu();
});

// =========================================
//  PASSWORD VISIBILITY TOGGLE
// =========================================
function togglePwd(inputId, iconId) {
  const input = document.getElementById(inputId);
  const icon  = document.getElementById(iconId);
  if (!input || !icon) return;

  const isHidden = input.type === 'password';
  input.type = isHidden ? 'text' : 'password';
  icon.classList.toggle('bx-hide', !isHidden);
  icon.classList.toggle('bx-show',  isHidden);
}

// =========================================
//  FILE UPLOAD HANDLER
// =========================================
function handleFileUpload(input) {
  const box  = document.getElementById('uploadBox');
  const text = document.getElementById('uploadText');
  if (!input.files || !input.files[0]) return;

  const file = input.files[0];
  const name = file.name.length > 28 ? file.name.substring(0, 25) + '...' : file.name;

  text.textContent = '✓ ' + name;
  box.classList.add('uploaded');
}