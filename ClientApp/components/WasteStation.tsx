import * as React from "react";
import { Product } from "../models/Product";
import Products from "./Products";
import { default as Slider, Settings as SlickSettings, CustomArrowProps } from "react-slick";


interface IWasteStationState {
    selectedProduct: Product;
}

interface IWasteStationComponentProps {
    stationId: number;
    products: Product[];
    wasteRequestedHandler: Function;
}

export class WasteStation extends React.Component<IWasteStationComponentProps, IWasteStationState> {

    constructor() {
        super();
        this.state = {
            selectedProduct: new Product()
        };
    }

    onSelectedProductChanged(product: Product) {
        console.log(`[WS-${this.props.stationId}] SelectedProductChanged`, product);
        this.setState({
            selectedProduct : product
        });
    }

    onWasteRequested(event: any) {
        console.log(`[WS-${this.props.stationId}] WasteRequested`, this.state.selectedProduct);
        if (this.state.selectedProduct.id == null) {
            this.setState({
                    selectedProduct: this.props.products[0]
                },
                this.props.wasteRequestedHandler(this.props.products[0]));
        } else {
            this.props.wasteRequestedHandler(this.state.selectedProduct);
        }
        event.preventDefault();
    }

    render() {
        const images = this.props.products.map(prod => {
            return <img key={`ws-img-${prod.id}`} alt={prod.name} src={prod.media}></img>
        });
        const settings: SlickSettings = {
            dots: true,
            autoplay: false,
            draggable: true,
            infinite: true,
            slidesToShow: 1,
            arrows: true,
            vertical: true,
            useCSS: true,
            swipe: true,
            touchMove : true
    };

        return (
            <div className="WasteStation">
                <Slider {...settings}>{images}</Slider>
                <h1>WasteStation Id:{this.props.stationId}</h1>
                <span>Behältertyp: </span><Products products={this.props.products} selectionChangedHandler={this.onSelectedProductChanged.bind(this)} />
                <button className="btn_requestpickup" onClick={this.onWasteRequested.bind(this)}>Schrottverarbeitung anfordern</button>
            </div>
        );
    }
}

export default WasteStation;
