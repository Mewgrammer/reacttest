import * as React from "react";
import StorageItem from "./StorageItem";
import { Storage } from "../models/Storage";


interface IStoragesComponentProps {
    selectionChangedHandler : Function;
    storages : Storage[];
}

interface IStoragesState {
    currentStorage : Storage;
}

export class Storages extends React.Component<IStoragesComponentProps, IStoragesState> {
    refs: {
        [key: string]: (Element);
        storages : (HTMLSelectElement);
    }
    constructor(){
        super();
        this.state = {
            currentStorage: new Storage()
        };
    }

    onStorageSelectChanged(event:any){
        const storage = JSON.parse(this.refs.storages.value);
        this.setState({
            currentStorage: storage
        }, this.props.selectionChangedHandler(storage));
        event.preventDefault();
    }

    render() {
        const storageItems = this.props.storages.map(storage => {
            return(
                <StorageItem key={`Storages-${storage.id}`} storage={storage}/>
            );
        });
        console.log(this.props.storages);
        return (
            <div className="Storages">
                <select className="dd_Storages" key={`StorageSelect-${storageItems.length}`} ref="storages" onChange={this.onStorageSelectChanged.bind(this)}>
                    {storageItems}
                </select>
            </div>
        );
    }
}

export default Storages;
