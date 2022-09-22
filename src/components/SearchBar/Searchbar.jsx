import PropTypes from 'prop-types';
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { IconButton } from 'components';
import s from './Searchbar.module.css';

export const SearchBar = ({ onFormSubmit }) => {
  const [query, setQuery] = useState('');

  const handleInput = e => {
    setQuery(e.currentTarget.value.toLowerCase());
  };

  const handleFormSubmit = e => {
    e.preventDefault();

    if (!query.trim()) {
      toast.warning('Enter your query please!');
      return;
    }

    onFormSubmit(query);
    setQuery('');
  };

  return (
    <header className={s.searchbar}>
      <form className={s.form} onSubmit={handleFormSubmit}>
        <IconButton type="submit" />
        <input
          className={s.input}
          type="text"
          autoComplete="off"
          onChange={handleInput}
          autoFocus
          value={query}
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

SearchBar.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};
