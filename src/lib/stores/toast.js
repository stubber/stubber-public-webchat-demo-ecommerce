import { writable } from 'svelte/store';

function createToastStore() {
	const { subscribe, update } = writable([]);
	
	function addToast(message, type = 'success', duration = 3000) {
		const id = Math.random().toString(36).substr(2, 9);
		update(toasts => [...toasts, { id, message, type }]);
		
		setTimeout(() => {
			removeToast(id);
		}, duration);
	}
	
	function removeToast(id) {
		update(toasts => toasts.filter(toast => toast.id !== id));
	}
	
	return {
		subscribe,
		add: addToast,
		remove: removeToast
	};
}

export const toasts = createToastStore();