import * as React from "react";
import Storages from "./Storages";
import Products from "./Products";
import { Product } from "../models/Product";
import { Storage } from "../models/Storage";
import { StorageData } from "../static/StorageData";
import { ProductData } from "../static/ProductData";


interface IStorageManagementState {
    lanes: Storage[];
    products: Product[];
    selectedLane: Storage;
    selectedProduct : Product;
}

interface IStorageManagementComponentProps {
    lockLaneRequestedHandler : Function;
    storeProductRequestedHandler: Function;
}

export class StorageManagement extends React.Component<IStorageManagementComponentProps, IStorageManagementState> {

    private storages = new Array<Storage>();
    private products = new Array<Product>();

    constructor() {
        super();
        this.initData();
        this.state = {
            lanes: this.storages,
            products : this.products,
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

    setAvailableProducts() {
        if (this.state.selectedLane) {
            this.initData();
            
            this.setState({
                products: this.getAvailableProducts(),
            });
        }
    }

    getAvailableProducts() {
        return this.products.filter(product => {
            return product.sourceStorage === this.state.selectedLane.type;
        });
    }


    onLockRequest(event: any) {
        console.log("[SM] LockRequested", event);
        this.props.lockLaneRequestedHandler(this.state.selectedLane);      
        event.preventDefault();
    }

    onStoreRequest(event: any) {
        console.log("[SM] StoreRequested", event);
        this.props.storeProductRequestedHandler(this.state.selectedProduct);
        event.preventDefault();
    }

    onLaneChanged(lane: Storage) {
        this.setAvailableProducts();
        this.setState({
            selectedLane: lane
        });
    }

    onProductChanged(product: Product) {
        console.log("[SM] SelectedProductChanged", product);
        this.setState({
            selectedProduct: product
        });
    }

    render() {
        this.initData();
        return (
            <div className="StorageManagement">
                <h1>Storage Management</h1>
                <form onSubmit={this.onLockRequest.bind(this)}>
                    <label>Gasse</label><Storages selectionChangedHandler={this.onLaneChanged.bind(this)} storages={this.state.lanes}/>
                    <input type="submit" value="Gasse sperren"/>
                </form>
                <form onSubmit={this.onStoreRequest.bind(this)}>
                    <label>Produkt</label><Products selectionChangedHandler={this.onProductChanged.bind(this)} products={this.getAvailableProducts()}/>
                    <input type="submit" value="Produklt einlagern und Gasse Entsperren"/>
                </form>
            </div>
        );
    }
}

export default StorageManagement;
