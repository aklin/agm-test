import {FormControl, FormHelperText, Input, InputLabel} from "@material-ui/core";


export default function InputField({id, label, value, onChange, helperText, ...props}) {
	return (
		<FormControl>
			<InputLabel htmlFor={id}>{label}</InputLabel>
			<Input id={id} value={value || ''} onChange={onChange} {...props} />
			{helperText && <FormHelperText id={`${id}_ht`}>{helperText}</FormHelperText>}
		</FormControl>
	)
}
