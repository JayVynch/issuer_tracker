'use client';
import React, { useState } from 'react'
import dynamic from 'next/dynamic';
import { TextField, Button, Callout, Text } from '@radix-ui/themes'
import {useForm, Controller } from 'react-hook-form';
import "easymde/dist/easymde.min.css";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueValidation } from '@/app/validationSchemas';
import { z } from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';

const SimpleMDE = dynamic(
    () => import('react-simplemde-editor'),{ ssr: false}
)

type IssueFormInterface = z.infer<typeof createIssueValidation>


const NewIssue = () => {
    const router = useRouter();
    const { register,control, handleSubmit, formState : {errors} } = useForm<IssueFormInterface>({
        resolver: zodResolver(createIssueValidation)
    });

    const [error, setError] = useState('')

    const [isSubmit, setSubmit] = useState(false)

    const onSubmit = handleSubmit( async (data) => {
        try {
            setSubmit(true)
            await axios.post('/api/issues',data)
            router.push('/issues')
        } catch (error) {
            setSubmit(false)
            setError('An unexpected event occurred')
        }
    } )
    
    return (
        <div className='max-w-xl '>
            {
                error && (
                <Callout.Root color='red' className='mb-4'>
                    <Callout.Text>{error}</Callout.Text>
                </Callout.Root>
            )}
            
            <form 
                onSubmit={onSubmit} 
                className='space-y-3'
            >
                <TextField.Root placeholder="Title" {...register('title')}></TextField.Root>
                <ErrorMessage>{errors.title?.message}</ErrorMessage>

                <Controller 
                    name='description'
                    control={control}
                    render={ ({field}) => <SimpleMDE placeholder="Description" {...field} /> }
                />

                <ErrorMessage>{errors.description?.message}</ErrorMessage> 
                
                <Button disabled={isSubmit}>Create New Issue { isSubmit && <Spinner />} </Button>
            </form>
        </div>
       
    )
}

export default NewIssue