import React from 'react';
import {createRoot} from 'react-dom/client';
import App from "./App";
import axios from "axios";
const rootElement = document.getElementById("root");
createRoot(rootElement).render(<App />);
