import { Button, TextField } from '@mui/material'
import { useFormik } from 'formik'
import React from 'react'
import { useOrderContext } from '../../context/OrderContext'

export default function DetailsForm() {
    const { state, updateUser } = useOrderContext()
    // const formik = useFormik({
    //     initialValues: {
    //         fullName: '',
    //         phone: '',
    //         email: ''
    //     },
    //     onSubmit: (values) => {
    //         console.log(state);
    //         console.log(values);
    //     }
    // })
    const inputsConfig = [
        {
            name: 'fullName',
            placeholder: `שם הלקוח`
        },
        {
            name: 'phone',
            placeholder: `פלאפון`
        },
        {
            name: 'email',
            placeholder: `אימייל`
        },]

    return (
        <div>
            <form onSubmit={e => { e.preventDefault(); console.log(state) }} style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex' }}>
                    {inputsConfig.map(({ name, placeholder }) =>
                        <TextField
                            fullWidth
                            inputProps={{ 'aria-label': 'search' }}
                            key={name}
                            id={name}
                            name={name}
                            placeholder={placeholder}
                            value={state.user[name]}
                            onChange={(e) => updateUser({ ...state.user, [name]: e.target.value })}
                        />
                    )}
                </div>
                <Button sx={{ width: '33%', alignSelf: 'center' }} variant='contained' type="submit">{`צור הזמנה`}</Button>
            </form>
        </div>
    )
}
