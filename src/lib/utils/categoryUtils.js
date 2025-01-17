export function getCategoryKey(category) {
	// Map display names to object keys
	const categoryMap = {
		'TVs': 'tvs',
		'Laptops': 'laptops',
		'Mobile Phones': 'phones'
	};
	
	return categoryMap[category] || 'tvs';
}