<script>
	import { question_data, id, count } from './../store.js';
	import Head from './header.svelte';
	let user_data = $question_data;
	let current = $id;
</script>

<Head />
<main class="container mb-5 pb-5">
	<div class="px-2  my-3  text-center">
		{#each user_data as i, j (i)}
			{#if current == j}
				<h5 class="fw-bold text-start mb-3 pb-3">{j + 1}.{JSON.parse(i.content_text).question}</h5>
				<div class="col-lg-12 pt-3 pb-3 mb-3 border border-dark ">
					{#each JSON.parse(i.content_text).answers as c, d (c)}
						{#if c.is_correct == 1}
							<label class=" d-flex mt-3 text-wrap">
								<input
									class="m-2 custom"
									checked
									type="radio"
									value={c.is_correct}
									name="option"
								/>{@html c.answer}
							</label>
						{:else}
							<label class=" d-flex  mt-3 text-wrap">
								<input
									class="m-2"
									disabled
									type="radio"
									value={c.is_correct}
									name="option"
								/>{@html c.answer}
							</label>
						{/if}
					{/each}
				</div>
				<p class="text-start pb-4">{@html JSON.parse(i.content_text).explanation}</p>
			{/if}
		{/each}
	</div>
</main>
<nav class=" fixed-bottom d-flex align-items-center justify-content-end navbar-expand-sm  justify-content-end p-2 navbar-dark bg-light border border-danger ">
		
				<a href={'/result'}>
						<button class="btn btn-danger me-3" href={'/result'}>Result</button>
				</a>
			
				<!-- svelte-ignore a11y-accesskey -->
				<button
					class="btn btn-danger  rounded me-3 "
					accesskey="p"
					on:click={() => current--}
					disabled={current == 0}
				>
					Previous
				</button>
				<p class="m-2"><b>{current + 1} out of 11</b></p>
			
				<!-- svelte-ignore a11y-accesskey -->
				<button
					class="btn btn-danger rounded me-3"
					accesskey="n"
					on:click={() => current++}
					disabled={current == 10}
				>
					Next
				</button>

			
				<!-- svelte-ignore a11y-accesskey -->
				<a href={'/'}>
					<button
						class="btn btn-danger rounded mx-2 px-3 "
						on:click={() => count.set(0)}
						accesskey="r"
					>
						Restart
					</button>
				</a>
</nav>
