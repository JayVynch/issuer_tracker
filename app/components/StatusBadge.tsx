import React from 'react'
import { Status } from '@prisma/client'
import { Badge } from '@radix-ui/themes'

const statusMap: Record<Status,{label:string, color:"green"|"red"|"violet"}> = {
    OPEN : { label : 'Open', color: 'green'},
    CLOSE : { label : 'Close', color: 'red'},
    IN_PROGRESS : { label : 'in-progress', color: 'violet'},
}

const StatusBadge = ({status}: {status: Status}) => {
  return (
    <Badge color={statusMap[status].color}>
        {statusMap[status].label}
    </Badge>
  )
}

export default StatusBadge