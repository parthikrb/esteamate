import { Listener, SprintCreatedEvent, Subjects } from "@parthikrb/common";
import { queueGroupName } from "../queue-group-name";
import { Message } from "node-nats-streaming";
import { Sprint } from "../../models/sprint";

export class SprintCreatedListener extends Listener<SprintCreatedEvent> {
  readonly subject = Subjects.SprintCreated;

  queueGroupName = queueGroupName;

  async onMessage(data: SprintCreatedEvent["data"], msg: Message) {
    const sprint = Sprint.build(data);
    await sprint.save();

    msg.ack();
  }
}
