const { Command } = require("commander");
const program = new Command();
const {
  getContactById,
  listContacts,
  addContact,
  removeContact,
} = require("./contacts.js");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);
const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      return console.table(contacts);

    case "get":
      const contact = await getContactById(id);
      return console.table(contact);

    case "add":
      const contactAdd = await addContact(name, email, phone);
      return console.table(contactAdd);

    case "remove":
      const contactRemove = await removeContact(id);
      return console.table(contactRemove);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}
invokeAction(argv);
