import { Head, Html, Main, NextScript } from 'next/document'
import React from 'react'

export default function Document() {
    return (
        <Html>
            <Head>
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&display=swap"
                    rel="stylesheet"
                />
                <link href="/favicon.ico" rel="shortcut icon" />
                {/* set color of the address bar */}
                <meta content="#d82086" name="theme-color" />
                {/* set color of the address bar on Apple smatphones */}
                <meta content="#d82086" name="apple-mobile-web-app-status-bar" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
