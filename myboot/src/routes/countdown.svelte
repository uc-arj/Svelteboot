<!-- 
File Name      : countdown.svelte
Description    : Testkit using Svelte.
Author         : Arpan Jain
version        : 1.0
Created Date   : 18/04/2022
Updated By     : Arpan Jain
Updated Date   : 22/04/2022
Last Update    : 22/04.2022
-->
<script>
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';
	const pass = createEventDispatcher();

	export let count_down = 80000;
	let count_end;
	let end_time;
	function timerOut() {
		pass('call', { end_time });
	}

	$: count = Math.round(count_down / 1000);
	$: H = Math.floor(count / 3600);
	$: M = Math.floor((count - H * 3600) / 60);
	$: S = count - H * 3600 - M * 60;
	$: if (count === 0) {
		clearInterval(count_end);
	}
	onMount(() => {
		count_end = setInterval(() => {
			if (M == 0 && S == 0 && count == 0) {
				end_time = null;
			} else {
				count -= 1;
			}
		}, 1000);
	});
</script>

{#if M === 0 && S === 0 && count == 0}
	{timerOut()}
	<span class="float-end"><b>{'0' + M}:{'0' + S}</b></span>
{:else}
	<span class="float-end"><b>{M < 10 ? '0' + M : M}:{S < 10 ? '0' + S : S}</b></span>
{/if}
