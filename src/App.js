import React from 'react';
import LayoutComponent from './components/LayoutComponent'

function App() {

    return (
        <div style={{ width: '100%', height: 300, backgroundColor: "lightgray" }}>
            <LayoutComponent
                test='1'
                size='none'
                style={{ backgroundColor: "yellow" }}
            >
                <h1>HCSS</h1>
            </LayoutComponent>
        </div>
    );
}

export default App;
