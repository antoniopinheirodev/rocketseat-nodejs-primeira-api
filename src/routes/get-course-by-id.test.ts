import { test, expect } from 'vitest'
import request from 'supertest'
import { server } from '../app.ts'
import { faker } from '@faker-js/faker'
import { makeCourse } from '../tests/factories/make-course.ts'

test('Get courses by id', async () => {
  await server.ready()

  const course = await makeCourse()
  const response = await request(server.server)
    .get(`/courses/${course}`)

  expect(response.status).toEqual(201)
  expect(response.body).toEqual({
    course: {
      id: expect.any(String),
      title: expect.any(String),
      description: null
    }
  })
})

