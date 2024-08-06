import { memo } from 'react';
import styles from './Logo.module.css';

function Logo({children}) {
	return (
		<div className={styles.header}>
			{children}
		</div>
	);
}

export default memo(Logo);