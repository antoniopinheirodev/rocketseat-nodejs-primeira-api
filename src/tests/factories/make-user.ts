import { faker } from "@faker-js/faker";
import { db } from "../../database/client.ts";
import { courses, users } from "../../database/schema.ts";
import { hash } from "argon2";
import { randomUUID } from "node:crypto";
import jwt from 'jsonwebtoken'

export async function makeUser(role?: 'student' | 'manager') {
    const passwordBeforeHash = randomUUID()

    const result = await db.insert(users).values([
        {
            email: faker.internet.email(),
            name: faker.person.fullName(),
            password: await hash(passwordBeforeHash),
            role: role
        }
    ]).returning()

    return {
        user: result[0],
        passwordBeforeHash,
    }
}

export async function makeAuthenticatedUser(role: 'student' | 'manager') {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is required");
    }

    const { user } = await makeUser(role)
    const token = jwt.sign({
        sub: user.id, role: user.role,
    }, process.env.JWT_SECRET)

    return { user, token }
}