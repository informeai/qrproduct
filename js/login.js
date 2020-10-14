

window.onload = function(){
    
    loginToHome();

}

let loginToHome = function(){
    let login = document.querySelector('#login');
    let load = document.querySelector('#load');
    
    let snack = document.querySelector('#snack');

    let inputName = document.querySelector('#name');
    let inputPass = document.querySelector('#pass');
    let inputSubmit = document.querySelector('#submit');


    inputSubmit.addEventListener('click', async function(e){
        let db = await readDb();
        
        
        let username = String(inputName.value).trim();
        let password = String(inputPass.value).trim();

        if(String(db).includes('Error')){
            snack.innerHTML = 'Erro no Db';
            snack.classList.remove('disable');
            timeout = setTimeout(function(){
                snack.classList.add('disable');
            },4000);

        }else if(db === undefined){
            snack.innerHTML = 'Database inexistente';
            snack.classList.remove('disable');
            timeout = setTimeout(function(){
                snack.classList.add('disable');
            },4000);
        }else if(verifyUser(db,username,password) == true){
            login.classList.add('disable');
            load.classList.remove('disable');
            setTimeout(function(){
                
                window.location.href = './pages/home.html'
            },7000);
        }else if(inputName.value == '' || inputPass.value == ''){
            snack.innerHTML = 'Preencha todos os campos';
            snack.classList.remove('disable');
            timeout = setTimeout(function(){
                snack.classList.add('disable');
            },4000);
        }else{
            snack.innerHTML = 'Usuário ou Senha Invalidos';
            snack.classList.remove('disable');
            timeout = setTimeout(function(){
                snack.classList.add('disable');
            },4000);
        }
        inputName.value = '';
        inputPass.value = '';
    });
}

let readDb = async function() {
    data = await fetch('http://localhost:5000/users')
    .then(function(resp){
        return resp.json()
    }).then(function(data){
        return data;
    }).catch(function(err){
        return err;
    }); 
    return data;  
}

let verifyUser = function(db, username, password){
    result = false;
    db.forEach(function(user){
        
        if(user.name === username && user.pass === password){
            
            result = true;
            
        }
    });

    return result;

    
}