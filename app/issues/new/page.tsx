'use client';
import React, { useState } from 'react'
import { TextField, Button, Callout, Text } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import {useForm, Controller } from 'react-hook-form';
import "easymde/dist/easymde.min.css";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Resolver, zodResolver } from '@hookform/resolvers/zod';
import { createIssueValidation } from '@/app/validationSchemas';
import { z } from 'zod';

type IssueFormInterface = z.infer<typeof createIssueValidation>

const NewIssue = () => {
    const router = useRouter();
    const { register,control, handleSubmit, formState : {errors} } = useForm<IssueFormInterface>({
        resolver: zodResolver(createIssueValidation)
    });

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
                { errors.title && <Text color='red' as='p'>{errors.title.message}</Text> }

                <Controller 
                    name='description'
                    control={control}
                    render={ ({field}) => <SimpleMDE placeholder="Description" {...field} /> }
                />

                { errors.description && <Text color='red' as='p'>{errors.description.message}</Text> }
                
                <Button>Create New Issue</Button>
            </form>
        </div>
       
    )
}

export default NewIssue