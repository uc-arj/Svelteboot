<!-- 
File Name      : review.svelte
Description    : Testkit using Svelte.
Author         : Arpan Jain
version        : 1.0
Created Date   : 18/04/2022
Updated By     : Arpan Jain
Updated Date   : 03/05/2022
Last Update    : 03/05/2022
-->
<script>
	import { question_data, id, count, option, index, dindex } from './../store.js';
	import Head from './header.svelte';
	let user_data = $question_data;
	let current = $id;
	let user_index = $index;
	let default_index = $dindex;
</script>

<link
	rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
	integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g=="
	crossorigin="anonymous"
	referrerpolicy="no-referrer"
/>
<Head />
<main class="container mb-5 pb-5">
	<div class="px-2  my-3  text-center">
		{#each user_data as i, j (i)}
			{#if current == j}
				<h5 class="fw-bold text-start mb-3 pb-3">{j + 1}.{JSON.parse(i.content_text).question}</h5>
				<div class="col-lg-12 pt-3 pb-3 mb-3 border border-dark ">
					{#if user_index[j] == null}
						<button class="alert rounded alert-warning">Unattempted</button>
					{:else if default_index[j] == user_index[j]}
						<button class="alert alert-success">Correct</button>
					{:else}
						<button class="alert alert-danger">Incorrect</button>
					{/if}
					<!-- For Answer Status -->
					{#each JSON.parse(i.content_text).answers as c, d (c)}
						<label
							class=" d-flex mt-3 text-wrap 
							{`${c.is_correct == 1 ? 'text-primary fw-bold' : ''}`}
							{`${default_index[j] == user_index[j] && user_index[j] == d ? 'text-success fw-bold' : ''}`}
							
								{`${default_index[j] != user_index[j] && user_index[j] == d ? 'text-danger fw-bold' : ''}`}"
						>
							<input
								class="m-2 custom "
								checked={c.is_correct == 1}
								disabled
								type="radio"
								value={c.is_correct}
							/>
							{@html c.answer}
							<span
								class="ms-3 mt-1  {`${
									c.is_correct == 1 ? 'text-primary fw-bold fa-solid fa-check' : ''
								}`}
											{`${
									default_index[j] == user_index[j] && user_index[j] == d
										? 'text-success fw-bold fa-solid fa-check '
										: ''
								}`}
												{`${
									default_index[j] != user_index[j] && user_index[j] == d
										? 'text-danger fw-bold fa-solid fa-xmark'
										: ''
								}`}"
							/>
							<!-- Answer Status file -->
						</label>
					{/each}
				</div>
				<p class="text-start pb-4">{@html JSON.parse(i.content_text).explanation}</p>
			{/if}
		{/each}
	</div>
</main>
<nav
	class=" fixed-bottom d-flex align-items-center justify-content-end navbar-expand-sm  justify-content-end p-2 navbar-dark bg-light border border-danger "
>
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
		<button class="btn btn-danger rounded mx-2 px-3 " on:click={() => count.set(0)} accesskey="r">
			Restart
		</button>
	</a>
</nav>
