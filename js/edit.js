(function() {
  let DB;
  let clientID;

  const nameInput = document.querySelector('#name');
  const emailInput = document.querySelector('#email');
  const phoneInput = document.querySelector('#phone');
  const companyInput = document.querySelector('#company');

  const form = document.querySelector('#form');

  document.addEventListener('DOMContentLoaded', () => {
    conectDB();

    // update the form
    form.addEventListener('submit', clientUpdate);


    // check for the url id
    const urlParams = new URLSearchParams(window.location.search);
    clientID = urlParams.get('id');

    if(clientID) {
      setTimeout(() => {
        getClient(clientID)
      }, 100);
    }
  });


  function clientUpdate(e) {
    e.preventDefault();

    if(nameInput.value === '' || emailInput.value === '' || phoneInput.value === '' || companyInput.value === '') {
      alertMessage('All Fields are required', 'error');

      return;
    }
    // update client
    const clientUpdate = {
      name: nameInput.value,
      email: emailInput.value,
      company: companyInput.value,
      phone: phoneInput.value,
      id: Number(clientID)
    };

    const transaction = DB.transaction(['crm'], 'readwrite');
    const objectStore = transaction.objectStore('crm');

    objectStore.put(clientUpdate);

    transaction.oncomplete = function() {
      alertMessage('Saved 🔐');

      setTimeout(() => {
        window.location.href = 'index.html';
      }, 3000);
    };

    transaction.onerror = function() {
      alertMessage('Theres an error. Check your input', 'error')
    }

  }

  function getClient(id) {
    const transaction = DB.transaction(['crm'], 'readwrite');
    const objectStore = transaction.objectStore('crm');

    const client = objectStore.openCursor();

    client.onsuccess = function(e) {
      const cursor = e.target.result;

      if(cursor) {
        if(cursor.value.id === Number(id)){
          fillForm(cursor.value);
        }
          cursor.continue();
      }
    }
  }

  function fillForm(clientData) {
    const { name, email, phone, company } = clientData;

    nameInput.value = name;
    emailInput.value = email;
    phoneInput.value = phone;
    companyInput.value = company;
  }

  function conectDB() {
    const openConection = window.indexedDB.open('crm', 4);

    openConection.onerror = function() {
      console.log('error')
    }

    openConection.onsuccess = function() {
      DB = openConection.result;
    }
  }


})();