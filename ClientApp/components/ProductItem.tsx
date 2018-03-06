import * as React from "react";
import {Product} from "../models/Product";

interface IProductComponentProps {
    product : Product;
}

export class ProductItem extends React.Component<IProductComponentProps, {}> {
    render() {
        return (
            <option className="ProductItem" value={JSON.stringify(this.props.product)}>
                {this.props.product.name}
            </option>
        );
    }
}

export default ProductItem;
