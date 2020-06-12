import CityNode from './CityNode'
import Srand from 'prng';

class City {
	constructor(id, void_part, min_size, max_size){
		this.id = id;
		const prng = new Srand(this.id);
		this.N = prng.rand(min_size, max_size);
		this.M = prng.rand(min_size, max_size);
		this.nodes = [];
		for(let i=0; i < this.N * this.M; ++i){
			const void_chance = prng.rand(0, 100);
			let is_road_node;
			if(void_chance < void_part * 100){
				is_road_node = false;
			}
			else{
				is_road_node = true;
			}
			this.nodes[i] = new CityNode(is_road_node);
		}
	}
};

export default City;