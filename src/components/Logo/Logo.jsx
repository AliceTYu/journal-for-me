import { memo } from 'react';
import styles from './Logo.module.css';

function Logo({children, logoIndex}) {
	return (
		<div className={logoIndex===0 && styles.header}>
			{children}
		</div>
	);
}

export default memo(Logo);