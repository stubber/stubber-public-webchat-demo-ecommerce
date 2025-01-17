import { navigateTo } from '$lib/utils/navigation';

export const load = () => {
	return {
		navigate: navigateTo
	};
};