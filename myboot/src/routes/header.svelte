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

<div class="bg-white min-vh-8vh min-vw-100 ">
	<h1 class="text-center vh-7 text-color-black border border-dark my-0">
		<img {src} alt="logo" class="float-start m-0 p-1" width="120" height="40" /> uCertify Test Kit
	</h1>
</div>
