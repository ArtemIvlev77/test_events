import React, {FC, useEffect, useState} from 'react';
import {Button, Layout, Modal, Row} from 'antd';
import EventCalendar from '../components/EventCalendar';
import EventForm from '../components/EventForm';
import {useActions} from '../hooks/useActions';
import {useTypedSelector} from '../hooks/useTypedSelector';
import eventCalendar from '../components/EventCalendar';

const Event:FC = () => {

	const [modalVisible, setModalVisible] = useState(false);
	const {fetchGuests, createEvent, fetchEvents} = useActions()
	const {guests, events} = useTypedSelector(state => state.event)
	const {user} = useTypedSelector(state => state.auth)

	useEffect(() => {
		fetchGuests()
		fetchEvents(user.username)
	}, [])
	return (
		<Layout>

			<EventCalendar events={events} />
			<Row justify='center'>
				<Button type="primary" htmlType="submit" className="login-form-button" onClick={()=> setModalVisible(!modalVisible)}>Add Event</Button>
			</Row>
			<Modal
				title='Добавить событие'
				open={modalVisible}
				onCancel={() => setModalVisible(!modalVisible)}
				onOk={() => setModalVisible(!modalVisible)}
				footer={null}
			>
				<EventForm guests={guests} submit={event => createEvent(event)} />
			</Modal>
		</Layout>
	);
};

export default Event;