import ListProviderMonthAvailabilityService from "@modules/appointments/services/ListProviderMonthAvailabilityService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class ProviderMonthAvailabilityController {
  async index(request: Request, response:Response): Promise<Response> {
    const { provider_id } = request.params
    const { month, year } = request.body
    const listProviderMonthAvailability= container.resolve(ListProviderMonthAvailabilityService)

    const availability = await listProviderMonthAvailability.execute({
      provider_id,
      month,
      year
    })

    return response.status(200).json(availability)
  }
}
