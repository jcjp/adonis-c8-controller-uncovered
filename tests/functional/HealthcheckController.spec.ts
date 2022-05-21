import {test} from '@japa/runner'
import {StatusCodes} from 'http-status-codes'

test.group('App', () => {
  const apiEndpoint: string = '/'

  test('get request to / endpoint returns HTTP OK and health status', async ({client}) => {
    const apiResponse = await client.get(apiEndpoint)

    apiResponse.assertStatus(StatusCodes.OK)
    apiResponse.assertBodyContains({
      healthy: true,
      report: {
        env: {
          health: {
            healthy: true
          }
        }
      }
    })
  })
})

