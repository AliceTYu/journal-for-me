import { forwardRef } from 'react';
import styles from './Input.module.css';
import cn from 'classnames';

const Input = forwardRef(function Input({ isValid = true, className, appearence, ...props }, ref) {
	return (
		<input {...props} ref={ref} className={cn(className, styles['input'], {
			[styles.invalid]: !isValid,
			[styles['input-title']]: appearence === 'title'
		})} placeholder="Введите заголовок"/>
	);
});

export default Input;