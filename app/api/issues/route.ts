import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod';
import prisma from "@/prisma/client";

const createIssueValidation = z.object({
    title : z.string().min(1,'The title is required').max(255,'Title cannot be above 225 characters'),
    description : z.string().min(1,'The description is required')
});
 
export async function POST(request: NextRequest){
    const body = await request.json()

    const validation = createIssueValidation.safeParse(body)

    if(!validation.success){
        return NextResponse.json(validation.error.format(),{ status : 400})
    }

    const newIssue = await prisma.issue.create({
        data :{ title : body.title, description : body.description}
    })

    return NextResponse.json(newIssue,{status : 201})
}