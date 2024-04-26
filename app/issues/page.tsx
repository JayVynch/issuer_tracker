import React from 'react'
import Link from 'next/link'
import { Button, Table } from '@radix-ui/themes'
import prisma from '@/prisma/client'
import StatusBadge from '../components/StatusBadge'

const issues = async () => {
    const issues = await prisma.issue.findMany()
  return (
    <div>
        <Button>
            <Link href='/issues/new'>New Issues</Link>
        </Button>

        <Table.Root variant='surface' className='mt-4'>
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeaderCell>Issues</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell className='hidden md:table-cell'>Create At</Table.ColumnHeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {issues.map(issue => (
                    <Table.Row key={issue.id}>
                        <Table.Cell>
                            {issue.title}
                            <div className='block md:hidden'>
                                <StatusBadge status={issue.status} />
                            </div>
                        </Table.Cell>
                        <Table.Cell className='hidden md:table-cell'><StatusBadge status={issue.status} /></Table.Cell>
                        <Table.Cell className='hidden md:table-cell'>{issue.created_at.toDateString()}</Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
    </div>
  )
}

export default issues