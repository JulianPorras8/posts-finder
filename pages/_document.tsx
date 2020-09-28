import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { css, Global } from '@emotion/core';

const global = css`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
  }

  #__next {
  }

  section,
  article,
  div {
    display: grid;
  }

  a {
    color: inherit;
    text-decoration: none;
    cursor: inherit;
    &:active {
      color: inherit;
    }
  }
`;

export default class MyDocument extends Document {
  public render() {
    return (
      <html lang="en">
        <Global styles={global} />
        <Head>
          <meta charSet="utf-8" key="charSet" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
            key="viewport"
          />
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
