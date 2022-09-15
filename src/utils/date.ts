import {Moment} from 'moment';

export const formatDate = (date: Date): string => {
	const year = date.getFullYear();
	const month = date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth();
	const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
	return `${day} ${month} ${year}`
}