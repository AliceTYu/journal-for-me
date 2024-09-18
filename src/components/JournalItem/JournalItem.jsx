import { dataStringRu } from '../../utils';
import styles from './JournalItem.module.css';

function JournalItem({data}) {
    
	return (
		<>
			<div className={styles['journal-item__head']}>{data.title}</div>
			<div className={styles['journal-item__body']}>
				<div className={styles['journal-item__date']}>{dataStringRu(data.date)}</div>
				<div className={styles['journal-item__text']}>{data.text}</div>
			</div>
		</>
	);
}

export default JournalItem;