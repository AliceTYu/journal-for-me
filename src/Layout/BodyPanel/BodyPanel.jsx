import styles from './BodyPanel.module.css';

function BodyPanel({ children }) {
	return (
		<div className={styles.body}>{children}</div>
	);
}

export default BodyPanel;