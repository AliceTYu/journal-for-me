export function dataStringRu(date) {
	return new Intl.DateTimeFormat('ru-RU').format(date);
}