import Srand from 'prng';

export default function createCity(n, m, id) {
	let city = new City(n, m, id);
	let prng = new Srand(id);
	for(let i = 0; i<m; ++i) {
		for(let j = 0; j<n; ++j) {
			let dir = prng.rand(4);
			if(dir===1){
				if(j < city.N) {
					city.nodes[i*city.N+j].right = true;
					city.nodes[i*city.N+j+1].left = true;
				}
			}
			else if(dir===2){
				if(i < city.M) {
					city.nodes[i*city.N+j].bottom = true;
					city.nodes[(i+1)*city.N+j].bottom = true;
				}
			}
		}
	}
	return city;
};