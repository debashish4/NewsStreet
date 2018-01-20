import axios from 'axios'
import { ARTICLES, API_KEY, SOURCES, TOP_HEADLINES, EVERYTHING } from '../constants/api'
import { splitArray, stringifyArray } from '../utils/commonUtils'
import { eventBus } from '../utils/eventBus'

const fetchNews = (checkedItems) => {
	eventBus.$emit('startLoader');
	if (checkedItems && checkedItems.length > 20) {
		async function test() {
			console.log('grater then 20');
			let splitBigNewSources = splitArray(checkedItems, 20);
			let splitBigNewSourcesResponse = splitBigNewSources.map(item => {
				let stringified = stringifyArray(item);
				console.log('stringified', stringified);
				return axios({
					method: 'GET',
					url: `${TOP_HEADLINES}sources=${stringified}`,
					headers: { 'X-Api-Key': `${API_KEY}` },
				}).then(res => res);
			});
			return splitBigNewSourcesResponse;
		}
		return test();
	} else {
		let stringified = stringifyArray(checkedItems);
		return axios({
			method: 'GET',
			url: `${TOP_HEADLINES}sources=${stringified}`,
			headers: { 'X-Api-Key': `${API_KEY}` },
		}).then(res => res.data);
	}
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
		url: `${TOP_HEADLINES}country=in&category=${category}&pageSize=100`,
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