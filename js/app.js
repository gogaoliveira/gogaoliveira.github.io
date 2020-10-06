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
var content = document.querySelector('.content');
let body = document.querySelector("body");

iconMenu.addEventListener('click', function(){
    
    body.classList.toggle("_move")

});

/*recolhendo menu cliicando no content*/

content.addEventListener('click', function(){
    body.classList.remove('_move');
});

/* Menu Ativo - inserindo a class active */

let linkNavs = document.querySelectorAll(".link-nav");

linkNavs.forEach(function(currentValue, index, array){

    currentValue.addEventListener('click', function(){

        linkNavs.forEach((elemento)=>{
            elemento.classList.remove('active')
        })

        currentValue.classList.toggle('active');


    })

})



