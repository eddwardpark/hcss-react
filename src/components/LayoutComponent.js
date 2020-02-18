import React, { useState, useEffect } from "react";

//------------------------------  useHcss ------------------------------

function useHcss(str) {
    const _array = [];

    useEffect(() => {
        processStr(str);
    }, []);

    function processStr(str) {
        const json = str.split(" ");

        json.forEach(function(item) {
            const arr = item.replace(/\'/g, "").split(/(\d+)/).filter(Boolean)
            const key = arr[0];
            const value = arr[1];
            const obj = {};
            obj[key] = value;
            //console.log(obj);
            _array.push(obj)
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
        console.log('%c%s', 'color: green; background: transparent; font-size: 10px;', '[ size ]', size )
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
            const key = Object.keys(item)
            console.log(key)
            // width
            if (key[0] === 'bc-red') {
                console.log('xxx')
                object.backgroundColor = 'red'
            }
        })
    }

    useEffect(() => {
        console.log('%c%s', 'color: green; background: transparent; font-size: 10px;', '[ color ]', color )
        process(color)
        console.log(object)
    },[])



    return object;
}

//------------------------------ Component ------------------------------

export default function Component(props) {
    // size
    const uSize = useSize(props.size || '');
    const [size, setSize] = useState()
    // color
    const uColor = useColor(props.color);
    const [color, setColor] = useState()

    useEffect(() => {
        // size
        console.log('%c%s', 'color: blue; background: transparent; font-size: 12px;', '[ props.size ]', props.size )
        if (props.size !== 'none') { setSize(uSize) }
        if (props.size === undefined) { setSize({width: '100%', height: '100%'}) }
        // color
        console.log('%c%s', 'color: blue; background: transparent; font-size: 12px;', '[ props.color ]', props.color )
        if (props.color) { setColor(uColor) }
        console.log(color)

    }, []);

    return (
        <div
            {...props}
            style={Object.assign({},
                size,
                color,
                props.style
            )}
        >
            {props.children}
        </div>
    );
  }

