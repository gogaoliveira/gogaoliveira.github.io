/* Menu Secundario */
var menuDoc = document.getElementsByClassName('link-nav-arrow')[0];
var listSecond = document.querySelector('.list-nav-second');

menuDoc.addEventListener('click', function(){

    listSecond.classList.toggle('hide');
    menuDoc.classList.toggle('arrow');

});

/* Menu Hamburguer 
    Acionamento do Menu
*/

var iconMenu = document.querySelector('.icon-menu');
var menu = document.querySelector('.menu')

iconMenu.addEventListener('click', function(){
    menu.classList.toggle('menu-move')
});

