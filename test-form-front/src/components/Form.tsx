import React, { useState } from "react";

interface FormData {
    email: string
    number: string
}

interface FormProps {
    searchData: (formData: FormData) => void
}

const Form: React.FC<FormProps> = ({ searchData }) => {
    const [formData, setFormData] = useState<FormData>({ email: '', number: '' })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        searchData(formData)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        if (name === 'number') {
            const formattedValue = value.replace(/-/g, '')

            const formattedNumber = formattedValue
                .replace(/\D/g, '')
                .replace(/(\d{2})(\d{2})(\d{2})/, '$1-$2-$3')

            setFormData({ ...formData, [name]: formattedNumber })
        } else {
            setFormData({ ...formData, [name]: value })
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>Email: </label>
            <input
                type='text'
                name='email'
                value={formData.email}
                onChange={handleChange}
                required
            />
            <label>Number: </label>
            <input
                type='text'
                name='number'
                value={formData.number}
                onChange={handleChange}
            />
            <button type='submit'>Search</button>
        </form>
    )
}

export default Form;