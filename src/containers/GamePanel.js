import React from 'react';
import {connect} from 'react-redux';

import { useSprings } from "react-spring";
import { useGesture } from "react-with-gesture";
import BusinessCardContainer from './BusinessCardContainer';
import { setGone } from '../store/vk/actions';

import '../styles/GamePanel.css';
import { Panel, PanelHeader } from '@vkontakte/vkui';

const to = i => ({
	x: 0,
	y: 0,
	scale: 1,
	rot: -10 + Math.random() * 20,
	delay: i * 100
  });
  const from = i => ({ x: 0, rot: 0, scale: 1.5, y: -1000 });
  
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
			if (dir===1){
				console.log('Another one to the right!');
			}
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
			setTimeout(() => props.dispatch(setGone(new Set())) || set(i => to(i)), 600);
		}
	  );

	return (
		<Panel id={props.id} centered={true}>
			<PanelHeader>
				VK classroom
			</PanelHeader>
			{springs_props.map(( springs_prop, i) => {
				console.log(springs_prop);
				return(
			<BusinessCardContainer
				i={i}
				x={springs_prop.x}
				y={springs_prop.y}
				rot={springs_prop.rot}
				scale={springs_prop.scale}
				trans={trans}
				data={props.cards[i]}
				bind={bind}
				key={i}
			/>
			)})}
		</Panel>
	);
}


function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(GamePanel);