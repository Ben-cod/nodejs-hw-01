const crypto = require("node:crypto");

const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);

    return contacts;
  } catch (error) {
    console.error(error);
  }
}

function writeContact(contacts) {
  return fs.writeFile(
    contactsPath,
    JSON.stringify(contacts, undefined, 2)
  );
}
/////GET////
async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find(
    (contact) => contact.id === contactId
  );
  return contact;
}

///ADD///
async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: crypto.randomUUID(),
    name,
    email,
    phone,
  };

  contacts.push(newContact);

  await writeContact(contacts);

  console.log(contacts);

  return newContact;
}
////REMOVE/////

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex(
    (contact) => contact.id === contactId
  );
  if (index === -1) {
    return null;
  }

  contacts.splice(index, 1); // Видаляємо контакт за індексом
  await writeContact(contacts); // Записуємо оновлений масив контактів
  return contacts; // Повертаємо оновлений масив
}

module.exports = {
  listContacts,
  addContact,
  removeContact,
  getContactById,
};

// node index.js --action="list"

// node index.js --action="get" --id 05olLMgyVQdWRwgKfg5J6

// node index.js --action="add" --name Mango --email mango@gmail.com --phone 322-22-22

// node index.js --action="remove" --id qdggE76Jtbfd9eWJHrssH
