import axios from 'axios';
import { Console } from 'console';
import fs from 'fs';

function getAllRessources() {
  return new Promise((resolve, reject) => {
    fs.readFile('./data/data.json', 'utf8', (err, json) => {

      if (err) {
          console.error('Erreur lors de la lecture du fichier :', err);
          return;
      }
      
      try {

        let ressources = JSON.parse(json);

        if (!ressources) {
            throw new Error('Ressources vide');
        }

        ressources = ressources.filter(ressource => ressource.position && ressource.position.length > 0);

        resolve(ressources)
      } catch(error) {
        reject(error);
      }
    });
  })  
}

function grabPotion() {
  //ICI il faut changer le option.ressourceID c'est celui de la potion pas de l'user
  fs.readFile('./data/data.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Erreur lors de la lecture du fichier :', err);
        return;
    }

    let users = JSON.parse(data);
    console.log(options.resourceId);
    const user = users.find(user => user.id === options.resourceId);

    if (!user) {
        console.error('user non trouvé');
        return;
    }

    user.potions++ ;

    let newUser = JSON.stringify(users, null, 4);

    fs.writeFile('./data/data.json', newUser, 'utf8', (err) => {
        if (err) {
            console.error('Erreur écriture dans le fichier :', err);
            return;
        }
    });
  });
}

function villagerIntoPirate() {
  //faut vérifier ici pour l'id
  fs.readFile('./data/data.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Erreur lors de la lecture du fichier :', err);
        return;
    }

    let users = JSON.parse(data);
    console.log(options.resourceId);
    const user = users.find(user => user.id === options.resourceId);

    if (!user) {
        console.error('user non trouvé');
        return;
    }

    user.role = "PIRATE";
    user.terminated = 0; // on le transforme en pirate donc le nombre de d'utilisateurs modifé repasse a 0 ?

    let newUser = JSON.stringify(users, null, 4);

    fs.writeFile('./data/data.json', newUser, 'utf8', (err) => {
        if (err) {
            console.error('Erreur écriture dans le fichier :', err);
            return;
        }
    });
  });
}

function modifyPosition(id, position) {
  fs.readFile('./data/data.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Erreur lors de la lecture du fichier :', err);
        return;
    }

    let users = JSON.parse(data);
    const user = users.find(user => user.id === id);

    if (!user) {
        throw new Error('User non trouvé');
        return;
    }

    try {
      user.position = position; 

      let newUser = JSON.stringify(users, null, 4);
  
      fs.writeFile('./data/data.json', newUser, 'utf8', (err) => {
          if (err) {
              console.error('Erreur écriture dans le fichier :', err);
              return;
          }
      });
    } catch(error) {
      reject(error);
    }
  });
}

export async function getResources(options) {
  try {
    //faire la vérification de authentification
    const ressources = await getAllRessources();

    return {
      status: '200',
      data: ressources
    };

  } catch(error){
    return {
      status: '401',
      data: 'Utilisateur non authentifié'
    };
  }
}

export async function postResourceId(options) {
  // Implement your business logic here...
  //
  // Return all 2xx and 4xx as follows:
  //
  // return {
  //   status: 'statusCode',
  //   data: 'response'
  // }

  // If an error happens during your business logic implementation,
  // you can throw it as follows:
  //
  // throw new Error('<Error message>'); // this will result in a 500
  var data = {}, status = '204';

  switch(options.operationType) {
    case "grab potion flask":
      grabPotion();
      break
    case "terminate pirate":
      console.log("pas fait");
      break
    case "turn villager into pirate":
      villagerIntoPirate();
      break
  }

  return {
    status: status,
    data: data
  };
}
export async function putResourceIdPosition(options) {
  // Implement your business logic here...
  //
  // Return all 2xx and 4xx as follows:
  //
  // return {
  //   status: 'statusCode',
  //   data: 'response'
  // }

  // If an error happens during your business logic implementation,
  // you can throw it as follows:
  //
  // throw new Error('<Error message>'); // this will result in a 500

  axios.get(`http://192.168.75.36:8080/users/authenticate}`)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.error(error);
  });

  try {
    //faire la vérification de authentification
    modifyPosition(options.resourceId, options.latLng);

    return {
      status: '204',
      data: 'Position modifié'
    };

  } catch(error){
    return {
      status: '400',
      data: error
    };
  }
}