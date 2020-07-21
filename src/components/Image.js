import React, { useState } from "react";

function Image({ src, fallback, alt, draggable }) {
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <>
            <img
                src={fallback}
                alt={alt}
                draggable={draggable}
                style={imageLoaded ? { display: "none" } : {}}
            />
            <img
                src={src}
                alt={alt}
                draggable={draggable}
                style={!imageLoaded ? { display: "none" } : {}}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageLoaded(false)}
            />
        </>
    );
}

export default Image;
