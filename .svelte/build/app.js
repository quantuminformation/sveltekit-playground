import { ssr } from '@sveltejs/kit/ssr';
import root from './generated/root.svelte';
import { set_paths } from './runtime/paths.js';
import { set_prerendering } from './runtime/env.js';
import * as user_hooks from "./hooks.js";

const template = ({ head, body }) => "<!DOCTYPE html>\n<html lang=\"en\">\n\t<head>\n\t\t<meta charset=\"utf-8\" />\n\t\t<link rel=\"icon\" href=\"/favicon.ico\" />\n\t\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n\t\t" + head + "\n\t</head>\n\t<body>\n\t\t<div id=\"svelte\">" + body + "</div>\n\t</body>\n</html>\n";

set_paths({"base":"","assets":"/."});

// allow paths to be overridden in svelte-kit start
export function init({ paths, prerendering }) {
	set_paths(paths);
	set_prerendering(prerendering);
}

const d = decodeURIComponent;
const empty = () => ({});

const components = [
	() => import("../../src/routes/index.svelte"),
	() => import("../../src/routes/load.svelte"),
	() => import("../../src/routes/test.svelte")
];



const client_component_lookup = {".svelte/build/runtime/internal/start.js":"start-ec492aa2.js","src/routes/index.svelte":"pages/index.svelte-351d55b9.js","src/routes/load.svelte":"pages/load.svelte-ddcdb335.js","src/routes/test.svelte":"pages/test.svelte-17b2ed56.js"};

const manifest = {
	assets: [{"file":"favicon.ico","size":1150,"type":"image/vnd.microsoft.icon"},{"file":"robots.txt","size":67,"type":"text/plain"}],
	layout: () => import("../../src/routes/$layout.svelte"),
	error: () => import("./components/error.svelte"),
	routes: [
		{
						type: 'page',
						pattern: /^\/$/,
						params: empty,
						parts: [{ id: "src/routes/index.svelte", load: components[0] }],
						css: ["assets/start-d4cd1237.css", "assets/pages/index.svelte-27172613.css"],
						js: ["start-ec492aa2.js", "chunks/vendor-57a96aae.js", "pages/index.svelte-351d55b9.js"]
					},
		{
						type: 'page',
						pattern: /^\/load\/?$/,
						params: empty,
						parts: [{ id: "src/routes/load.svelte", load: components[1] }],
						css: ["assets/start-d4cd1237.css"],
						js: ["start-ec492aa2.js", "chunks/vendor-57a96aae.js", "pages/load.svelte-ddcdb335.js"]
					},
		{
						type: 'page',
						pattern: /^\/test\/?$/,
						params: empty,
						parts: [{ id: "src/routes/test.svelte", load: components[2] }],
						css: ["assets/start-d4cd1237.css"],
						js: ["start-ec492aa2.js", "chunks/vendor-57a96aae.js", "pages/test.svelte-17b2ed56.js"]
					}
	]
};

const get_hooks = hooks => ({
	getContext: hooks.getContext || (() => ({})),
	getSession: hooks.getSession || (() => ({})),
	handle: hooks.handle || ((request, render) => render(request))
});

const hooks = get_hooks(user_hooks);

export function render(request, {
	paths = {"base":"","assets":"/."},
	local = false,
	dependencies,
	only_render_prerenderable_pages = false,
	get_static_file
} = {}) {
	return ssr({
		...request,
		host: request.headers["host"]
	}, {
		paths,
		local,
		template,
		manifest,
		target: "#svelte",
		entry: "/./_app/start-ec492aa2.js",
		root,
		hooks,
		dev: false,
		amp: false,
		dependencies,
		only_render_prerenderable_pages,
		app_dir: "_app",
		get_component_path: id => "/./_app/" + client_component_lookup[id],
		get_stack: error => error.stack,
		get_static_file,
		get_amp_css: dep => amp_css_lookup[dep],
		ssr: true,
		router: true,
		hydrate: true
	});
}