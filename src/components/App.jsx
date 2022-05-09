import { useState, useEffect } from 'react';
import { getGallary } from './services/API';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Modal from './Modal';
import { Wraper } from './App.styled';
import Notiflix from 'notiflix';

export function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [gallery, setGallery] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modal, setModal] = useState(null);
  const [modalImage, setModalImage] = useState('');
  const [isButton, setIsButton] = useState(false);

  const onSearchQuery = searchQuery => {
    setSearchQuery(searchQuery);
    setGallery([]);
    setPage(1);
  };

  useEffect(() => {
    const findImages = async () => {
      if (searchQuery === '') {
        return;
      }
      try {
        setIsLoading(true);
        const images = await getGallary(searchQuery, page);
        images.totalHits === 0 &&
          Notiflix.Report.info(
            'Opppsss....',
            `Sorry '${searchQuery}' no results found... Try again with a new query.`,
            'Try again?'
          );
        images.totalHits > page * 12 && setIsButton(true);
        images.totalHits < page * 12 && setIsButton(false);
        setGallery(prevState => [...prevState, ...images.hits]);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setError(true);
        setIsLoading(false);
      }
    };
    findImages();
  }, [searchQuery, page, error]);

  const handleClick = () => {
    setPage(prevState => prevState + 1);
  };

  const onCurrentImage = data => {
    setModal(true);
    setModalImage(data);
  };

  const onModalClose = () => {
    setModal(null);
  };

  return (
    <Wraper>
      <Searchbar onSubmit={onSearchQuery} />
      {error &&
        Notiflix.Report.failure(
          `${error}`,
          'Oppp smth going wrong...., pls reload page.',
          'Reload page'
        )}
      <ImageGallery gallery={gallery} onClick={onCurrentImage} />
      {isLoading && Notiflix.Loading.dots('Loading...')}
      {!isLoading && Notiflix.Loading.remove()}
      {isButton && <Button onClick={handleClick} isSubmitting={isLoading} />}
      {modal && <Modal modalImage={modalImage} onModalClose={onModalClose} />}
    </Wraper>
  );
}
