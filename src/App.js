import React from 'react';
import LayoutComponent from './components/LayoutComponent'

function App() {

    return (
        <div style={{ width: '100%', height: '100vh', backgroundColor: "lightgray" }}>
            <LayoutComponent
                test='1'
                size='pw50 wx500 wn300 ph60 hx400 hn300'
                color='bc-red100'
                style={{  }}
            >
                <h1>Layout</h1>
            </LayoutComponent>
        </div>
    );
}

export default App;
