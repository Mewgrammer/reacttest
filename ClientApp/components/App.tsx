import * as React from "react";
import { RouteComponentProps } from "react-router";
import { DeliveryStation } from "./DeliveryStation";
import { PickupStation } from "./PickupStation";
import { WasteStation } from "./WasteStation";
import { Product } from "../models/Product";
import { Storage } from "../models/Storage";
import { StorageManagement } from "./StorageManagement";
import { StorageData } from "../static/StorageData";
import { ProductData } from "../static/ProductData";

interface IAppState {
    
}

export class App extends React.Component<RouteComponentProps<{}>, IAppState> {

    private storages = new Array<Storage>();
    private products = new Array<Product>();
    //private websocket = new WebSocket("ws:/localhost:6000");

    constructor() {
        super();
        this.initData();
        this.state = {
            lanes: this.storages,
            products: this.products,
            selectedLane: this.storages[0],
            selectedProduct: this.products[0]
        };
    }

    initData() {
        const storages = new Array<Storage>();
        const products = new Array<Product>();
        StorageData.storages.forEach(storage => {
            var nst = new Storage();
            nst.id = storage.Id;
            nst.type = storage.Type;
            nst.node = storage.Node;
            storages.push(nst);
        });
        ProductData.products.forEach(product => {
            var npr = new Product();
            npr.id = product.Id;
            npr.media = product.Media;
            npr.name = product.Name;
            npr.sourceStorage = product.SourceStorage;
            products.push(npr);
        });
        this.products = products;
        this.storages = storages;
    }

    onLaneLockRequested(lane: Storage) {
        console.log(`[BST] onLaneLockRequested`, lane);

    }

    onStoreRequested(product: Product) {
        console.log(`[BST] onStoreRequested`, product);
    }

    onPickupRequested(data : any) {
        console.log(`[BST] onPickupRequested`, data);
    }

    onDeliveryRequested(data: any) {
        console.log(`[BST] onDeliveryRequested`, data);
    }

    onWasteRequested(data: any) {
        console.log(`[BST] onWasteRequested`, data);
    }

    render() {
        this.initData();
        return (
            <div className="bst">
                <DeliveryStation products={this.products} deliveryRequestedHandler={this.onDeliveryRequested.bind(this)} stationId={1}/>
                <PickupStation products={this.products} destinations={this.storages} pickupRequestedHandler={this.onPickupRequested.bind(this)} stationId={1} />
                <PickupStation products={this.products} destinations={this.storages} pickupRequestedHandler={this.onPickupRequested.bind(this)} stationId={2} />
                <WasteStation products={this.products} wasteRequestedHandler={this.onWasteRequested.bind(this)} stationId={1}/>
                <StorageManagement lockLaneRequestedHandler={this.onLaneLockRequested.bind(this)} storeProductRequestedHandler={this.onStoreRequested.bind(this)}/>
            </div>
        );
    }
}