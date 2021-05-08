(function(){
  let DB;
  const form = document.querySelector('#form')

  document.addEventListener('DOMContentLoaded', () => {
    conectDB();

    form.addEventListener('submit', validates)

  });

  function conectDB() {
    const openConection = window.indexedDB.open('crm', 1);

    openConection.onerror = function() {
      console.log('error')
    }

    openConection.onsuccess = function() {
      DB = openConection.result;
    }
  }

  function validates(e) {
    e.preventDefault();

    // read all the inputs
    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const phone = document.querySelector('#phone').value;
    const company = document.querySelector('#company').value;

    if(name === '' || email === '' || phone === '' || company === '' ) {
      alertMessage('All Fields are required', 'error');

      return;
      }

      // create an object with the info
      const cliente = {
        name,
        email,
        phone,
        company,
        id: Date.now()
      }
      createNewClient(cliente)

    }

    function createNewClient(client) {
      const transaction = DB.transaction(['crm'], 'readwrite');

      const objectStore = transaction.objectStore('crm');

      objectStore.add(client);

      transaction.onerror = function() {
        alertMessage('Invalid Input 🤨', 'error')
      }

      transaction.oncomplete = function() {
        alertMessage('Client Added 👍');

        setTimeout(() => {
          window.location.href = 'index.html'
        }, 3000)
      }

    }

    function alertMessage(msg, type){

      const alert = document.querySelector('.alert');

      if(!alert) {
          // create the alert
          const divAlert = document.createElement('div');
          divAlert.classList.add('px-4', 'py-3', 'rounded', 'max-w-lg', 'mx-auto', 'mt-6', 'text-center', 'border', 'alert');
    
          if(type === 'error') {
            divAlert.classList.add('bg-red-100', 'border-red-400', 'text-red-700');
          } else {
            divAlert.classList.add('bg-green-100', 'border-green-400', 'text-green-700');
          }
          
          divAlert.textContent = msg;
          
          form.appendChild(divAlert);
    
          setTimeout(() => {
            divAlert.remove();
          }, 3000);
        }

      }
  
})();