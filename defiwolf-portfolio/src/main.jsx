// Entry point: mounts <App /> and keeps the tab title tied to content.js.
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { content } from "./data/content.js";

document.title = content.meta.title;
createRoot(document.getElementById("root")).render(<App />);
