import CardButton from '../CardButton/CardButton';
import JournalItem from '../JournalItem/JournalItem';
import styles from './JournalList.module.css';
import { UserContext } from './../../context/user.context';
import { useContext, useMemo } from 'react';

function JournalList({ data, setItems }) {
	const { userId } = useContext(UserContext);

	const sortedPosts = (a, b) => {
		if (a.date > b.date){
			return -1;
		} else {	
			return 1;
		}
	};
	
	const filterItems = useMemo(() => data.filter(el => el.userId === userId).sort(sortedPosts), [data, userId]);

	if (data.filter(el => el.userId === userId).length === 0){
		return <p>Записей пока нет, добавьте первую</p>;
	}

	return (
		<div className={styles['journal-list']}>
			{filterItems.map(post => (
				<CardButton key={post.id} onClick={() => setItems(post)}>
					<JournalItem title={post.title} text={post.text} date={post.date}/>
				</CardButton>
			))}
		</div>
	);
}

export default JournalList;