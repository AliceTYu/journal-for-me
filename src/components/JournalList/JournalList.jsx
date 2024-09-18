import { useContext, useMemo } from 'react';
import { UserContext } from '../../context/user.context';
import CardButton from '../CardButton/CardButton';
import ErrorList from '../ErrorList/ErrorList';
import JournalItem from '../JournalItem/JournalItem';
import styles from './JournalList.module.css';

function JournalList({items, setItem}) {
	const { userId } = useContext(UserContext);

	const sortedItem = (a, b) => {
		if (a.date > b.date){
			return -1;
		} else {
			return 1;
		}
	};

	const sortedId = (a, b) => {
		if (a.id > b.id){
			return -1;
		} else {
			return 1;
		}
	};

	const filterItems = useMemo(() => items
		.filter(i => i.userId === userId)
		.sort(sortedItem)
		.sort(sortedId), [items, userId]);
	
	if (items.length === 0){
		return <ErrorList/>;
	}

	return (
		<div className={styles.journalList}>
			{filterItems
				.map((el) => (
					<CardButton key={el.id} className={'red'} onClick={() => setItem(el)}>
						<JournalItem data={el}/>
					</CardButton>
				))}
		</div>
	);
}

export default JournalList;