import React, { useState, useEffect, useRef } from "react";

function Slider(props) {
    const $el = useRef(null);
    // const [min, setMin] = useState(props.min ? props.min : 0);
    // const [max, setMax] = useState(props.max ? props.max : 100);
    const [isActive, setIsActive] = useState(false);
    const [value, setValue] = useState(props.value ? props.value : 0);
    const [valuePercentage, setValuePercentage] = useState(
        props.value ? props.value : 0
    );

    const percentage = (current, max) => {
        return (current / max) * 100;
    };

    const sliderRect = () => {
        if (!$el.current) return {};
        return $el.current.getBoundingClientRect();
    };

    const handleDrag = (e, a = false) => {
        if (isActive || a) {
            const rect = $el.current.getBoundingClientRect();
            const offset = e.pageX - rect.left;
            let percentage = Math.round((offset / rect.width) * 100);
            if (percentage > 100) percentage = 100;
            if (percentage < 0) percentage = 0;
            setValuePercentage(percentage);
            setValue(offset);
        }
    };

    const handleStart = (e) => {
        setIsActive(true);
    };

    const handleEnd = (e) => {
        setIsActive(false);
    };

    useEffect(() => {
        if (props.onChange) props.onChange(valuePercentage);
    }, [value]);

    useEffect(() => {
        setValuePercentage(props.value ? props.value : 0);
    }, [props.value]);

    return (
        <div
            ref={$el}
            style={props.style}
            className={`slider${props.isFaded ? " is-faded" : ""}${
                props.transition ? " transition" : ""
            }`}
            onMouseMove={handleDrag}
            onMouseDown={(e) => {
                handleStart(e);
                handleDrag(e, true);
            }}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd}
        >
            <div className="slider-container">
                <span
                    className="slider-button"
                    style={{
                        left: `${
                            valuePercentage - percentage(7, sliderRect().width)
                        }%`,
                    }}
                ></span>
                <span
                    className={`slider-active`}
                    style={{ width: `${valuePercentage}%` }}
                ></span>
                <span className="slider-background"></span>
            </div>
        </div>
    );
}

export default Slider;
