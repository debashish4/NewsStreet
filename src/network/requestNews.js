import axios from 'axios'
import { ARTICLES, API_KEY, SOURCES, TOP_HEADLINES, EVERYTHING } from '../constants/api'
import { splitArray, stringifyArray } from '../utils/commonUtils'
import { eventBus } from '../utils/eventBus'
import store from '../store'


const fetchNews = (checkedItems) => {
	eventBus.$emit('startLoader');
	let stringified = stringifyArray(checkedItems);
	return axios({
		method: 'GET',
		url: `${TOP_HEADLINES}sources=${stringified}`,
		headers: { 'X-Api-Key': `${API_KEY}` },
	}).then(res => res.data);
};

const fetchSearchNews = (query) => {
	return axios({
		method: 'GET',
		url: `${EVERYTHING}q=${query}`,
		headers: { 'X-Api-Key': `${API_KEY}` }
	}).then(res => res.data);
}

const fetchNewsSource = () => {
	return axios({
		method: 'GET',
		url: `${SOURCES}`,
		headers: { 'X-Api-Key': `${API_KEY}` }
	}).then(res => res.data);
};

const fetchNewsBasedOnCountry = (country) => {
	eventBus.$emit('startLoader');
	return axios({
		method: 'GET',
		url: `${TOP_HEADLINES}country=${country}&pageSize=100`,
		headers: { 'X-Api-Key': `${API_KEY}` }
	})
};

const fetchNewsBasedOnCategory = (category) => {
	eventBus.$emit('startLoader');
	return axios({
		method: 'GET',
		url: `${TOP_HEADLINES}country=${store.state.settings.country}&category=${category}&pageSize=100`,
		headers: { 'X-Api-Key': `${API_KEY}` }
	})
};

const fetchNewsBasedOnSource = (source) => {
	eventBus.$emit('startLoader');
	console.log('sources', source);
	return axios({
		method: 'GET',
		url: `${EVERYTHING}domains=${source}&pageSize=100`,
		headers: { 'X-Api-Key': `${API_KEY}` }
	}).then(res => res.data);
};


export { fetchNewsBasedOnSource, fetchNewsBasedOnCountry, fetchNewsBasedOnCategory, fetchNews, fetchNewsSource, fetchSearchNews }