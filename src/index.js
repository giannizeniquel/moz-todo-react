import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Suspense } from "react"
import { Hypnosis } from "react-cssfx-loading";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <CssBaseline enableColorScheme />
    <Suspense fallback={<div className="container-loading"><Hypnosis width="50px" height="50px" duration="3s" /></div>}>
      <Container 
        maxWidth="xl"
        sx={{
          display: 'block',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '80px',
          marginBottom: '100px'
        }}
      >
        <App />
      </Container>
    </Suspense>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
