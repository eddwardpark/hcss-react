import React from 'react';
import LayoutComponent from './components/LayoutComponent'

function App() {

    return (
        <div style={{ width: '100%', height: '100vh', backgroundColor: "lightgray" }}>
            <LayoutComponent
                size='pw50 wx500 wn300 ph60 hx400 hn300'
                color='bc-green300 fc-yellow500 bdc-lightblue700'
                space='mx16 py24'
                style={{ border: '8px solid'}}
            >
                <h1>Layout</h1>
            </LayoutComponent>
        </div>
    );
}

export default App;
