import React, { useState } from 'react';
import {connect} from 'react-redux';
import { useSprings } from "react-spring";
import { useGesture } from "react-with-gesture";
import { setIsCardsOver, setSelected } from '../store/vk/actions'
import BusinessCardContainer from './BusinessCardContainer';
import { getCards, getIsCardsOver, getSelected} from '../store/reducers/cardState';

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
    const [gone, setGone] = useState(new Set());
    const num = props.cards.length>5?
                                5:
                                props.cards.length;
    if (num===0) {
        props.dispatch(setIsCardsOver(true));
    }
	const [springs_props, set] = useSprings(num, i => ({
		...to(i),
		from: from(i)
	}));
	
    const bind = useGesture(
    ({
        args: [index],
        down,
        delta: [xDelta],
        direction: [xDir],
        velocity
    }) => {
        const trigger = velocity > 0.2;

        const dir = xDir < 0 ? -1 : 1;

        if (!down && trigger){
            const new_gone = gone;
            new_gone.add(index);
            if (dir===1 && props.cards[index].rating!==404){
                const new_selected = props.selected;
                new_selected.add(props.cards[index]);
                props.dispatch(setSelected(new_selected));
            }
            setGone(new_gone);
        }

        set(i => {
        if (index !== i) return;
        const isGone = gone.has(index);

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

        if (!down && !props.isCardsOver && (gone.size === num)){
            setGone(new Set());
            
            setTimeout(() =>
                props.dispatch(setIsCardsOver(true))
            , 600);
        }
    });

	return (
			springs_props.slice(0,5).map((springs_prop, i) => {
                    return(
                        <BusinessCardContainer
                            i={i}
                            x={springs_prop.x}
                            y={springs_prop.y}
                            rot={springs_prop.rot}
                            scale={springs_prop.scale}
                            trans={trans}
                            bind={bind}
                            cards={props.cards}
                            key={i}
                        />
                    );
                })
	);
}

function mapStateToProps(state) {
    return {
        cards:       getCards(state),
        isCardsOver: getIsCardsOver(state),
        selected:    getSelected(state)
    };
}

export default connect(mapStateToProps)(Deck);