<!-- 
File Name      : $question_data.svelte
Description    : Testkit using Svelte.
Author         : Arpan Jain
version        : 1.0
Created Date   : 18/04/2022
Updated By     : Arpan Jain
Updated Date   : 22/04/2022
Last Update    : 22/04.2022
-->
<script>
	import { option, count, question_data, id } from '../store';
	import Head from './header.svelte';
	let total = 11;
	let attempt_count = $count;
	let skipped = total - attempt_count;
	let correct_ans = [];
	let answer_id = [];
	let correct_count = 0;
	let incorrect_count = 0;
	let userselect_ans = [];
	let cor_ans = [];
	let score;
	let review_q;

	for (let i = 0; i < $question_data.length; i++) {
		let answer_index = 0;
		let actual_index = 0;
		if ($option[i]) {
			for (let j = 0; j < 4; j++) {
				if (JSON.parse($question_data[i].content_text).answers[j].answer == $option[i]) {
					answer_index = j;
				} // end of if
			} // end of for
		} else {
			answer_index = null; //end of j loop
		}
		for (let k = 0; k < 4; k++) {
			if (JSON.parse($question_data[i].content_text).answers[k].is_correct == 1) {
				correct_ans = [
					...correct_ans,
					JSON.parse($question_data[i].content_text).answers[k].is_correct
				];
				actual_index = k;
				answer_id = [...answer_id, JSON.parse($question_data[i].content_text).answers[k].id];
			}
		} // end of k loop

		userselect_ans[i] = answer_index; // user answer index
		cor_ans[i] = actual_index; // actual answwer index
	} //end of i loop

	for (let i = 0; i < $question_data.length; i++) {
		if (userselect_ans[i] == cor_ans[i]) {
			correct_count++;
		} else if (userselect_ans[i] != null) {
			incorrect_count++;
		}
	} // end of for loop

	// correct incorrect count
	score = Math.round((correct_count / total) * 100);
</script>

<Head />
<main class="container">
	<div class="row d-flex justify-content-center mt-1">
		<div class="col-sm-2">
			<div class="card border border-dark">
				<div class="card-body">
					<h5 class="card-title text-center pb-1">Test Score</h5>
					<p class="text-center pt-1 text-primary fw-bold lead">{score}%</p>
				</div>
			</div>
		</div>
		<div class="col-sm-2">
			<div class="card border border-dark">
				<div class="card-body">
					<h5 class="card-title text-center">Unattempted</h5>
					<p class="text-center pt-1 text-primary  fw-bold lead">{skipped}</p>
				</div>
			</div>
		</div>
		<div class="col-sm-2">
			<div class="card border border-dark">
				<div class="card-body">
					<h5 class="card-title text-center">Correct</h5>
					<p class="text-center pt-1 text-success fw-bold lead">{correct_count}</p>
				</div>
			</div>
		</div>
		<div class="col-sm-2">
			<div class="card border border-dark">
				<div class="card-body">
					<h5 class="card-title text-center">Incorrect</h5>
					<p class="text-center pt-1 text-danger fw-bold lead">{incorrect_count}</p>
				</div>
			</div>
		</div>
		<div class="col-sm-2">
			<div class="card border border-dark">
				<div class="card-body">
					<h5 class="card-title text-center">Attempted</h5>
					<b><p class="text-center pt-1 text-primary fw-bold lead">{attempt_count}</p></b>
				</div>
			</div>
		</div>
	</div>
	<div class="mt-3">
		<span class="badge bg-primary">Default Correct</span>
		<span class="badge bg-success">Correct</span>
		<span class="badge bg-danger">Incorrect</span>
	</div>
	<div class="table-responsive">
		<table class="table table-striped mt-2 mx=5 ">
			<thead>
				<tr>
					<th scope="col">No.</th>
					<th scope="col" class="text-center">Question</th>
					<th scope="col" class="text-center">Option</th>
					<th scope="col" class="text-center">Result</th>
				</tr>
			</thead>
			<tbody>
				{#each $question_data as i, j}
					<tr>
						<th class="align-middle">{j + 1}</th>
						<td class="text-start text-dark w-100 align-middle" on:click={() => ($id = j)}
							><a href={'/review'} class="text-dark text-decoration-none">{i.snippet}</a></td
						>
						<td class="align-middle">
							{#each JSON.parse(i.content_text).answers as c, d}
								<td
									><button
										class="btn me-4 {`${c.is_correct == 1 ? 'btn-primary' : ''}`}
								{`${cor_ans[j] == userselect_ans[j] && userselect_ans[j] == d ? 'btn-success' : ''}`}
								{`${cor_ans[j] != userselect_ans[j] && userselect_ans[j] == d ? 'btn-danger' : ''}`}
								">{String.fromCharCode(65 + d)}</button
									></td
								>
							{/each}
						</td>
						<td class="align-middle">
							{#if userselect_ans[j] == null}
								<div class="text-danger text-start fw-bold">UNATTEMPTED</div>
							{:else}
								<div class="text-success text-start fw-bold">ATTEMPTED</div>
							{/if}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</main>
<footer
	class="d-flex align-items-center navbar-expand-sm  justify-content-end  p-2 border-top rounded border-danger bg-light bg-gradient "
>
	<!-- svelte-ignore a11y-accesskey -->
	<a href={'/'}
		><button class="btn btn-danger me-3" accesskey="r" on:click={count.set(0)}>RETAKE</button></a
	>
</footer>
