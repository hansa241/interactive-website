'use client';
import React, {useCallback, useRef} from 'react';
import Script from 'next/script';

export default function Page() {
    const panoRef = useRef<HTMLDivElement>(null);

    const initialize = useCallback(() => {
        if (panoRef.current === null) return;

        new window.google.maps.StreetViewPanorama(panoRef.current, {
            position: {lat: 44.947541243920625, lng: -93.10809415611486},
            pov: {heading: 0, pitch: 0},
            zoom: 1,
        });
    }, []);

    return (
        <>
            <Script
                src={`https://maps.googleapis.com/maps/api/js?key=${process.env.STREETVIEW_API_KEY}`}
                strategy={"afterInteractive"}
                onLoad={initialize}
            />
            <main
                id={"pano"}
                ref={panoRef}
                className="w-full h-screen"
            ></main>
        </>
    );
}