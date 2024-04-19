'use client';
import React from 'react'
import { TextField, Button } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const NewIssue = () => {
  return (
    <div className='max-w-xl space-y-3'>
        <TextField.Root placeholder='title'>
        </TextField.Root>

        <SimpleMDE placeholder="Description" />

        <Button>Create New Issue</Button>
    </div>
  )
}

export default NewIssue