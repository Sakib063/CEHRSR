import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const formData = await request.json();

        const newDoctor = await db.Doctor.create({
            data: {
                first_name: formData.first_name,
                last_name: formData.last_name,
                national_id: formData.national_id,
                phone_number: formData.phone_number,
                email: formData.email,
                password: formData.password,
                bm_dc_license_number: formData.bm_dc_license_number,
                assoc_hospital_id: formData.assoc_hospital_id,
            }
        });

        console.log(newDoctor);

        return NextResponse.json(newDoctor, { status: 200 });
    } catch (error) {
        console.error('Error creating doctor:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
