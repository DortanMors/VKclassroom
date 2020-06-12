import City from './City';

export default function createCity(id, void_part = 0.2, min_size=30, max_size=50) {
	let city = new City(id, void_part, min_size, max_size);
	return city;
};