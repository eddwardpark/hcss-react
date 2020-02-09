import React, { useState, useEffect } from "react";

//----------  useHcss ----------
function useHcss(str) {
    const _array = [];

    useEffect(() => {
        _processStr(str);
    }, []);

    const _processStr = str => {
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

//---------- useSize ----------
function useSize(str) {
    const object = {}
    const size = useHcss(str);

    function calc(size) {
        size.map((item) => {
            //console.log('item : ', item)
            if (item.pw) { object.width = `${item.pw}%` }
            if (item.w) { object.width = Number(item.w) }
            if (item.wx) { object.maxWidth = Number(item.wx) }
            if (item.wn) { object.minWidth = Number(item.wn) }
        })
    }

    useEffect(() => {
        console.log(size)
      calc(size)
    },[])

    return object;
  };

//----------  Component ----------
export default function Component(props) {
    const size = useSize(props.size)
    const [width, setWidth] = useState()

    useEffect(() => {
        console.log('useEffect : ', size.width)
        setWidth(size.width)
    }, []);

    return (
        <div
            style = {{
                //width: width,
                ...props.style,
                width: width
            }}

            {...props}
        >
            {props.children}
        </div>
    );
}

