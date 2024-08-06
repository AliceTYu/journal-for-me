import styles from './JournalForm.module.css';
import Button from '../Button/Button';
import { useContext, useEffect, useReducer, useRef } from 'react';
import cn from 'classnames';
import { formReducer, INITIAL_STATE } from './JournalForm.state';
import Input from '../Input/Input';
import { UserContext } from '../../context/user.context';

function JournalForm( {onSubmit, selectData, onDelete} ) {    
	const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
	const { isValid, isFormReadyToSubmit, values } = formState;
	const titleRef = useRef();
	const dateRef = useRef();
	const textRef = useRef();
	const {userId} = useContext(UserContext);

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
		if (!selectData){
			dispatchForm( {type: 'CLEAR'} );
			dispatchForm( {type: 'SET_VALUE' , payload: {userId} });
		}
		dispatchForm( {type: 'SET_VALUE' , payload: { ...selectData }});
	}, [selectData, userId]);

	useEffect(() => {
		let clearId;
		if (!isValid.title || !isValid.date || !isValid.text){
			clearId = setTimeout(() => {
				focusError(isValid);
				dispatchForm({type: 'RESET_VALID'});
			}, 2000);
		}
		return () => {
			clearTimeout(clearId);
		};
	}, [isValid]);

	useEffect(() => {
		dispatchForm( {type: 'SET_VALUE' , payload: {userId} });
	}, [userId]);

	useEffect(() => {
		if (isFormReadyToSubmit){
			onSubmit(values);
			dispatchForm( {type: 'CLEAR'} );
			dispatchForm( {type: 'SET_VALUE' , payload: {userId} });
		}
	}, [isFormReadyToSubmit, values, onSubmit, userId]);

	const addJournalItem = (e) => {
		e.preventDefault();
		// const formData = new FormData(e.target);
		// const formProps = Object.fromEntries(formData);
		// let isValidForm = true;
		// if (!formProps.title?.trim().length){
		// 	setFormValidState(state => ({...state, title: false}));
		// 	isValidForm = false;
		// } else {
		// 	setFormValidState(state => ({...state, title: true}));
		// }
		// if (!formProps.text?.trim().length){
		// 	setFormValidState(state => ({...state, text: false}));
		// 	isValidForm = false;
		// } else {
		// 	setFormValidState(state => ({...state, text: true}));
		// }
		// if (!formProps.date){
		// 	setFormValidState(state => ({...state, date: false}));
		// 	isValidForm = false;
		// } else {
		// 	setFormValidState(state => ({...state, date: true}));
		// }
		// if (!isValidForm){
		// 	return;
		// }
		dispatchForm({type: 'SUBMIT' });
	};

	const onChange = (e) => {
		dispatchForm( {type: 'SET_VALUE' , payload: {[e.target.name]: e.target.value} });
	};

	const deleteItem = () => {
		onDelete(selectData.id);
		dispatchForm( {type: 'CLEAR'} );
		dispatchForm( {type: 'SET_VALUE' , payload: {userId} });
	};

	return (
		<form className={styles['journal-form']} onSubmit={addJournalItem}>
			<div className={styles['journal-title']}>
				<Input onChange={onChange} ref={titleRef} type='text' name='title' value={values.title} isValid={isValid.title} appearence={'title'}/>
				{selectData?.id && <button className={styles['delete']} type='button' onClick={() => deleteItem()}>
					<img src="public/delete.svg" alt="Удалить лого" />
				</button>}
			</div>

			<div className={styles['form-row']}>
				<label htmlFor="date" ref={dateRef} className={styles['form-label']}>
					<img src="public/calendar.svg" alt="calendar" />
					<span>Дата</span>
				</label>
				<Input onChange={onChange} isValid={isValid.date} id='date' type='date' name='date' value={values.date ? new Date(values.date).toISOString().slice(0, 10) : ''} />
			</div>

			<div className={styles['form-row']}>
				<label htmlFor="tag" className={styles['form-label']}>
					<img src="public/tag.svg" alt="calendar" />
					<span>Метки</span>
				</label>
				<Input onChange={onChange}  type='tag' name='tag' value={values.tag}/>
			</div>

			<textarea onChange={onChange} ref={textRef} name='text' cols='20' value={values.text} rows="10" className={cn(styles.input, {
				[styles.invalid]: !isValid.text
			})} placeholder="Введите текст"/>
			<Button>Сохранить</Button>
		</form>
	);
}

export default JournalForm;