import React from 'react';
import LayoutComponent from './components/LayoutComponent'

function App() {

    return (
        <div style={{ width: '100%', height: '100vh', backgroundColor: "lightgray" }}>
            <LayoutComponent
                size='pw50 wx500 wn300 ph60 hx400 hn300'
                color='bc-green300 fc-yellow500 bdc-lightblue700'
                space='ml4 mr8 mt16 mb24 pl3 pr6 pt9 pb12'
                border='bd-rtl30 bd-rtr20 bd-rbl30 bd-rbr40 bd-sl4 bd-sr8 bd-st12 bd-sb16'
                font='fw900 fs12 fa-center'
                shadow='shadow-m5'
                layout='x-hor x-wrap x-wrap-between'
                position='pos-relative'
            >
                <LayoutComponent

                    style={{ width: 200, height: 40, backgroundColor: '#d1d1d1', margin: 4 }}
                >
                    Layout1
                </LayoutComponent>
                <LayoutComponent
                    position='pos-absolute'
                    style={{ width: 200, height: 40, backgroundColor: '#d1d1d1', margin: 4 }}
                >
                    Layout2
                </LayoutComponent>
                <LayoutComponent

                    style={{ width: 200, height: 40, backgroundColor: '#d1d1d1', margin: 4 }}
                >
                    Layout3
                </LayoutComponent>
                <LayoutComponent

                    style={{ width: 200, height: 40, backgroundColor: '#d1d1d1', margin: 4 }}
                >
                    Layout4
                </LayoutComponent>
                <LayoutComponent

                    style={{ width: 200, height: 40, backgroundColor: '#d1d1d1', margin: 4 }}
                >
                    Layout5
                </LayoutComponent>
                <LayoutComponent

                    style={{ width: 200, height: 40, backgroundColor: '#d1d1d1', margin: 4 }}
                >
                    Layout6
                </LayoutComponent>
            </LayoutComponent>
        </div>
    );
}

export default App;
