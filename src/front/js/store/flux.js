const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      token: localStorage.getItem("token") || "",
      urlBase:
        "https://3001-orlandooroporte-gamepro-xywouziakxn.ws-us81.gitpod.io",
       
    
      user: [],
      game: [],
      verify: "123456789"
    },
    actions: {
      userRegister: async (user) => {
        console.log(user)
        let store = getStore();
        try {
          let response = await fetch(`${store.urlBase}/api/user`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          });
          if (response.ok) {
            return true;
          }
          return false;
        } catch (error) {
          console.log(`Error: ${error}`);
        }
      },
      login: async (user) =>  {
        let store = getStore()
        try {
          let response = await fetch(`${store.urlBase}/api/login`, {
            method: 'POST',
            headers: {
              'Content-Type':'application/json',
            },
            body: JSON.stringify(user)
          });
          console.log(response)
          if (response.ok){
            let data = await response.json();
            setStore({token: data.token});
            localStorage.setItem('token',data.token);
            return true;
          }
          return false;
        } catch (error) {
          console.log(`Error: ${error}`);
          
        }
  
      },
      gameRegister: async (game)=>{
        let store = getStore();
          try {
            let response = await fetch(`${store.urlBase}/api/game`, {
              method: 'POST',
              // mode: 'no-cors',
              headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer  ${store.token}`,
              },
              body: JSON.stringify(game)
            });

            console.log(response)
            if (response.ok){
              return true;

            }
            return false;
          
        } catch (error) {
          console.log(`Error: ${error}`);
          
        }
      },
      getGame: async () =>{
        let store = getStore();
        try {
          let response = await fetch(`${store.urlBase}/api/game`);
          let data = await response.json();
          if (response.ok){
            setStore({
              ...store, 
              game: data
            })
          }
          
        } catch (error) {
          console.log(`Error:${error}`);
        }
      },
      updateGame: async (game) => {
        let store = getStore()
        try {
          let response = await fetch(`${store.urlBase}/api/game/${game}`,{
            method:'PUT', 
            headers: {
              'Content-Type':'aplication/json',
            }, 
            body: JSON.stringify(game)
          });
          if (response.ok){
            return true
          }
          return false
          
        } catch (error) {
          console.log(`Error:${error}`)
        }
      },
      deleteGame: async (game)=>{
        let store = getStore()
        console.log()
        try {
          let response = await fetch(`${store.urlBase}/api/game/${game}`,{
            method: 'DELETE',
            headers:{
              "Content-Type": "application/json",
            }
          });
          if (response.ok){
            return true
          }
          return false 
          
        } catch (error) {
          console.log(`Error: ${error}`)
        }
      }
    },
  };
};

export default getState;
