import React, { useState } from 'react';

const Textarea = ({ placeholder, className, ...props}) => {

  const [state, setState] = useState({
    value: '',
    rows: 1,
    minRows: 1,
    maxRows: 100,
  })

  const handleChange = ({ target }) => {
    const textareaLineHeight = 30;
		const { minRows, maxRows } = state;

    const previousRows = target.rows;
  	target.rows = minRows;

    const currentRows = ~~(target.scrollHeight / textareaLineHeight);

    if (currentRows === previousRows) {
    	target.rows = currentRows;
    }

    if (currentRows >= maxRows) {
			target.rows = maxRows;
			target.scrollTop = target.scrollHeight;
		}

    setState({
      ...state,
    	value: target.value,
      rows: currentRows < maxRows ? currentRows : maxRows,
    });

    console.log(currentRows < maxRows ? currentRows : maxRows)

  }

  return (
    <textarea
      rows={state.rows}
      value={state.value}
      placeholder={placeholder}
      className={className}
      onChange={handleChange}
      {...props}
    />
  )
}

export default Textarea;