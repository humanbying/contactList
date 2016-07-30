'use strict';

$(() => {
  let contacts = contactsFromStorage();
  let $lis = contacts.map(name => createLi(name));
  $('#list').append($lis);

  $('#list').on('dblclick', 'li', removeName);
  $('#list').on('click', 'button.edit', openEditModal);

  $('#editNameForm').submit(saveUpdate);
  $('#contactForm').submit(addName);
});



//FIRST function id #newName goes here from html-----------------------------------------
function addName(event) {
  //this prevents keypress "enter" from inputting into DOM and then
  //refreshing the page. In effect, this will keep the name in localStorage
  event.preventDefault();

  //Give "name" the value of what was entered in input form
  let name = $('#newName').val();
  let email = $('#newEmail').val();
  let phone = $('#newPhone').val();

  let contact = {
    name: name,
    email: email,
    phone: phone
  }


  //empty the "name" value with .val('') to prepare next input
  $('#newName').val('');
  $('#newEmail').val('');
  $('#newPhone').val('');

  //Take the name value from above and send it to createLi function
  let $li = createLi(contact);
  //make it so that when $li #template button is clicked it will open modal
  $('#list').append($li);
  //**IMPORTANT**
  //in order to start READ PARSE MODIFY STRINGIFY WRITE,
  //we need to add our name into localStorage with this function addToStorage
  addToStorage(contact);
}
//---------------------------------------------------------------------------------------------------------------------------


//QUESTION THIS #template attaches a button to each name
function createLi(contact) {
  let $li = $('#template').clone();//how does this clone work?
  $li.removeAttr('id'); //why???
  $li.children('.name').text(contact.name); //???
  $li.children('.email').text(contact.email); //???
  $li.children('.phone').text(contact.phone); //???

  return $li;//return $li back to addName's createLi function
}

//SECOND This function will take our name from addName----------------------------------------------------------------------------------
function addToStorage(contact) {
  // 1. Read
  // 2. Parse
  let contacts = contactsFromStorage();

  // 3. Modify
  //we now push the name into the contacts key
  contacts.push(contact);

  // 4. Stringify
  // 5. Write
  writeToStorage(contacts);
}
//---------------------------------------------------------------------------------------------------------------------------

function contactsFromStorage() {
  // read
  //creates a key in object localStorage called contacts and make variable json equal to that key
  let json = localStorage.contacts; //does the key have any values?
  let contacts;

  // parse
  try {
    //take the web string from json and parse into computer readable code make contacts equal to that
    contacts = JSON.parse(json);
  } catch(e) { //ask about this
    contacts = [];
  }

  return contacts; //give contacts back to addToStorage;
}
//----------------------------------------------------------------------------------------------------------------------------
//writeToStorage makes code readable for web again maybe?
function writeToStorage(contacts) {
  localStorage.contacts = JSON.stringify(contacts);
}

//----------------------------------------------------------------------

//this function removes "this" which refers to the li "name" from storage
function removeName() {
  //where the this is inside contacts array
  let index = $(this).index();
  removeFromStorage(index);
  $(this).remove();
}
//-------------------------------------------------------------------

function removeFromStorage(index) {
  //get the parsed contacts from contactsFromStorage
  let contacts = contactsFromStorage();
  //remove element in contacts.element
  contacts.splice(index, 1);
  //put contacts back into writeToStorage to stringigy it.
  writeToStorage(contacts);
}

//-------------------------------------------------------------------


// function saveUpdate() {
//   let index = $('#nameEditModal').data('index');
//   let newName = $('#editName').val();
//   // TODO:  Update storage with new name,
//   //        and update DOM
//
// }

function saveUpdate() {
  let index = $('#nameEditModal').data('index');
  let newName = $('#editName').val();
  let newEmail = $('#editEmail').val();
  let newPhone = $('#editPhone').val();

  let contact = {
    name: newName,
    email: newEmail,
    phone: newPhone
  }

  // TODO:  Update storage with new name,
  //        and update DOM
  addToStorage(contact);
  removeFromStorage(index);
}

//-------------------------------------------------------------------


// function openEditModal() {
//   let index = $(this).parent().index();
//   let name = $(this).siblings('span').text();
//
//   $('#editName').val(name);
//   $('#nameEditModal').data('index', index);
//   $('#nameEditModal').modal();
//   debugger;
// }

function openEditModal() {
  let index = $(this).parent().index();
  let name = $(this).siblings('span').eq(0).text();
  let email = $(this).siblings('span').eq(1).text();
  let phone = $(this).siblings('span').eq(2).text();

// console.log(index);
// console.log(name);
// console.log(this);
  $('#editName').val(name);
  $('#editEmail').val(email);
  $('#editPhone').val(phone);

  $('#nameEditModal').data('index', index);
  $('#nameEditModal').modal();

}
