import { ARTICLES, API_KEY, SOURCES } from '../constants/api';

console.log(API_KEY);


const fetchNews = (checkedItems) => {
	 let test = checkedItems.map((item, index, arr) => {
		return fetch(`${ARTICLES}source=${item}&apiKey=${API_KEY}`, { method: "get" })
			.then(res => res.json())
			.then(res => res)
			.catch(err => err)
	})
	console.log({test});
	return test;
}

const fetchNewsSource = () => {
	return fetch(`${SOURCES}`)
	.then(res => res.json())
	.then(res => res)
	.catch(err => err)
}


export { fetchNews, fetchNewsSource }