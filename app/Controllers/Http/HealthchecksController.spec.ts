import {test} from '@japa/runner'
import {StatusCodes} from 'http-status-codes'
import nock from 'nock'

test.group('Apps Controller', group => {
  const resourceEndpoint = '/'
  const fullEndpoint = `http://localhost:3333${resourceEndpoint}`
  const mockResponse = {
    healthy: true,
    report: {
      env: {
        health: {
          healthy: true
        }
      }
    }
  }

  group.each.setup(() => {
    if (!nock.isActive()) {
      nock.activate()
      nock.enableNetConnect()
    }
  })
  group.each.teardown(() => nock.restore())

  test('should return an OK response with the request body details', async ({client}) => {
    nock(`http://localhost:3333`)
      .get(resourceEndpoint)
      .reply(StatusCodes.OK, () => mockResponse)

    const apiResponse = await client.get(fullEndpoint)
    apiResponse.assertStatus(StatusCodes.OK)
    apiResponse.assertBodyContains(mockResponse)
  })

  test('should return a BAD response with error message', async ({client}) => {
    const error = {
      healthy: false,
      report: {
        env: {
          health: {
            healthy: false
          }
        }
      }
    }

    nock(`http://localhost:3333`)
      .get(resourceEndpoint)
      .reply(StatusCodes.BAD_REQUEST, () => error)

    const apiResponse = await client.get(fullEndpoint)
    apiResponse.assertStatus(StatusCodes.BAD_REQUEST)
    apiResponse.assertBodyContains(error)
  })
})

