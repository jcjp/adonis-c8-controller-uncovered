import HealthCheck from '@ioc:Adonis/Core/HealthCheck'
import {test} from '@japa/runner'

import {StatusCodes} from 'http-status-codes'
import sinon from 'sinon'

test.group('App', () => {
  const apiEndpoint: string = '/'
  test('get request to / endpoint returns HTTP OK and health status', async ({client}) => {
    const apiResponse = await client.get(apiEndpoint)
    apiResponse.assertStatus(StatusCodes.OK)
    apiResponse.assertBodyContains({
      healthy: true,
      report: {env: {health: {healthy: true}}}
    })
  })

  test('get request to / endpoint returns HTTP OK and health status', async ({client}) => {
    sinon.stub(HealthCheck, 'getReport').resolves({healthy: false})
    const apiResponse = await client.get(apiEndpoint)
    apiResponse.assertStatus(StatusCodes.BAD_REQUEST)
    apiResponse.assertBodyContains({healthy: false})
  })
})

