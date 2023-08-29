import { TextField, Grid } from '@mui/material'

const Input = ({ name, label, handleChange, required, autoFocus, type, half, value }) => {
    return (
        <Grid item xs={12} sm={half ? 6 : 12}>
            <TextField
                name={name}
                label={label}
                onChange={handleChange}
                variant='outlined'
                value={value}
                required={required}
                fullWidth
                autoFocus={autoFocus}
                type={type}
            />

        </Grid>
    )
}

export default Input
