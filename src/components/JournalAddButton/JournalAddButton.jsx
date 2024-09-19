import CardButton from '../CardButton/CardButton';
import styles from './JournalAddButton.module.css';

function JournalAddButton({addNewItem}) {
	return (
		<CardButton className={styles.journalAdd} onClick={addNewItem}>
			<img src="./plus.svg" alt="plus" />
				Новое воспоминание
		</CardButton>
	);
}

export default JournalAddButton;