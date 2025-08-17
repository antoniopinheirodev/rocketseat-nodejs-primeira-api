import { faker } from "@faker-js/faker";
import { db } from "../../database/client.ts";
import { courses } from "../../database/schema.ts";

export  async function makeCourse(course?:string) {
    const result = await db.insert(courses).values([
        { title : course ?? faker.lorem.words(4) }
    ]).returning()

    return result[0]
}