const { app, BrowserWindow } = require('electron');


function createWindow(){
    const win = new BrowserWindow({
        width : 1000,
        height : 800,
        backgroundColor: '#fafbff',
        resizable: false,
        
        webPreferences: {
            nodeIntegration: true,
        }
    });

    // Carrega o arquivo index.html
    win.loadFile(__dirname + '/index.html');
    
    // Abre o devtools do chrome
    win.webContents.openDevTools()
    win.once('ready-to-show', () => {
        win.show()
        
        
    })

    setupExpress();

    
}

// Cria o aplicativo
app.whenReady().then(createWindow).catch(err=> console.error(err));

// Fecha o aplicativo
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })


// No macOS recria o aplicativo novamente
app.on('activate', () => {
    
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })








// Create Server Express
setupExpress = ()=>{
  const express = require('express');
  const appExpress = express();
  const bodyParser = require('body-parser');
  const {Sequelize, DataTypes, Model} = require('sequelize');
  const sequelize = new Sequelize('sqlite://db/qrproduct.db');
  
  //Server
  const PORT = 5000;

  appExpress.use(bodyParser.urlencoded({extended:false}));
  appExpress.use(bodyParser.json());

  appExpress.get('/users', async (req,res)=>{
    await User.findAll({

    }).then(users=>{
      res.send(JSON.stringify(users));
    }).catch(err=>{
      res.send(JSON.stringify({"Error":err}));
    })

  })

  appExpress.post('/users', (req,res)=>{
    res.send('new user');
  })

  appExpress.listen(PORT, ()=>{
    console.log(`Listen on port: ${PORT}`);
  })



  //Database

  class User extends Model{}
  User.init({
    name:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    pass : {
      type: DataTypes.STRING,
      allowNull: false
    },
    isAdmin:{
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    sequelize,
    modelName: 'User'
  });

  class Empresa extends Model{}
  Empresa.init({
    name:{
      type: DataTypes.TEXT,
      allowNull: false
    },
    cpfOrCnpj:{
      type: DataTypes.TEXT,
      allowNull: false
    },
    urlFoto:{
      type: DataTypes.TEXT,
      
    },
    localQrs:{
      type: DataTypes.TEXT,
    }
  },{
    sequelize,
    modelName: 'Empresa'
  });

  // Syncroniza as tabelas
  User.sync();
  Empresa.sync();

  

  getUser = async(nameUser, passUser)=>{
    existed = false;
    await User.findAll({
      where:{
        name: nameUser,
        pass: passUser,
      }
    }).then(data=>{
      data.map(u=>{
        if(u.name === nameUser && u.pass === passUser){
          existed = true;
          
        }
      })
      
    }).catch(err=>{
      console.error(err);
    })
    
    return existed;
    
  }

  createUser = async(name, pass)=>{
    let user = await User.create({name:name,pass:pass});
    
    return user.id;
  }
  
  
} 