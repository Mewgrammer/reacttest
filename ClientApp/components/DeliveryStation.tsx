import * as React from "react";
import { Product } from "../models/Product";
import Products from "./Products";

interface IDeliveryStationState {
    selectedProduct: Product;
}

interface IDeliveryStationComponentProps {
    stationId: number;
    designation?: string;
    products: Product[];
    deliveryRequestedHandler: Function;
}

export class DeliveryStation extends React.Component<IDeliveryStationComponentProps, IDeliveryStationState> {

    constructor() {
        super();
        this.state = {
            selectedProduct : new Product()
        };
    }

    onSelectedProductChanged(product: Product) {
        console.log(`[DS-${this.props.stationId}] SelectedProductChanged`, product);
        this.setState({
            selectedProduct: product
        });
    }

    onDeliveryRequested(event: any) {
        console.log(`[DS-${this.props.stationId}] DeliveryRequested`, this.state.selectedProduct);
        if (this.state.selectedProduct.id == null) {
            this.setState({
                    selectedProduct: this.props.products[0]
                },
                this.props.deliveryRequestedHandler(this.props.products[0]));
        } else {
            this.props.deliveryRequestedHandler(this.state.selectedProduct);
        }
        event.preventDefault();
    }

    componentDidMount() {
        if (this.state == undefined || this.state.selectedProduct == undefined) {
            this.setState({
                    selectedProduct: this.props.products[0]
                }
            );
        }
    }

    render() {
        return (
            <div className="DeliveryStation">
                <h1>DeliveryStation Id:{this.props.stationId}</h1>
                <span>Behältertyp:</span><Products products={this.props.products} selectionChangedHandler={this.onSelectedProductChanged.bind(this)} />
                <button className="btn_requestdelivery" onClick={this.onDeliveryRequested.bind(this)} >Leergut anfordern</button>
            </div>
        );
    }
}

export default DeliveryStation;
