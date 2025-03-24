import React, { Component } from 'react';
import { rowData } from './appData';

const ProductContext = React.createContext();

class ProductProvider extends Component {
    state = {
        AllData: rowData
    };

    render() {
        return (
            <div>
                <ProductContext.Provider value={{ ...this.state }}>
                    {this.props.children}
                </ProductContext.Provider>
            </div>
        );
    }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };