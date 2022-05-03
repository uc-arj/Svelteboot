<!-- 
File Name      : header.svelte
Description    : Testkit using Svelte with BootStrap.
Author         : Arpan Jain
version        : 1.0
Created Date   : 18/04/2022
Updated By     : Arpan Jain
Updated Date   : 19/04/2022
Last Update    : 19/04.2022
-->
<script>
	let src = '../src/image/ucertify.png';
</script>

<nav class="navbar navbar-expand-lg navbar-light bg-white border border-dark">
	<div class="container-fluid">
		<a class="position-absolute" href="/"><img {src} alt="logo" /></a>
		<h3 class="mx-auto">Ucertify Test PrepKit</h3> 	 	
	</div>
</nav>
