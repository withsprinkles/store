import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./tailwind.css";
import { ShoppingApp } from "./App.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ShoppingApp />
	</StrictMode>,
);
