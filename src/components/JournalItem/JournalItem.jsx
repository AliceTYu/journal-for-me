import styles from './JournalItem.module.css';

function JournalItem(props) {
	const dateString = new Intl.DateTimeFormat('ru-Ru').format(props.date);

	return (
		<>
			<h2 className={styles['journal-item__header']}>{props.title}</h2>
			<div className={styles['journal-item__body']}>
				<div className={styles['journal-item__date']}>{`${dateString}`}</div>
				<div className={styles['journal-item__text']}>{props.text}</div>
			</div>
		</>
	);
}

export default JournalItem;