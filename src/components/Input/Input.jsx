import { forwardRef } from 'react';
import styles from './Input.module.css';
import cn from 'classnames';

const Input = forwardRef(function Input({ className, isValid = true, appearence, ...props }, ref) {
	return (
		<input {...props} ref={ref} className={cn(className, styles.input, styles.another,{
			[styles['invalid']]: !isValid,
			[styles['title']]: appearence === 'title'
		})}/>
	);
});

export default Input;