import React from 'react';
import {connect} from 'react-redux';

import { useSprings } from "react-spring";
import { useGesture } from "react-with-gesture";
import BusinessCardContainer from './BusinessCardContainer';
import { setGone } from '../store/vk/actions';

//import '../styles/GamePanel.css';
import { Panel, PanelHeader } from '@vkontakte/vkui';

const to = i => ({
	x: 0,
	y: i * -10,
	scale: 1,
	rot: -10 + Math.random() * 20,
	delay: i * 100
  });
  const from = i => ({ rot: 0, scale: 1.5, y: -1000 });
  
  const trans = (r, s) =>
	`perspective(1500px) rotateX(30deg) rotateY(${r /
	  10}deg) rotateZ(${r}deg) scale(${s})`;  

function GamePanel(props) {
	const [springs_props, set] = useSprings(props.cards.length, i => ({
		...to(i),
		from: from(i)
	  }));
	
	  const bind = useGesture(
		({
		  args: [index],
		  down,
		  delta: [xDelta],
		  distance,
		  direction: [xDir],
		  velocity
		}) => {
		  const trigger = velocity > 0.2;
	
		  const dir = xDir < 0 ? -1 : 1;
	
		  if (!down && trigger){
			const new_gone = props.gone;
			new_gone.add(index);
			props.dispatch(setGone(new_gone));
		  }
	
		  set(i => {
			if (index !== i) return;
			const isGone = props.gone.has(index);
	
			const x = isGone ? (200 + window.innerWidth) * dir : down ? xDelta : 0;
	
			const rot = xDelta / 100 + (isGone ? dir * 10 * velocity : 0);
	
			const scale = down ? 1.1 : 1;
			return {
			  x,
			  rot,
			  scale,
			  delay: undefined,
			  config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 }
			};
		  });
	
		  if (!down && props.gone.size === props.cards.length)
			setTimeout(() => props.gone.clear() || set(i => to(i)), 600);
		}
	  );

	return (
		<Panel id={props.id} centered={true}>
			<PanelHeader>
				VK classroom
			</PanelHeader>
			{springs_props.map(({ x, y, rot, scale }, i) => (
			<BusinessCardContainer
				i={i}
				x={x}
				y={y}
				rot={rot}
				scale={scale}
				trans={trans}
				data={props.cards[i]}
				bind={bind}
			/>
			))}
		</Panel>
	);
}


function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(GamePanel);