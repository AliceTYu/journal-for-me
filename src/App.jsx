import './App.css';
import Header from './components/Header/Header';
import BodyPanel from './Layout/BodyPanel/BodyPanel';
import LeftPanel from './Layout/LeftPanel/LeftPanel';
import JournalList from './components/JournalList/JournalList';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalForm from './components/JournalForm/JournalForm';
import { useLocalStorage } from './hooks/use-localstorage.hook';
import { UserContextProvider } from './context/user.context';
import { useState } from 'react';

function mapItems(items) {
	if (!items){
		return [];
	}
	return items.map(i => ({
		...i,
		date: new Date(i.date)
	}));
}

function App() {
	const [data, setData] = useLocalStorage('data');
	const [selectedItems, setSelectedItems] = useState(null);

	const addPost = (post) => {
		if (!post.id){
			setData([...mapItems(data), {
				...post,
				date: new Date(post.date),
				id: data.length > 0 ? Math.max(data.map(oldPost => oldPost.id)) + 1 : 1
			}]);
		} else {
			setData([...mapItems(data).map(i => {
				if (i.id === post.id) {
					return {
						...post
					};
				}
				return i;
			})]);
		}
	};

	const deleteItem = (id) => {
		setData([...data.filter(it => it.id !== id)]);
	};

	return (
		<UserContextProvider>
			<div className='app'>
				<LeftPanel>
					<Header/>
					<JournalAddButton clearForm={() => setSelectedItems(null)}/>
					<JournalList data={mapItems(data)} setItems={setSelectedItems}/>
				</LeftPanel>
		
				<BodyPanel>
					<JournalForm onSubmit={addPost} onDelete={deleteItem} selectData={selectedItems}/>
				</BodyPanel>
			</div>
		</UserContextProvider>
	);
}

export default App;
