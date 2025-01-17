import { goto } from '$app/navigation';

export function navigateTo(page) {
	const categoryMap = {
		'tvs': 'TVs',
		'laptops': 'Laptops',
		'phones': 'Mobile Phones'
	};
	
	const category = categoryMap[page.toLowerCase()] || 'TVs';
	return goto(`/?category=${category}`, { replaceState: true });
}