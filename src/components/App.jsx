import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SearchBar, ImageGallery } from 'components';
import { fetchImages } from 'helpers';

const IMAGES_PER_PAGE = 12;

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState('idle');
  const [isLoadBtnShown, setIsLoadBtnShown] = useState(true);

  useEffect(() => {
    if (query) {
      setStatus('pending');

      fetchImages(query, page).then((res) => {
        if (!res.hits.length) {
          setStatus('idle');
          toast.error('Oops, seems like there is nothing found... Try another search, please!');
          setImages([]);
          return;
        }
        const canLoadMoreImages = res.totalHits > IMAGES_PER_PAGE && ((res.totalHits / page) > IMAGES_PER_PAGE);
        setStatus('resolved');
        setImages(prevState => (page === 1 ? res.hits : [...prevState, ...res.hits]));
        setIsLoadBtnShown(canLoadMoreImages);
      }).catch(() => setStatus('rejected'));
    }
  }, [page, query]);

  const handleFormSubmit = newQuery => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <div className="app">
      <SearchBar onFormSubmit={handleFormSubmit} />
      <ImageGallery images={images} status={status} isLoadBtnShown={isLoadBtnShown} onLoadMore={handleLoadMore} perPage={IMAGES_PER_PAGE} />
      <ToastContainer
        position="top-right"
        theme="colored"
        autoClose={5000}
        hideProgressBar
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};
