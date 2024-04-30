import StatusBadge from '@/app/components/StatusBadge';
import prisma from '@/prisma/client'
import { Card, Flex, Heading, Text } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

interface Props {
    params : { id : string }
}

const IssueDetailPage = async ({ params} : Props) => {
    const issue = await prisma.issue.findUnique({
        where : { id :  parseInt(params.id)}
    });

    if(!issue) notFound()

    return (
        <div>
            <Heading>{issue.title}</Heading>
            <Flex className='space-x-3 justify-center items-center' my="2">
                <StatusBadge status={issue.status} />
                <Text className='px-5'>{issue.created_at.toDateString()}</Text>
            </Flex>

            <Card className='prose' mt="4">
                <ReactMarkdown>{issue.description}</ReactMarkdown>
            </Card>
        </div>
    )
}

export default IssueDetailPage