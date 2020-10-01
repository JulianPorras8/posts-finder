import React from 'react';
import Document, { Main, NextScript, Html, Head } from 'next/document';
// import Head from 'next/head';
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
  render() {
    return (
      <Html lang='en'>
        <Global styles={global} />
        <Head>
          <meta charSet='utf-8' key='charSet' />
          <link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet'></link>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
