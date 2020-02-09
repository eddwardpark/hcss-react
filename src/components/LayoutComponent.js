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

    // func calc
    function calc(size) {
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
        //console.log(size)
        calc(size)
    },[])

    return object;
  };

//------------------------------ Component ------------------------------

export default function Component(props) {
    // size
    const hcssSize = useSize(props.size || '');
    const [size, setSize] = useState()

    useEffect(() => {
        // size
        console.log(props.size)
        if (props.size !== 'none') { setSize(hcssSize) }
        if (props.size === undefined) { setSize({width: '100%', height: '100%'}) }

    }, []);

    return (
        <div
            {...props}
            style={Object.assign({},
                size,
                props.style
            )}
        >
            {props.children}
        </div>
    );
  }

