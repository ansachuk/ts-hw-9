import { defineConfig } from "vite";

export default defineConfig({
	base: "/ts-hw-9/",
	appType: "mpa",
	build: {
		rollupOptions: {
			input: {
				main: "./index.html",
				gallery: "./src/pages/01-color-switcher.html",
				video: "./src/pages/02-timer.html",
				feedback: "./src/pages/03-promises.html",
			},
		},
	},
});
