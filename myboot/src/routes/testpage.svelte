<!-- 
File Name      : testpage.svelte
Description    : Testkit using Svelte with bootstrap.
Author         : Arpan Jain
version        : 1.0
Created Date   : 18/04/2022
Updated By     : Arpan Jain
Updated Date   : 22/04/2022
Last Update    : 22/04.2022
-->
<script>
	// @ts-nocheck

	import { onMount } from 'svelte';
	import Head from './header.svelte';
	import Counter from './countdown.svelte';
	import Sidebar from '../component/sidebar.svelte';
	import { count } from '../store';
	import { option } from '../store';
	import { question_data } from '../store';

	export let user_data = [];
	let sidebar = false;
	let test_end = true;
	let show_end = false;
	let timeend = false;
	let user_option = [];

	onMount(async function () {
		$option = user_option;
		let response = await fetch('../src/data/question.json');
		user_data = await response.json();
		$question_data = user_data;
	});
	let current = 0;
	function timerOut(event) {
		if (event.value == null) {
			timeend = true;
		}
	}
	function attemptCount(j) {
		if (user_option[j] == null) {
			count.update((n) => n + 1);
		}
	}
	function endTest() {
		show_end = true;
	}
	function questionList(e) {
		current = e.detail;
	}
</script>

<Head />
<main class="border-top border-2 border-danger d-flex align-items-center flex-column">
	<div class="container mb-5 pb-5 d-flex justify-content-center">
		<div class="text-justify w-75 h-50 top-0 mb-5 mt-5">
			{#each user_data as i, j (i)}
				{#if current == j}
					<h6>{JSON.parse(i.content_text).question}</h6>
					<div class=" text-justify d-flex flex-column mt-3  overflow-auto">
						{#each JSON.parse(i.content_text).answers as c, d (c)}
							<label class=" d-flex align-items-center p-1 text-wrap" style="cursor:pointer">
								<input
									class="m-2"
									style="cursor:pointer"
									type="radio"
									bind:group={user_option[j]}
									on:click={attemptCount(j)}
									value={c.answer}
									name="option"
								/>
								{@html c.answer}
							</label>
						{/each}
					</div>
				{/if}
			{/each}
		</div>
	</div>
	<Sidebar user={user_data} side_open={sidebar} on:message={questionList} />
	{#if show_end || timeend == true}
		<div
			class="position-fixed modal d-flex align-items-center justify-content-center"
			style="background-color: rgba(0, 0, 0, 0.3)"
		>
			<!-- Modal content -->
			<div class="bg-white p-4 text-center border rounded-3 h-25 w-50 top-50 start-50">
				{#if show_end == true}
					<span class="float-end lead font-weight-bold " on:click={() => (show_end = !show_end)}
						>&times;</span
					>
					<p class="lead font-weight-bold ">Do you Want to End Test</p>
					<button
						class="bg-secondary rounded px-4 mt-3 text-white border border-secondary"
						on:click={() => (show_end = !show_end)}
					>
						Cancel</button
					>
					<a href={'/result'}
						><button
							class="bg-primary rounded px-4 mt-3  text-white border border-primary "
							on:click={() => (test_end = false)}>OK</button
						></a
					>
				{:else if timeend == true}
					<p class="font14 lead font-weight-bold ">
						Timeup your test is end :Check out your Result
					</p>
					<a href={'/result'}
						><button
							class="bg-primary rounded px-4 mt-3 text-white border border-primary "
							on:click={() => (test_end = false)}>OK</button
						>
					</a>
				{/if}
			</div>
		</div>
	{/if}
	<!-- Button trigger modal -->

	<footer
		id="footer"
		class="d-flex align-items-center fixed-bottom navbar-expand-sm border-top rounded border-danger bg-light bg-gradient justify-content-end min-vw-100 flex-wrap p-2"
	>
		<Counter on:call={timerOut} />
		<!-- svelte-ignore a11y-accesskey -->
		<button
			class=" btn btn-danger text-color-white rounded mx-2 px-3 "
			accesskey="l"
			on:click={() => (sidebar = !sidebar)}>List</button
		>
		<!-- svelte-ignore a11y-accesskey -->
		<button
			class="btn btn-danger text-color-white rounded mx-2 px-3 "
			accesskey="p"
			on:click={() => current--}
			disabled={current == 0}
		>
			Previous
		</button>
		<p class="m-2"><b>{current + 1} out of 11</b></p>
		<!-- svelte-ignore a11y-accesskey -->
		<button
			class=" btn btn-danger text-color-white rounded  mx-2 px-3"
			accesskey="n"
			on:click={() => current++}
			disabled={current == 10}
		>
			Next
		</button>
		<!-- svelte-ignore a11y-accesskey -->
		<button
			class=" btn btn-danger text-color-white rounded mx-2 px-3 "
			d
			accesskey="e"
			on:click={endTest}>End Test</button
		>
	</footer>
</main>
