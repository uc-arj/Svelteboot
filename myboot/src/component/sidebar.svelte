<!-- 
File Name      : Sidepanel.svelte
Description    : Testkit using Svelte.
Author         : Arpan Jain
version        : 1.0
Created Date   : 24/03/2022
Updated By     : Arpan Jain
Updated Date   : 11/04/2022
Last Update    : 18/04.2022
-->
<script>
	import { count } from '../store';
	import { createEventDispatcher } from 'svelte';
	
	export let user;
	export let side_open = false;
	const forward = createEventDispatcher();
</script>
<main class="d-flex justify-content-start align-items-start h-75 position-absolute start-0 " >
	<div id="mySidebar">
		<!-- svelte-ignore a11y-accesskey -->
		<div class="h-50 border border-danger">
			{#if side_open == true}
				<div >
					<p class="text-center overflow-hidden border border-danger">Attempted Question</p>
					<p class="text-center overflow-hidden border border-danger">{$count} out of 11</p>
				</div>
				{#each user as i, j}
					<p class="my-2 pb-1" >
						<li class="pe-auto overflow-hidden text-truncate overflow list-unstyled" style="cursor:pointer" on:click={() => forward('message', j)}><b>{JSON.parse(i.content_text).question}</b></li>
					</p>
				{/each}<br />
			{/if}
		</div>
	</div>
</main>
<style>
    
    .overflow{
        width:15vw;
        height:5vh;
        font-size: 2vh;
    }
    
</style>

