import * as React from "react";
import {Storage} from "../models/Storage";

interface IStorageComponentProps {
    storage : Storage;
}

export class StorageItem extends React.Component<IStorageComponentProps, {}> {
    render() {
        return (
            <option className="StorageItem" value={JSON.stringify(this.props.storage)}>
                {this.props.storage.id}
            </option>
        );
    }
}

export default StorageItem;
