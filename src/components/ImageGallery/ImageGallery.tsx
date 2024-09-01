import { FC } from "react";
import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";
import { Gallery } from "../../types";

interface ImageGalleryProps {
    images: Gallery[];
    openModal: (url: string, alt: string) => void;
}

const ImageGallery: FC<ImageGalleryProps> = ({ images, openModal }) => {
    return (
        <ul className={css.imagesList}>
            {images.map((image) => (
                <li key={image.id} className={css.imagesItem}>
                    <ImageCard item={image} openModal={openModal} />
                </li>
            ))}
        </ul>
    )
};

export default ImageGallery;