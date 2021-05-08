(function() {
  let DB;

  const nameInput = document.querySelector('#name');
  const emailInput = document.querySelector('#email');
  const phoneInput = document.querySelector('#phone');
  const companyInput = document.querySelector('#company');

  document.addEventListener('DOMContentLoaded', () => {
    conectDB();

    // check for the url id
    const urlParams = new URLSearchParams(window.location.search);
    const clientID = urlParams.get('id');

    if(clientID) {
      setTimeout(() => {
        getClient(clientID)
      }, 100);
    }
  });

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
    const openConection = window.indexedDB.open('crm', 1);

    openConection.onerror = function() {
      console.log('error')
    }

    openConection.onsuccess = function() {
      DB = openConection.result;
    }
  }


})();