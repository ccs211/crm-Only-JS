let DB;
const form = document.querySelector('#form');

document.addEventListener('DOMContentLoaded', () => {
  form.addEventListener('submit', validates);
});


function validates(e) {
  e.preventDefault();

  // read all the inputs
  const name = document.querySelector('#name').value;
  const email = document.querySelector('#email').value;
  const phone = document.querySelector('#phone').value;
  const company = document.querySelector('#company').value;

  if (name === '' || email === '' || phone === '' || company === '') {
    alertMessage('All Fields are required', 'error');

    return;
  }

  // create an object with the info
  const client = {
    name,
    email,
    phone,
    company,
    id: Date.now()
  }
  console.log(client)
  // createNewClient(client);
  conectDB(client);
}

function conectDB(client) {
  let openConection = window.indexedDB.open('crm', 4);

  openConection.onerror = function () {
    console.log('Error')
  }

  openConection.onsuccess = (event) => {
    DB = event.target.result;
    createNewClient(client);
  };
}

function createNewClient(client) {
  const transaction = DB.transaction(['crm'], 'readwrite');
  const objectStore = transaction.objectStore('crm', { keyPath: 'id', autoIncrement: true });
  // console.log(objectStore);

  objectStore.add(client);

  transaction.oncomplete = function () {
    alertMessage('Client Added 👍');

    transaction.onerror = function () {
      alertMessage('Invalid Input 🤨', 'error')
    }

    setTimeout(() => {
      window.location.href = 'index.html';
    }, 3000);
  };
}

// (function(){
//   let DB;
//   const form = document.querySelector('#form');

//   document.addEventListener('DOMContentLoaded', () => {
//     form.addEventListener('submit', validates);
//     conectDB();

//   });

  
//   function validates(e) {
//     e.preventDefault();

//     // read all the inputs
//     const name = document.querySelector('#name').value;
//     const email = document.querySelector('#email').value;
//     const phone = document.querySelector('#phone').value;
//     const company = document.querySelector('#company').value;

//     if(name === '' || email === '' || phone === '' || company === '' ) {
//       alertMessage('All Fields are required', 'error');

//       return;
//       }

//       // create an object with the info
//       const client = {
//         name,
//         email,
//         phone,
//         company,
//         id: Date.now()
//       }
//       console.log(client)
//       createNewClient(client);

//     }

//     function createNewClient(client) {
//       const transaction = DB.transaction(['crm'], 'readwrite');
//       const objectStore = transaction.objectStore('crm');
//         // console.log(objectStore);

//       objectStore.add(client);

//       transaction.oncomplete = function() {
//         alertMessage('Client Added 👍');
        
//         transaction.onerror = function() {
//           alertMessage('Invalid Input 🤨', 'error')
//         }

//         setTimeout(() => {
//           window.location.href = 'index.html';
//         }, 3000);
//       };
//     }

  
// })();