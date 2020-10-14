window.onload = function(){
    let iconHome = document.querySelector('#icon-home');
    let iconProduct = document.querySelector('#icon-product');
    let iconConfig = document.querySelector('#icon-config');


    iconHome.addEventListener('click',function(e){
        window.location.href = './home.html';
        
    });

    iconProduct.addEventListener('click',function(e){
        window.location.href = './products.html';
    });

    iconConfig.addEventListener('click',function(e){
        window.location.href = './config.html';
    });
}