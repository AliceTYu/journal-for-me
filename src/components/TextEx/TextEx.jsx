import { memo } from 'react';

function TextEx({text}) {
	return (
		<>{text}</>
	);
}

export default memo(TextEx);