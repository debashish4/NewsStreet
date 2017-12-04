import axios from 'axios'
import { ARTICLES, API_KEY, SOURCES, TOP_HEADLINES, EVERYTHING } from '../constants/api'
import { stringifyArray } from '../utils/commonUtils'


const fetchNews = (checkedItems) => {
	let stringified = stringifyArray(checkedItems);
	return axios({
		method: 'GET',
		url: `${TOP_HEADLINES}sources=${stringified}`,
		headers: { 'X-Api-Key': `${API_KEY}` },
	}).then(res => res.data);
};

const fetchSearchNews = (query) =>{
	return axios({
		method: 'GET',
		url: `${EVERYTHING}q=${query}`,
		headers: { 'X-Api-Key': `${API_KEY}` },
	}).then(res => res.data);
}

const fetchNewsSource = () => {
	return axios({
		method: 'GET',
		url: `${SOURCES}`,
		headers: { 'X-Api-Key': `${API_KEY}` },
	}).then(res => res.data);
};

export { fetchNews, fetchNewsSource, fetchSearchNews }