import { defineConfig } from "tsdown";

export default defineConfig({
	entry: ["./src/index.ts"],
	dts: {
		tsgo: true,
		sourcemap: true,
	},
	format: ["esm"],
	external: ["react", "react-dom"],
});
