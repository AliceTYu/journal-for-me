import styles from './JournalForm.module.css';
import Button from './../Button/Button';
import { useContext, useEffect, useReducer, useRef } from 'react';
import cn from 'classnames';
import { formReducer, INITIAL_STATE } from './JournalForm.state';
import Input from '../Input/Input';
import { UserContext } from '../../context/user.context';

// const INITIAL_STATE = {
// 	title: true,
// 	date: true,
// 	text: true
// };

function JournalForm({addItem, data, deleteItem, setSelectedItem}) {
	// const [formValidState, setFormValidState] = useState(INITIAL_STATE);
	// useReducer
	const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
	const { isValid, isFormReadyToSubmit, values } = formState;
	const titleRef = useRef();
	const dateRef = useRef();
	const textRef = useRef();
	const { userId } = useContext(UserContext);

	const focusError = (isValid) => {
		switch(true){
		case !isValid.title:
			titleRef.current.focus();
			break;
		case !isValid.date:
			dateRef.current.focus();
			break;
		case !isValid.text:
			textRef.current.focus();
			break;
		}
	};

	useEffect(() => {
		if (!data){
			dispatchForm({ type: 'CLEAR' });
			dispatchForm({type: 'SET_VALUE', payload: { userId }});
		}
		dispatchForm({type: 'SET_VALUE', payload: { ...data }});
	}, [data]);

	useEffect(() => {
		let timerId;
		if (!isValid.title || !isValid.date || !isValid.text){
			focusError(isValid);
			timerId = setTimeout(() => {
				dispatchForm({ type: 'RESET_VALIDITY' });
			}, 1500);
		}
		return () => {
			clearTimeout(timerId);
		};
	}, [isValid]);

	useEffect(() => {
		if (isFormReadyToSubmit){
			addItem(values);
			dispatchForm({ type: 'CLEAR' });
			dispatchForm({type: 'SET_VALUE', payload: { userId }});
		}
	}, [isFormReadyToSubmit, values, addItem, userId]);

	useEffect(() => {
		dispatchForm({type: 'SET_VALUE', payload: { userId }});
	}, [userId]);

	const addJournalItem = (e) => {
		e.preventDefault();
		dispatchForm({type: 'SUBMIT'});
		setSelectedItem(null);
	};

	const setValue = (e) => {
		dispatchForm({type: 'SET_VALUE', payload: {[e.target.name]: e.target.value}});
	};

	const deleteJornalItem = () => {
		deleteItem(data.id);
		dispatchForm({ type: 'CLEAR' });
		dispatchForm({type: 'SET_VALUE', payload: { userId }});
		setSelectedItem(null);
	};

	return (
		<form className={styles.journalForm} onSubmit={addJournalItem}>
			<div className={styles.journalBlock}>
				<Input value={values.title} ref={titleRef} onChange={setValue} appearence='title' isValid={isValid.title} type="text" name='title' placeholder='Заголовок'/>
				{data?.id && <button className={styles.btn} onClick={deleteJornalItem} type='button'>
					<img src="./public/delete.svg" alt="delete" />
				</button>}
			</div>
	
			<div className={styles.journalBlock}>
				<label htmlFor='date' className={styles.FormLable}>
					<img src='./public/calendar.svg' alt='Иконка календаря'/>
					<span>Дата</span>
				</label>
				<Input value={values.date ? new Date(values.date).toISOString().slice(0, 10) : ''} ref={dateRef} isValid={isValid.date} onChange={setValue} id='date' type="date" name='date'/>
			</div>
	
			<div className={styles.journalBlock}>
				<label htmlFor='tag' className={styles.FormLable}>
					<img src='./public/folder.svg' alt='Иконка метки'/>
					<span>Метки</span>
				</label>
				<Input value={values.tag} placeholder='Метки' onChange={setValue} id='tag' type='text' name='tag' />
			</div>
	
			<div className={styles.journalBlock}>
				<textarea value={values.text} ref={textRef} onChange={setValue} rows={10} cols={10} name='text' className={cn(styles.input, {
					[styles['invalid']]: !isValid.text
				})} placeholder='Текст'></textarea>
			</div>
					
			<Button>Сохранить</Button>
		</form> 
	);
}

export default JournalForm;