import { Box, Card, Flex } from '@radix-ui/themes'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const loading = () => {
  return (
    <Box className='max-w-xl'>
        <Skeleton />
        <Flex className='space-x-3 justify-center items-center' my="2">
            <Skeleton width="3rem" />
            <Skeleton width="7rem"/>
        </Flex>

        <Card className='prose' mt="4">
            <Skeleton />
        </Card>
    </Box>
  )
}

export default loading