window.onload = function(){
    eventPages();
    eventSwitch();
}




let eventPages = ()=>{
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

let eventSwitch = ()=>{
    let switchs = document.querySelectorAll('.switch');
    switchs.forEach((s)=>{
        

        s.addEventListener('click', (e)=>{
            
            if(e.target.classList.contains('disable')){
                e.target.classList.remove('disable')
            }else{
                e.target.classList.add('disable')
            }
        })
    })
}