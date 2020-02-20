import React, { useState, useEffect } from "react";

// COM
export default function Component(props) {
    // STATE
    // size
    const uSize = useSize(props.size || '');
    const [size, setSize] = useState()
    // color
    const uColor = useColor(props.color || '');
    const [color, setColor] = useState()
    // space
    const uSpace = useSpace(props.space || '');
    const [space, setSpace] = useState()
    // border
    const uBorder = useBorder(props.border || '');
    const [border, setBorder] = useState()
    // font
    const uFont = useFont(props.font || '');
    const [font, setFont] = useState()
    // shadow
    const uShadow = useShadow(props.shadow || '');
    const [shadow, setShadow] = useState()
    // layout
    const uLayout = useLayout(props.layout || '');
    const [layout, setLayout] = useState()
    // position
    const uPosition = usePosition(props.position || '');
    const [position, setPosition] = useState()
    // global
    const uGlobal = useGlobal(props.global || '');
    const [global, setGlobal] = useState()

    // EFFECT
    useEffect(() => {
        // size
        //console.log('%c%s', 'color: blue; background: transparent; font-size: 12px;', '[ props.size ]', props.size )
        if (props.size !== 'none') { setSize(uSize) }
        if (props.size === undefined) { setSize({width: '100%', height: '100%'}) }
        // color
        //console.log('%c%s', 'color: blue; background: transparent; font-size: 12px;', '[ props.color ]', props.color )
        if (props.color) { setColor(uColor) }
        // space
        //console.log('%c%s', 'color: blue; background: transparent; font-size: 12px;', '[ props.space ]', props.space )
        if (props.space) { setSpace(uSpace) }
        // border
        //console.log('%c%s', 'color: blue; background: transparent; font-size: 12px;', '[ props.border ]', props.border )
        if (props.border) { setBorder(uBorder) }
        // font
        //console.log('%c%s', 'color: blue; background: transparent; font-size: 12px;', '[ props.font ]', props.font )
        if (props.font) { setFont(uFont) }
        // shadow
        //console.log('%c%s', 'color: blue; background: transparent; font-size: 12px;', '[ props.shadow ]', props.shadow )
        if (props.shadow) { setShadow(uShadow) }
        // layout
        //console.log('%c%s', 'color: blue; background: transparent; font-size: 12px;', '[ props.layout ]', props.layout )
        if (props.layout) { setLayout(uLayout) }
        // position
        //console.log('%c%s', 'color: blue; background: transparent; font-size: 12px;', '[ props.position ]', props.position )
        if (props.position) { setPosition(uPosition) }
        // global
        //console.log('%c%s', 'color: blue; background: transparent; font-size: 12px;', '[ props.global ]', props.global )
        if (props.global) { setGlobal(uGlobal) }
    }, []);
    // RENDER
    return (
        <div
            {...props}
            style={Object.assign({},
                size,
                color,
                space,
                border,
                font,
                shadow,
                layout,
                position,
                global,
                props.style
            )}
        >
            {props.children}
        </div>
    );
}





