import styles from './ErrorList.module.css';

function ErrorList() {
	return (
		<div className={styles.errorList}>
            Записей нет, добавьте первую!
		</div>
	);
}

export default ErrorList;