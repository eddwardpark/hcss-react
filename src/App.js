import React from 'react';
import HcssComponent from './component/HcssComponent'

function App() {

    return (
        <div style={{ width: '100%', height: '100vh', backgroundColor: "lightgray" }}>
            <HcssComponent
                size='pw50 wx500 wn300 ph60 hx400 hn300'
                color='bc-green300 fc-yellow500 bdc-lightblue700'
                space='ml4 mr8 mt16 mb24 pl3 pr6 pt9 pb12'
                border='bd-rtl30 bd-rtr20 bd-rbl30 bd-rbr40 bd-sl4 bd-sr8 bd-st12 bd-sb16'
                font='fw900 fs12 fa-center'
                shadow='shadow-m5'
                layout='x-hor'
                position='pos-relative'
                display='overflow-scroll'
            >
                <HcssComponent
                    layout='x-scroll'
                    style={{ width: 200, height: 40, backgroundColor: '#d1d1d1', margin: 4 }}
                >
                    Layout1
                </HcssComponent>
                <HcssComponent
                    layout='x-scroll'
                    style={{ width: 200, height: 40, backgroundColor: '#d1d1d1', margin: 4 }}
                >
                    Layout2
                </HcssComponent>
                <HcssComponent
                    layout='x-scroll'
                    style={{ width: 200, height: 40, backgroundColor: '#d1d1d1', margin: 4 }}
                >
                    Layout3
                </HcssComponent>
                <HcssComponent
                    layout='x-scroll'
                    style={{ width: 200, height: 40, backgroundColor: '#d1d1d1', margin: 4 }}
                >
                    Layout4
                </HcssComponent>
                <HcssComponent
                    layout='x-scroll'
                    style={{ width: 200, height: 40, backgroundColor: '#d1d1d1', margin: 4 }}
                >
                    Layout5
                </HcssComponent>
                <HcssComponent
                    layout='x-scroll'
                    style={{ width: 200, height: 40, backgroundColor: '#d1d1d1', margin: 4 }}
                >
                    Layout6
                </HcssComponent>
            </HcssComponent>
        </div>
    );
}

export default App;
