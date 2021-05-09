(function() {

  let DB;

  const clientList = document.querySelector('#client-list');

  document.addEventListener('DOMContentLoaded', () => {
    createDB();

    if(window.indexedDB.open('crm', 1)) {
      getClients();
    }

    clientList.addEventListener('click', deleteEntry);
  });

  function deleteEntry(e) {
    if(e.target.classList.contains('delete')) {
      const deleteID = Number(e.target.dataset.client);

      const confirmation = confirm('Are you sure you want to delele it?');

      if(confirmation) {
        const transaction = DB.transaction(['crm'], 'readwrite');
        const objectStore = transaction.objectStore('crm');

        objectStore.delete(deleteID);

        transaction.oncomplete = function() {
          console.log('eliminado...')

          e.target.parentElement.parentElement.remove();
        }

        transaction.onerror = function() {
          console.log('errror')
        }
      }
    }
  }

  // creates de DB for INdexDB
  function createDB() {
    const createDB = window.indexedDB.open('crm', 3);

    createDB.onerror = function() {
      console.log('Error')
    }

    createDB.onsuccess = function() {
      DB = createDB.result;
    };

    createDB.onupgradeneeded = function(e) {
      const db = e.target.result;

      const objectStore = db.createObjectStore('crm', { keyPath: 'id', autoIncrement: true });

      objectStore.createIndex('name', 'name', { unique: false });
      objectStore.createIndex('email', 'email', { unique: true});
      objectStore.createIndex('phone', 'phone', { unique: false });
      objectStore.createIndex('company', 'company', { unique: false });
      objectStore.createIndex('id', 'id', { unique: true });
      
      console.log('DB ready 🚀')
    }
  }


  function getClients() {
    const open = window.indexedDB.open('crm', 1);

    open.onerror = function() {
      console.log('error');
    }

    open.onsuccess = function() {
      DB = open. result;

      const objectStore = DB.transaction('crm').objectStore('crm');

      objectStore.openCursor().onsuccess = function(e) {
        const cursor = e.target.result;

        if(cursor) {
          const { name, company, email, phone, id } = cursor.value;

          
          clientList.innerHTML += ` 
              <tr>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <p class="text-sm leading-5 font-medium text-gray-700 text-lg  font-bold"> ${name} </p>
                    <p class="text-sm leading-10 text-gray-700"> ${email} </p>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
                    <p class="text-gray-700">${phone}</p>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">    
                    <p class="text-gray-600">${company}</p>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
                    <a href="edit.html?id=${id}" class="text-teal-600 hover:text-teal-900 mr-5">Edit</a>
                    <a href="#" data-client="${id}" class="text-red-600 hover:text-red-900 delete">Delete</a>
                </td>
            </tr>
  `;

          cursor.continue();
        } else {
          console.log('There no regsister')
        }


      }
    }
  }


}());