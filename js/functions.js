function conectDB() {
  let openConection = window.indexedDB.open('crm', 4);

  openConection.onerror = function() {
    console.log('Error')
  }

  openConection.onsuccess = function() {
    DB = openConection.result;
  };
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