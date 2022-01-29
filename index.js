const handleContacts = require('./db/contacts');

const { Command } = require('commander');
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const contacts = await handleContacts.listContacts();
      console.log(contacts);
      break;

    case 'get':
      const getContact = await handleContacts.getContactById(id);
      console.log(getContact);
      break;

    case 'add':
      const newContact = await handleContacts.addContact(name, email, phone);
      console.log(newContact);
      break;

    case 'remove':
      const deleteContact = await handleContacts.removeContact(id);
      console.log(deleteContact);
      break;
    default:
      console.warn('\x1B[31m Unknown action type!');
  }
};

invokeAction(argv);
