// import axios from 'axios';
// import reverseGeocode from 'latlng-to-zip';
// import qs from 'qs';

// import {
// 	FETCH_JOBS
// } from './types';

// const JOB_ROOT_URL = 'http://api.indeed.com/ads/apisearch?';
// const JOB_QUERY_PARAMS = {
// 	publisher: '4201738803816157',
// 	format: 'json'
// 	v: '2',
// 	latlong: 1,
// 	radius: 10,
// 	q: 'front end developer'
// };

// const buildJobsUrl = (zip) => {
// 	const query = qs.stringify({...JOB_QUERY_PARAMS, l: zip });
// 	return `${JOB_ROOT_URL}${query}`;
// };

// export const fetchJobs = (region) => async (dispatch) => {
// 	try { 
// 		let zip = await reverseGeocode(region);
// 		const url = buildJobsUrl(zip);
// 		let { data } = await axios.get(url);  //get that list of jobs and return a respond jobs data
// 		dispatch({ type: FETCH_JOBS, payload: data });
// 		console.log(data);
// 	} catch(error) {
// 		console.error(error)
// 	}
// }; 

import axios from 'axios';
import reverseGeocode from 'latlng-to-zip';
import qs from 'qs';

import { FETCH_JOBS } from './types';

const JOB_ROOT_URL = 'http://api.indeed.com/ads/apisearch?';
const JOB_QUERY_PARAMS = {
publisher: '4201738803816157',
format: 'json',
v: '2',
latlong: 1,
radius: 10,
q: 'javascript',
};

const buildJobsUrl = zipCode => {
const query = qs.stringify({ ...JOB_QUERY_PARAMS, l: zipCode });
return `${JOB_ROOT_URL}${query}`;
};

export const fetchJobs = (region, callback) => async dispatch => {
try {
let zipCode = await reverseGeocode(region);
const url = buildJobsUrl(zipCode);
let { data } = await axios.get(url);
dispatch({ type: FETCH_JOBS, payload: data });
callback();
} catch (e) {
console.error(e);
}
};

