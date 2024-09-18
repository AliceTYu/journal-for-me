import styles from './CardButton.module.css';

function CardButton({ children, className, ...props }) {
	const cn = styles['card-button'] + (className ? ' ' + className : '');
	return (
		<button {...props} className={cn}>
			{children}
		</button>
	);
}

export default CardButton;