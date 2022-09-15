import React, {FC} from 'react';
import {Badge, BadgeProps, Calendar} from 'antd';
import {IEvent} from '../models/IEvent';
import {Moment} from 'moment';
import {formatDate} from '../utils/date';

interface EventCalendarProps {
	events: IEvent[];
}


const EventCalendar:FC<EventCalendarProps> = (props) => {
	const dateCellRender = (value: Moment) => {
		const formatedDate = formatDate(value.toDate());
		const currentDayEvents = props.events.filter(events => events.date === formatedDate)
		return (
			<ul className="events" style={{padding:'12px'}}>
				{currentDayEvents.map((item, index) => (
					<li key={index} style={{fontSize:'10px', color: 'royalblue'}}>{item.description}</li>
				))}
			</ul>
		);
	};
	return (
		<Calendar dateCellRender={dateCellRender}/>
	);
};

export default EventCalendar;