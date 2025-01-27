import './globals.css';
import type {Metadata} from 'next';
import React, {JSX} from "react";

export const metadata: Metadata = {
    title: 'The Garden Path'
}

export default function RootLayout({ children, }:
{ children: React.ReactNode }): JSX.Element {
    return (
        <html lang="en">
        <body>{children}</body>
        </html>
    )
}