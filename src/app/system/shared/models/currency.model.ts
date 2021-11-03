export class Currency {
  constructor(
    public base_code: string,
    public conversion_rates: any,
    public time_last_update_utc: Date
  ) {
  }
}
