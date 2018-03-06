import * as React from "react";
import {Product} from "../models/Product";
import { Storage } from "../models/Storage";
import Products from "./Products";
import Storages from "./Storages";

interface IPickupStationState {
    selectedProduct: Product;
    selectedDestination: Storage;
}

interface IPickupStationComponentProps {
    stationId : number;
    products: Product[];
    destinations: Storage[];
    pickupRequestedHandler : Function;
}

export class PickupStation extends React.Component<IPickupStationComponentProps, IPickupStationState> {

    constructor() {
        super();
        this.state = {
            selectedProduct: new Product(),
            selectedDestination : new Storage()
        };
    }

    onSelectedProductChanged(product: Product) {
        console.log(`[PS-${this.props.stationId}] SelectedProductChanged`, product);
        this.setState({
            selectedProduct: product
        });
    }

    onSelectedDestinationChanged(destination : Storage) {
        console.log(`[PS-${this.props.stationId}] SelectedDestinationChanged`, destination);
        this.setState({
            selectedDestination: destination
        });
    }

    onPickupRequested(event: any) {
        console.log(`[PS-${this.props.stationId}] PickupRequested`, this.state.selectedProduct);
        const data = {
            product: this.state.selectedProduct.id == null ? this.props.products[0] : this.state.selectedProduct,
            destination: this.state.selectedDestination.id == null ? this.props.destinations[0] : this.state.selectedDestination
        };
        if (this.state.selectedProduct.id == null) {
            this.setState({
                selectedProduct: data.product
            });
        } else if (this.state.selectedDestination.id == null) {
            this.setState({
                selectedDestination: data.destination
            });
        } 
        this.props.pickupRequestedHandler(data);
        event.preventDefault();
    }

    render() {
        return (
            <div className="PickupStation">
                <h1>PickupStation Id:{this.props.stationId}</h1>
                <span>Behältertyp: </span><Products products={this.props.products} selectionChangedHandler={this.onSelectedProductChanged.bind(this)} />
                <span>Ziel: </span><Storages storages={this.props.destinations} selectionChangedHandler={this.onSelectedDestinationChanged.bind(this)} />
                <button className="btn_requestpickup" onClick={this.onPickupRequested.bind(this)} >Abtransport Vollgut anfordern</button>
            </div>
        );
    }
}

export default PickupStation;
