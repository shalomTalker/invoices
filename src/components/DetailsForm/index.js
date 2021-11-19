import { Button, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import * as yup from 'yup'
import React, { useState } from 'react'
import { useOrderContext } from '../../context/OrderContext'
const schema = yup.object().shape({
    fullName: yup.string()
        .min(2)
        .max(50)
        .required('חסר שם לקוח'),
    phone: yup.string()
        .matches(/^0\d([\d]{0,1})([-]{0,1})\d{7}$/, "מספר פלאפון לא תקין")
        .required('חסר מספר פלאפון'),
    email: yup.string()
        .email('אימייל לא תקין')
        .required('חסר אימייל'),
});
export default function DetailsForm() {
    const { state, updateUser } = useOrderContext()
    const [error, setError] = useState('')
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
        }
    ]
    const validateUserField = async (obj) => {
        try {
            const data = await schema.validate(obj)
            console.log(data)
            return true

        } catch (error) {
            console.log(error.errors)
            return false
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(state)
        const order = {
            user: state.user,
            items: Object.values(state.items).map(({ model, id, price, count }) => ({ model, id, price, count }))
        }
        const errors = [];
        order.items.forEach(item => { if (!item.price || item.price == 0) { errors.push(`חסר מחיר בדגם ${item.model}`) } })
        const isValid = await validateUserField(order.user)
        if (!isValid) {
            errors.push('פרטי לקוח חסרים')
        }
        setError(errors.join(` , `))
    }

    return (
        <div>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', }}>
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
                <Button
                    sx={{ width: '33%', alignSelf: 'center', margin: 6 }}
                    variant='contained'
                    type="submit">{`צור הזמנה`}</Button>
                <Typography variant='caption' color="red">{error}</Typography>
            </form>
        </div>
    )
}
