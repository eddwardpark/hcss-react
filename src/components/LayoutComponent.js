import React, { useState, useEffect } from "react";

//------------------------------ Component ------------------------------

export default function Component(props) {
    // size
    const uSize = useSize(props.size || '');
    const [size, setSize] = useState()
    // color
    const uColor = useColor(props.color);
    const [color, setColor] = useState()
    // space
    const uSpace = useSpace(props.space);
    const [space, setSpace] = useState()

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
    }, []);

    return (
        <div
            {...props}
            style={Object.assign({},
                size,
                color,
                space,
                props.style
            )}
        >
            {props.children}
        </div>
    );
}





//------------------------------  useHcss ------------------------------

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
        //console.log(_array)
    };

    return _array;
};

//------------------------------ useSize ------------------------------

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

//------------------------------ useColor ------------------------------

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

//------------------------------ useSpace ------------------------------

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
        console.log('%c%s', 'color: green; background: transparent; font-size: 10px;', '[ space ]', space )
        process(space)
    },[])

    return object;
}

//------------------------------ color list ------------------------------

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