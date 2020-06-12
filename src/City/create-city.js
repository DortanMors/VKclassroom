import Srand from 'prng';

export default function createCity(id, void_part = 0.2, min_size=30, max_size=50) {
	const prng = new Srand(id);
	const n = prng.rand(min_size, max_size);
	const m = prng.rand(min_size, max_size);
	let city = new City(n, m, id);
	for(let i = 0; i < City.N*City.M; ++i) {
		const void_chance = prng.rand(0, 100);
		if(void_chance < void_part * 100) {
			City.nodes[i].road_node = false; // занулить дорожный узел с шансом void_part
		}
	}
	return city;
};