"use client";

import { useEffect, useState } from "react";
import Starfield from "react-starfield";

export default function StarfieldClient() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <Starfield
            starCount={1000}
            starColor={[255, 255, 255]}
            speedFactor={0.05}
            backgroundColor="black"
        />
    );
}
