import { getEnv, Lang } from "@ant/framework";
import { Method, response, Response, BaseRoute } from "@ant/framework";

export class InfoRoute extends BaseRoute {
  url = "/info";

  method: Method = "get";

  handle(): Response {
    return response({
      status: Lang.__("active"),
      message: Lang.__("The [{{name}}] microservice is up and running.", {
        name: getEnv("APP_NAME", "Ant"),
      }),
    });
  }
}
