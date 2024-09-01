import css from "./ImageCard.module.css";
import { Gallery } from "../../types";
import { FC } from "react";
 
interface ImageCardProps {
    item: Gallery;
    openModal: (url: string, alt: string) => void;  
}

 const ImageCard : FC<ImageCardProps> = ({ item, openModal }) => {
    return (
        <div className={css.thumb}>
            <img
                src={item.urls.small}
                alt={item.alt_description}
                className={css.imageCard}
                onClick={() => {
                    openModal(item.urls.regular, item.alt_description)
                }} />
        </div>
    )
 }

export default ImageCard;