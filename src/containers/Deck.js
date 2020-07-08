import React, {useState} from 'react';
import {connect} from 'react-redux';
import { useSprings } from "react-spring";
import { useGesture } from "react-with-gesture";
import { setDiscarded } from '../store/vk/actions';
//import { setGone } from '../store/vk/actions';
import BusinessCardContainer from './BusinessCardContainer';
import { getDiscarded } from '../store/reducers/cardState';

const to = i => ({
	x: 0,
	y: 0,
	scale: 1,
	rot: -10 + Math.random() * 20,
	delay: i * 100
  });
  const from = i => ({ x:0, rot: 0, scale: 1.5, y: 1000 });
  
  const trans = (r, s) =>
	`perspective(1500px) rotateX(30deg) rotateY(${r /
	  10}deg) rotateZ(${r}deg) scale(${s})`;  

      
function Deck(props) {
    const [gone,setGone] = useState(new Set());

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
        //const new_gone = props.gone;
        const new_gone = gone; //delete
        new_gone.add(index);
        if (dir===1){
            console.log('Another one to the right!'); // TODO сюда засунуть логику
        }
        //props.dispatch(setGone(new_gone));
        setGone(new_gone);//delete
        setTimeout(()=>{
            const new_discarded = props.discarded;
            new_discarded.add(index);
            console.log('newdiscarded', new_discarded); //delete
            props.dispatch(setDiscarded(new_discarded));
        },600);
        }

        set(i => {
        if (index !== i) return;
        //const isGone = props.gone.has(index);
        const isGone = gone.has(index);//delete

        const x = isGone ? /*(200 + window.innerWidth)*/200 * dir : down ? xDelta : 0;

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

        //if (!down && props.gone.size === props.cards.length)
        //setTimeout(() => props.dispatch(setGone(new Set())) || set(i => to(i)), 600);
        
        if (!down && gone.size === props.cards.length)//delete
        setTimeout(() => setGone(new Set()) || /*props.dispatch(setDiscarded(new Set())) ||*/ set(i => to(i)), 600);//delete
    });

	return (
			console.log('РЕНДЕР') || springs_props.map((springs_prop, i) => {
				console.log(springs_prop)
				//if(props.gone.has(i)) return false;
				if(props.discarded.has(i)) return false; //delete
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
                        //gone={props.gone}
                        gone={gone}//delete
                        discarded={props.discarded}
					/>
				);
                })
	);
}

function mapStateToProps(state) {
    return {
        discarded: getDiscarded(state)
    };
}

export default connect(mapStateToProps)(Deck);