import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const allDoctors = await prisma.doctor.findMany();

        console.log(allDoctors);

        return NextResponse.json(allDoctors, { status: 200 });
    } catch (error) {
        console.error('Error fetching doctors:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
