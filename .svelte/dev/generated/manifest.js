import * as layout from "../../../src/routes/$layout.svelte";

const components = [
	() => import("../../../src/routes/index.svelte"),
	() => import("../../../src/routes/test.svelte")
];

const d = decodeURIComponent;
const empty = () => ({});

export const routes = [
	// src/routes/index.svelte
[/^\/$/, [components[0]]],

// src/routes/test.svelte
[/^\/test\/?$/, [components[1]]]
];

export { layout };