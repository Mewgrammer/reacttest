import * as React from "react";
import * as Slider from "react-slick";
import "../css/slick.min.css";
import "../css/slick-theme.min.css";
import { Product } from "../models/Product";

interface IProductGalleryComponentProps {
    products: Product[];
    onSelectionChangedHanlder : Function;
}

interface IProductGalleryState {
    currentProduct : Product;
}

export class ProductGallery extends React.Component<IProductGalleryComponentProps, IProductGalleryState> {

    onSelectionChanged(event: any) {
        const product = JSON.parse(event.target.value);
        this.setState({
            currentProduct: product
        }, this.props.onSelectionChangedHanlder(product));
        event.preventDefault();
    }

    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
          };
        let productImages = this.props.products.map(product => {
            return <div><img key={product.id} alt={product.name} src={product.media}></img></div>
        });
        console.log(productImages);
        return (
            <div className="ProductGallery">
                    {productImages}
            </div>
        );
    }
}

export default ProductGallery;
