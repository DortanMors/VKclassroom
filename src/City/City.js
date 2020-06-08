import CityNode from './CityNode'

class City {
	constructor(n, m, id){
		this.id = id;
		this.N = n;
		this.M = m;
		this.nodes = new CityNode[n*m];
	}
};

export default City;