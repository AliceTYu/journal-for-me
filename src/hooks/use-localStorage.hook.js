import { useEffect, useState } from 'react';

const defaultArray = [
	{"title":"Пост 1","date":"2024-09-17T00:00:00.000Z","text":"Выбрать путешествие для отпуска","tag":"отпуск","userId":1,"id":1}
]

export function useLocalStorage (key) {
	const [data, setData] = useState();

	// useEffect(() => {
	// 	localStorage.setItem(key, JSON.stringify(defaultArray));
	// 	if (Array.isArray(data)){
	// 		defaultArray = data
	// 	}
	// },[])

	useEffect(() => {
		const storedData = localStorage.getItem(key);
		
		if (storedData) {
		  setData(JSON.parse(storedData));
		} else {
		  localStorage.setItem(key, JSON.stringify(defaultArray));
		  setData(defaultArray);
		}
	  }, [key]);

	// useEffect(() => {
	// 	const res = JSON.parse(localStorage.getItem(key));
	// 	if (res){
	// 		setData(res);
	// 	}
	// }, []);

	const saveData = (newData) => {
		localStorage.setItem(key, JSON.stringify(newData));
		setData(newData);
	};

	return [data, saveData];
}

