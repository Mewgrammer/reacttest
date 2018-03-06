import * as React from "react";
import * as ProductType from "../models/Product";
import Product = ProductType.Product;
import * as ProductItemType from "./ProductItem";
import ProductItem = ProductItemType.ProductItem;

interface IProductsComponentProps {
    selectionChangedHandler: Function;
    products : Product[];

}

interface IProductsState {
    currentProduct? : Product;
}


class Products extends React.Component<IProductsComponentProps, IProductsState> {

    refs: {
        [key: string]: (Element);
        products : (HTMLSelectElement);
    }

    private selectedValue : string;

    constructor(){
        super();
        this.state = {
            currentProduct: new Product()
        };
    }

    onProductSelectChanged(event:any){
        const product = JSON.parse(this.refs.products.value);
        this.setState({
            currentProduct: product
        }, this.props.selectionChangedHandler(product));
        event.preventDefault();
    }

    render() {
        const productItems = this.props.products.map( product => {
            return(
                <ProductItem key={`Products-${product.id}`} product={product}/>
            );
        });
        return (
            <div className="Products">
                <select className="dd_Products" key={`ProductsSelect-${productItems.length}`} ref="products" onChange={this.onProductSelectChanged.bind(this)}>
                    {productItems}
                </select>
            </div>
        );
    }
}

export default Products;
