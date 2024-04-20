'use client';
import React, { useState } from 'react'
import { TextField, Button, Callout } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import {useForm, Controller } from 'react-hook-form';
import "easymde/dist/easymde.min.css";
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface IssueFormInterface{
    title : string
    description : string
}

const NewIssue = () => {
    const router = useRouter();
    const { register,control, handleSubmit } = useForm<IssueFormInterface>();

    const [error, setError] = useState('')
    
    return (
        <div className='max-w-xl '>
            {
                error && (
                <Callout.Root color='red' className='mb-4'>
                    <Callout.Text>{error}</Callout.Text>
                </Callout.Root>
            )}
            
            <form 
                onSubmit={handleSubmit( async (data) => {
                    try {
                        await axios.post('/api/issues',data)
                        router.push('/issues')
                    } catch (error) {
                        setError('An unexpected event occurred')
                    }
                } )} 
                className='space-y-3'
            >
                <TextField.Root placeholder='title' {...register('title')}></TextField.Root>

                <Controller 
                    name='description'
                    control={control}
                    render={ ({field}) => <SimpleMDE placeholder="Description" {...field} /> }
                />
                
                <Button>Create New Issue</Button>
            </form>
        </div>
       
    )
}

export default NewIssue