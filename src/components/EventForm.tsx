import React, {FC, useState} from 'react';
import {Button, DatePicker, DatePickerProps, Form, Input, Row, Select, Space} from 'antd';
import {rules} from '../utils/rules';
import {IUser} from '../models/IUser';
import {IEvent} from '../models/IEvent';
import {Moment} from 'moment';
import {formatDate} from '../utils/date';
import {useTypedSelector} from '../hooks/useTypedSelector';
import {Simulate} from 'react-dom/test-utils';

interface EventFormProps {
	guests: IUser[],
	submit: (event: IEvent) => void
}

const EventForm: FC<EventFormProps> = (props) => {
	const {user} = useTypedSelector(state => state.auth)
	const [event, setEvent] = useState<IEvent>({
		author: '',
		date: '',
		description: '',
		guest: ''
	})
	const onChange = (date: Moment | null) => {
		date && setEvent
		({...event, date:formatDate(date.toDate())});
	}

	const onFinish = () => {
		console.log('asdasd')
		props.submit({...event, author: user.username})
	}
	return (
		<Form onFinish={onFinish}>
			<Form.Item
				label="Event Description"
				name="description"
				rules={[rules.required('Please enter event description')]}
			>
				<Input
					type="text"
					placeholder="Please enter event description"
					value={event.description}
					onChange={e => setEvent({...event, description: e.target.value})}
				/>
			</Form.Item>
			<Form.Item
				label="Event Date"
				name="date"
				rules={[rules.required('Please pick event date'), rules.isDateAfter("Can't make event in past time")]}
			>
					<DatePicker onChange={onChange} />
			</Form.Item>
			<Form.Item
				label="Choose a guest"
				name="guest"
				rules={[rules.required('Please choose a guest')]}
			>
				<Select onChange={(guest: string) => setEvent({...event, guest})}>
					{props.guests.map(guest =>
						<Select.Option key={guest.username} value={guest.username}>{guest.username}</Select.Option>
					)}
				</Select>
			</Form.Item>
			<Row justify={'end'}><Button type={'primary'} htmlType={'submit'}>Sumbit</Button> </Row>
		</Form>
	);
};

export default EventForm;
