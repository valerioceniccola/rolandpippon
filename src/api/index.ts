import axios from "axios";

export default axios.create({
	// baseURL: "http://54.37.79.232:8000",
	responseType: "json",
	// withCredentials: true,
	headers: {
		'Content-Type': 'application/json;charset=utf-8',
		// 'Authorization': `bearer ${token_api4}`
	}
});

// export default axios.create({
// 	baseURL: "http://162.19.253.207:8000",
// 	// responseType: "json",
// 	// withCredentials: true,
// 	headers: {
// 		'Content-Type': 'application/json;charset=utf-8',
// 		'Access-Control-Allow-Origin': '*',
// 		// 'Authorization': `bearer ${token_api4}`
// 	}
// });
