import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import FixedLayout from '@vkontakte/vkui/dist/components/FixedLayout/FixedLayout';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Div from '@vkontakte/vkui/dist/components/Div/Div';

import './Intro.css';

const Intro = ({id, snackbarError, fetchedUser, go, userSawIntro}) => {
	return(
		<Panel id={id} centered={true}>
			<PanelHeader>
				VK classroom
			</PanelHeader>
			{(!userSawIntro && fetchedUser) &&
				<Fragment>
					<Group>
						<Div className='userinfo'>
							{fetchedUser.photo_200 && <Avatar src={fetchedUser.photo_200} />}
							<h2>Здравствуйте, {fetchedUser.first_name}!</h2>
							<h3>Сервис находится в активной разработке, и, надеемся, в будущем поможет в организации дистанционного обучения!</h3>
						</Div>
					</Group>
					<FixedLayout vertical='bottom'>
						<Div>
							<Button mode='commerce' size='xl' onClick={go}>
								Продолжить
							</Button> 
						</Div>
					</FixedLayout>
				</Fragment>
			}
			{snackbarError}
		</Panel>
	);
};

Intro.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	snackbarError: PropTypes.any, // TODO поставить нормальный тип
	fetchedUser: PropTypes.shape({
		photo_200: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
		city: PropTypes.shape({
			title: PropTypes.string,
		})
	})
};

export default Intro;