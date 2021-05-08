(function(){
  let DB;
  const form = document.querySelector('#form')

  document.addEventListener('DOMContentLoaded', () => {
    conectDB();

    form.addEventListener('submit', validates)

  });

  

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


  
})();