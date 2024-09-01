import { getImages } from "../../images-api"
import { useEffect, useState } from "react"
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import css from "./App.module.css";
import ImageModal from "../ImageModal/ImageModal";
import { Gallery } from "../../types";

export default function App() {
    const [gallery, setGallery] = useState<Gallery[]>([]);
    const [isLoading, setIsLoading] = useState<boolean> (false);
    const [error, setError] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [showModal, setShowModal] = useState<boolean>(false);
    const [currentUrl, setCurrentUrl] = useState<string>("");
    const [currentAlt, setCurrentAlt] = useState<string>("");

    

    useEffect(():  void => {
        if (searchQuery.trim() === "") {
            return;
        }

        async function fetchImages() {
            try {
                setIsLoading(true);
                setError(false);
                const {results, total_pages} = await getImages(searchQuery, page);
                setGallery((prevState) => [...prevState, ...results]);
                setTotalPages(total_pages);
            } catch {
                setError(true);
            } finally {
                setIsLoading(false);
            }
        }

        fetchImages();
    }, [searchQuery, page]);

    const handleSearch = async (topic: string): Promise<void> => {
        setSearchQuery(topic);
        setPage(1);
        setGallery([]);
    };

    const handleLoadMore = async (): Promise<void> => {
        setPage(page + 1);
    };

    const openModal = (url: string, alt: string): void => {
        setCurrentUrl(url);
        setCurrentAlt(alt)
        setShowModal(prev => !prev);
    };

    const closeModal = ():void => {
        setShowModal(prev => !prev);
    }

    const isLastPage = page === totalPages;

    return (
            <div className={css.container}>
            <SearchBar onSearch={handleSearch} />
            {error && <ErrorMessage/>}
            {gallery.length > 0 && <ImageGallery images={gallery} openModal={openModal} />}
            {isLoading && <Loader />}
            {gallery.length > 0 && !isLoading && <LoadMoreBtn loadMore={handleLoadMore} isLastPage={isLastPage} />}
            <ImageModal
                showModal={showModal}
                closeModal={closeModal}
                currentUrl={currentUrl}
                currentAlt={currentAlt} />
            </div>
    )
} 