// FUNC [ useHcss ]
function useHcss(str) {
    const _array = [];

    useEffect(() => {
        processStr(str);
    }, []);

    function processStr(str) {
        const json = str.split(" ");

        json.forEach(function(item) {
            //console.log(item.search('#'))
            let check = item.search('#')
            if ( check === -1 ) {
                const arr = item.replace(/\'/g, "").split(/(\d+)/).filter(Boolean)
                const key = arr[0];
                const value = arr[1];
                const obj = {};
                obj[key] = value;
                //console.log(obj);
                _array.push(obj)
            }
            else {
                const arr = item.split('#')
                const key = arr[0];
                const value = arr[1];
                const obj = {};
                obj[key] = `#${value}`;
                //console.log(obj);
                _array.push(obj)
            }
        });
        console.log(_array)
    };

    return _array;
};

// FUNC [ useSize ]
function useSize(str) {
    const object = {}
    const size = useHcss(str);

    // func process
    function process(size) {
        size.map((item) => {
            // width
            if (item.pw) { object.width = `${item.pw}%` }
            if (item.w) { object.width = Number(item.w) }
            if (item.wx) { object.maxWidth = Number(item.wx) }
            if (item.wn) { object.minWidth = Number(item.wn) }
            // height
            if (item.ph) { object.height = `${item.ph}%` }
            if (item.h) { object.height = Number(item.h) }
            if (item.hx) { object.maxHeight = Number(item.hx) }
            if (item.hn) { object.minHeight = Number(item.hn) }
        })
    }

    useEffect(() => {
        //console.log('%c%s', 'color: green; background: transparent; font-size: 10px;', '[ size ]', size )
        process(size)
    },[])

    return object;
}

// FUNC [ useColor ]
function useColor(str) {
    const object = {}
    const color = useHcss(str);

    // func process
    function process(color) {
        color.map((item) => {
            //console.log('item :', item) // { bc-red: "300" }
            const key = Object.keys(item)
            const value = Object.values(item)
            const keyColor = key[0].split('-') // 'bc-red' => 'red'
            const searchKey = `${keyColor[1]}${value}`; // 'red' + '300' => 'red300'
            //console.log(searchKey)

            const checkType = key[0].substring(0,2)

            // background color
            if ( checkType === 'bc') {
                if (key[0] === 'bc') {
                    object.backgroundColor = item.bc
                }
                else {
                    //console.log(colorList[searchKey])
                    object.backgroundColor = colorList[searchKey]
                }
            }

            // font color
            if ( checkType === 'fc') {
                if (key[0] === 'fc') {
                    object.color = item.fc
                }
                else {
                    //console.log(colorList[searchKey])
                    object.color = colorList[searchKey]
                }
            }

            // border color
            if ( checkType === 'bd') {
                if (key[0] === 'bdc') {
                    object.color = item.bdc
                }
                else {
                    //console.log(colorList[searchKey])
                    object.borderColor = colorList[searchKey]
                }
            }
        })
    }

    useEffect(() => {
        //console.log('%c%s', 'color: green; background: transparent; font-size: 10px;', '[ color ]', color )
        process(color)
    },[])



    return object;
}

// FUNC [ useSpace ]
function useSpace(str) {
    const object = {}
    const space = useHcss(str);

    // func process
    function process(space) {
        space.map((item) => {
            // margin
            if (item.ma) { object.margin = Number(item.ma) }
            if (item.mx) { object.marginLeft = Number(item.mx); object.marginRight = Number(item.mx)}
            if (item.my) { object.marginTop = Number(item.my); object.marginBottom = Number(item.my)}
            if (item.ml) { object.marginLeft = Number(item.ml) }
            if (item.mr) { object.marginRight = Number(item.mr) }
            if (item.mt) { object.marginTop = Number(item.mt) }
            if (item.mb) { object.marginBottom = Number(item.mb) }
            // padding
            if (item.pa) { object.padding = Number(item.pa) }
            if (item.px) { object.paddingLeft = Number(item.px); object.paddingRight = Number(item.px)}
            if (item.py) { object.paddingTop = Number(item.py); object.paddingBottom = Number(item.py)}
            if (item.pl) { object.paddingLeft = Number(item.pl) }
            if (item.pr) { object.paddingRight = Number(item.pr) }
            if (item.pt) { object.paddingTop = Number(item.pt) }
            if (item.pb) { object.paddingBottom = Number(item.pb) }
        })
    }

    useEffect(() => {
        //console.log('%c%s', 'color: green; background: transparent; font-size: 10px;', '[ space ]', space )
        process(space)
    },[])

    return object;
}

// FUNC [ useBorder ]
function useBorder(str) {
    const object = {}
    const border = useHcss(str);

    // func process
    function process(border) {
        border.map((item) => {
            const key = Object.keys(item)
            const value = Object.values(item)
            // border radius
            if (key[0] === 'bd-ra') { object.borderRadius = Number(value) }
            if (key[0] === 'bd-rtl') { object.borderTopLeftRadius = Number(value) }
            if (key[0] === 'bd-rtr') { object.borderTopRightRadius = Number(value) }
            if (key[0] === 'bd-rbl') { object.borderBottomLeftRadius = Number(value) }
            if (key[0] === 'bd-rbr') { object.borderBottomRightRadius = Number(value) }
            // border solid
            if (key[0] === 'bd-s') { object.border = `${Number(value)}px solid` }
            if (key[0] === 'bd-sl') { object.borderLeftWidth = Number(value); object.borderLeftStyle = 'solid' }
            if (key[0] === 'bd-sr') { object.borderRightWidth = Number(value); object.borderRightStyle = 'solid' }
            if (key[0] === 'bd-st') { object.borderTopWidth = Number(value); object.borderTopStyle = 'solid' }
            if (key[0] === 'bd-sb') { object.borderBottomWidth = Number(value); object.borderBottomStyle = 'solid' }
        })
    }

    useEffect(() => {
        //console.log('%c%s', 'color: green; background: transparent; font-size: 10px;', '[ border ]', border )
        process(border)
    },[])

    return object;
}

// FUNC [ useFont ]
function useFont(str) {
    const object = {}
    const font = useHcss(str);

    // func process
    function process(font) {
        font.map((item) => {
            const key = Object.keys(item)
            const value = Object.values(item)
            // font
            if (key[0] === 'fw') { object.fontWeight = Number(value) }
            if (key[0] === 'fs') { object.fontSize = Number(value) }
            if (key[0] === 'fa-left') { object.textAlign = 'left' }
            if (key[0] === 'fa-right') { object.textAlign = 'right' }
            if (key[0] === 'fa-center') { object.textAlign = 'center' }
            if (key[0] === 'fa-justify') { object.textAlign = 'justify' }
        })
    }

    useEffect(() => {
        //console.log('%c%s', 'color: green; background: transparent; font-size: 10px;', '[ font ]', font )
        process(font)
    },[])

    return object;
}

// FUNC [ useShadow ]
function useShadow(str) {
    const object = {}
    const shadow = useHcss(str);

    // func process
    function process(shadow) {
        shadow.map((item) => {
            const key = Object.keys(item)
            const value = Object.values(item)
            // shadow
            if (key[0] === 'shadow-s') { object.boxShadow = `0px 0px 5px rgba(0, 0, 0, ${0.1 * Number(value)}` }
            if (key[0] === 'shadow-m') { object.boxShadow = `0px 0px 10px rgba(0, 0, 0, ${0.1 * Number(value)}` }
            if (key[0] === 'shadow-l') { object.boxShadow = `0px 0px 15px rgba(0, 0, 0, ${0.1 * Number(value)}` }
        })
    }

    useEffect(() => {
        //console.log('%c%s', 'color: green; background: transparent; font-size: 10px;', '[ shadow ]', shadow )
        process(shadow)
    },[])
    return object;
}

// FUNC [ useLayout ]
function useLayout(str) {
    const object = {}
    const layout = useHcss(str);

    // func process
    function process(layout) {
        layout.map((item) => {
            const key = Object.keys(item)
            const value = Object.values(item)
            // layout
            if (key[0] === 'fxh') { object.display = 'flex'; object.flexDirection = 'row'; object.justifyContent = 'center'; object.alignItems = 'center'; }
            if (key[0] === 'fxv') { object.display = 'flex'; object.flexDirection = 'column'; object.justifyContent = 'center'; object.alignItems = 'center'; }
            if (key[0] === 'x-hor') { object.display = 'flex'; object.flexDirection = 'row'; }
            if (key[0] === 'x-ver') { object.display = 'flex'; object.flexDirection = 'column'; }
            if (key[0] === 'x-as') { object.alignItems = 'flex-start' }
            if (key[0] === 'x-ac') { object.alignItems = 'center' }
            if (key[0] === 'x-ae') { object.alignItems = 'flex-end' }
            if (key[0] === 'x-ab') { object.alignItems = 'baseline' }
            if (key[0] === 'x-at') { object.alignItems = 'stretch' }
            if (key[0] === 'x-js') { object.justifyContent = 'flex-start' }
            if (key[0] === 'x-jc') { object.justifyContent = 'center' }
            if (key[0] === 'x-je') { object.justifyContent = 'flex-end' }
            if (key[0] === 'x-jb') { object.justifyContent = 'space-between' }
            if (key[0] === 'x-jt') { object.justifyContent = 'space-around' }
            if (key[0] === 'x-grow') { object.flexGrow = Number(value) }
            if (key[0] === 'x-order') { object.order = Number(value) }
            if (key[0] === 'x-shrink-need') { object.flex = '0 auto' }
            if (key[0] === 'x-shrink-possible') { object.flex = '1' }
            if (key[0] === 'x-shrink-not') { object.flex = '0 0 auto' }
            if (key[0] === 'x-scroll') { object.flex = '0 0 auto' }
            if (key[0] === 'x-scroll') { object.flex = '0 0 auto' }
            if (key[0] === 'x-wrap') { object.flexWrap = 'wrap' }
            if (key[0] === 'x-nowrap') { object.flexWrap = 'nowrap' }
            if (key[0] === 'x-wrap-reverse') { object.flexWrap = 'wrap-reverse' }
            if (key[0] === 'x-wrap-start') { object.alignContent = 'flex-start' }
            if (key[0] === 'x-wrap-center') { object.alignContent = 'flex-center' }
            if (key[0] === 'x-wrap-end') { object.alignContent = 'flex-end' }
            if (key[0] === 'x-wrap-stretch') { object.alignContent = 'flex-stretch' }
            if (key[0] === 'x-wrap-between') { object.alignContent = 'flex-between' }
            if (key[0] === 'x-wrap-around') { object.alignContent = 'flex-around' }
        })
    }
    //
    useEffect(() => {
        //console.log('%c%s', 'color: green; background: transparent; font-size: 10px;', '[ layout ]', layout )
        process(layout)
    },[])
    return object;
}

// FUNC [ usePosition ]
function usePosition(str) {
    const object = {}
    const position = useHcss(str);

    // func process
    function process(position) {
        position.map((item) => {
            const key = Object.keys(item)
            const value = Object.values(item)
            // position
            if (key[0] === 'pos-relative') { object.position = 'relative' }
            if (key[0] === 'pos-absolute') { object.position = 'absolute' }
            if (key[0] === 'pos-fixed') { object.position = 'fixed' }
        })
    }
    //
    useEffect(() => {
        //console.log('%c%s', 'color: green; background: transparent; font-size: 10px;', '[ position ]', position )
        process(position)
    },[])
    return object;
}

// FUNC [ useGlobal ]
function useGlobal(str) {
    const object = {}
    const global = useHcss(str);

    // func process
    function process(global) {
        global.map((item) => {
            const key = Object.keys(item)
            const value = Object.values(item)
            // global
            if (key[0] === 'pos-relative') { object.global = 'relative' }
            if (key[0] === 'pos-absolute') { object.global = 'absolute' }
            if (key[0] === 'pos-fixed') { object.global = 'fixed' }
        })
    }
    //
    useEffect(() => {
        //console.log('%c%s', 'color: green; background: transparent; font-size: 10px;', '[ global ]', global )
        process(global)
    },[])
    return object;
}

// VAL [ colorList ]
const colorList = {
    red50: '#FFEBEE',
    red100: '#FFCDD2',
    red200: '#EF9A9A',
    red300: '#E57373',
    red400: '#EF5350',
    red500: '#F44336',
    red600: '#E53935',
    red700: '#D32F2F',
    red800: '#C62828',
    red900: '#B71C1C',
    pink50: '#FCE4EC',
    pink100: '#F8BBD0',
    pink200: '#F48FB1',
    pink300: '#F06292',
    pink400: '#EC407A',
    pink500: '#E91E63',
    pink600: '#D81B60',
    pink700: '#C2185B',
    pink800: '#AD1457',
    pink900: '#880E4F',
    purple50: '#F3E5F5',
    purple100: '#E1BEE7',
    purple200: '#CE93D8',
    purple300: '#BA68C8',
    purple400: '#AB47BC',
    purple500: '#9C27B0',
    purple600: '#8E24AA',
    purple700: '#7B1FA2',
    purple800: '#6A1B9A',
    purple900: '#4A148C',
    deeppurple50: '#EDE7F6',
    deeppurple100: '#D1C4E9',
    deeppurple200: '#B39DDB',
    deeppurple300: '#9575CD',
    deeppurple400: '#7E57C2',
    deeppurple500: '#673AB7',
    deeppurple600: '#5E35B1',
    deeppurple700: '#512DA8',
    deeppurple800: '#4527A0',
    deeppurple900: '#311B92',
    indigo50: '#E8EAF6',
    indigo100: '#C5CAE9',
    indigo200: '#9FA8DA',
    indigo300: '#7986CB',
    indigo400: '#5C6BC0',
    indigo500: '#3F51B5',
    indigo600: '#3949AB',
    indigo700: '#303F9F',
    indigo800: '#283593',
    indigo900: '#1A237E',
    blue50: '#E3F2FD',
    blue100: '#BBDEFB',
    blue200: '#90CAF9',
    blue300: '#64B5F6',
    blue400: '#42A5F5',
    blue500: '#2196F3',
    blue600: '#1E88E5',
    blue700: '#1976D2',
    blue800: '#1565C0',
    blue900: '#0D47A1',
    lightblue50: '#E1F5FE',
    lightblue100: '#B3E5FC',
    lightblue200: '#81D4FA',
    lightblue300: '#4FC3F7',
    lightblue400: '#29B6F6',
    lightblue500: '#03A9F4',
    lightblue600: '#039BE5',
    lightblue700: '#0288D1',
    lightblue800: '#0277BD',
    lightblue900: '#01579B',
    cyan50: '#E0F7FA',
    cyan100: '#B2EBF2',
    cyan200: '#80DEEA',
    cyan300: '#4DD0E1',
    cyan400: '#26C6DA',
    cyan500: '#00BCD4',
    cyan600: '#00ACC1',
    cyan700: '#0097A7',
    cyan800: '#00838F',
    cyan900: '#006064',
    teal50: '#E0F2F1',
    teal100: '#B2DFDB',
    teal200: '#80CBC4',
    teal300: '#4DB6AC',
    teal400: '#26A69A',
    teal500: '#009688',
    teal600: '#00897B',
    teal700: '#00796B',
    teal800: '#00695C',
    teal900: '#004D40',
    green50: '#E8F5E9',
    green100: '#C8E6C9',
    green200: '#A5D6A7',
    green300: '#81C784',
    green400: '#66BB6A',
    green500: '#4CAF50',
    green600: '#43A047',
    green700: '#388E3C',
    green800: '#2E7D32',
    green900: '#1B5E20',
    lightgreen50: '#F1F8E9',
    lightgreen100: '#DCEDC8',
    lightgreen200: '#C5E1A5',
    lightgreen300: '#AED581',
    lightgreen400: '#9CCC65',
    lightgreen500: '#8BC34A',
    lightgreen600: '#7CB342',
    lightgreen700: '#689F38',
    lightgreen800: '#558B2F',
    lightgreen900: '#33691E',
    lime50: '#F9FBE7',
    lime100: '#F0F4C3',
    lime200: '#E6EE9C',
    lime300: '#DCE775',
    lime400: '#D4E157',
    lime500: '#CDDC39',
    lime600: '#C0CA33',
    lime700: '#AFB42B',
    lime800: '#9E9D24',
    lime900: '#827717',
    yellow50: '#FFFDE7',
    yellow100: '#FFF9C4',
    yellow200: '#FFF59D',
    yellow300: '#FFF176',
    yellow400: '#FFEE58',
    yellow500: '#FFEB3B',
    yellow600: '#FDD835',
    yellow700: '#FBC02D',
    yellow800: '#F9A825',
    yellow900: '#F57F17',
    amber50: '#FFF8E1',
    amber100: '#FFECB3',
    amber200: '#FFE082',
    amber300: '#FFD54F',
    amber400: '#FFCA28',
    amber500: '#FFC107',
    amber600: '#FFB300',
    amber700: '#FFA000',
    amber800: '#FF8F00',
    amber900: '#FF6F00',
    orange50: '#FFF3E0',
    orange100: '#FFE0B2',
    orange200: '#FFCC80',
    orange300: '#FFB74D',
    orange400: '#FFA726',
    orange500: '#FF9800',
    orange600: '#FB8C00',
    orange700: '#F57C00',
    orange800: '#EF6C00',
    orange900: '#E65100',
    deeporange50: '#FBE9E7',
    deeporange100: '#FFCCBC',
    deeporange200: '#FFAB91',
    deeporange300: '#FF8A65',
    deeporange400: '#FF7043',
    deeporange500: '#FF5722',
    deeporange600: '#F4511E',
    deeporange700: '#E64A19',
    deeporange800: '#D84315',
    deeporange900: '#BF360C',
    brown50: '#EFEBE9',
    brown100: '#D7CCC8',
    brown200: '#BCAAA4',
    brown300: '#A1887F',
    brown400: '#8D6E63',
    brown500: '#795548',
    brown600: '#6D4C41',
    brown700: '#5D4037',
    brown800: '#4E342E',
    brown900: '#3E2723',
    gray50: '#FAFAFA',
    gray100: '#F5F5F5',
    gray200: '#EEEEEE',
    gray300: '#E0E0E0',
    gray400: '#BDBDBD',
    gray500: '#9E9E9E',
    gray600: '#757575',
    gray700: '#616161',
    gray800: '#424242',
    gray900: '#212121',
    bluegray50: '#ECEFF1',
    bluegray100: '#CFD8DC',
    bluegray200: '#B0BEC5',
    bluegray300: '#90A4AE',
    bluegray400: '#78909C',
    bluegray500: '#607D8B',
    bluegray600: '#546E7A',
    bluegray700: '#455A64',
    bluegray800: '#37474F',
    bluegray900: '#263238',
    black: '#000000',
    white: '#FFFFFF',
}