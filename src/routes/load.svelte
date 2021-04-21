<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export function load({ page, fetch, session, context }) {
		debugger;
        return {
            error: new Error(`Could`)
        };
	}
</script>

<script>
	export let test;
</script>

{test}
