import { useDispatch, useSelector } from 'react-redux';
import Contact from '../Contact/Contact';
import css from './ContactList.module.css';
// import { selectContacts } from '../../redux/contacts/selectors';
// import { deleteContact } from '../../redux/contacts/contactsSlice';
import { selectFilteredContacts, selectNameFilter } from '../../redux/filter/selectors';
import { deleteContactThunk } from '../../redux/contactsOps';

export default function ContactList() {
  const contacts = useSelector(selectFilteredContacts);
  const dispatch = useDispatch();
  const filter = useSelector(selectNameFilter) || '';
  const filterContact = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <ul className={css.list}>
      {filterContact.map(contact => (
        <li className={css.item} key={contact.id}>
          <Contact
            name={contact.name}
            id={contact.id}
            number={contact.number}
            onDelete={() => dispatch(deleteContactThunk(contact.id))}
          />
        </li>
      ))}
    </ul>
  );
}
