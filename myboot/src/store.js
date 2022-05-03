
// File Name      : store.js
// Description    : Testkit using Svelte.
// Author         : Arpan Jain
// version        : 1.0
// Created Date   : 18/04/2022
// Updated By     : Arpan Jain
// Updated Date   : 19/04/2022
// Last Update    : 19/04.2022

import{writable} from 'svelte/store';
export let count = writable(0);
export const option=writable([]);
export const question_data=writable([])
export let id=writable(0);
export const index=writable([]);
export const dindex=writable([]);
