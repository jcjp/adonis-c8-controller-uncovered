import type {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'

export default class HealthchecksController {
  public async health({response}: HttpContextContract) {
    const report = await HealthCheck.getReport()

    return report.healthy
      ? response.ok(report)
      : response.badRequest(report)
  }
}
