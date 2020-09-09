import { Listener, SprintUpdatedEvent, Subjects } from '@parthikrb/common';
import { queueGroupName } from '../queue-group-name';
import { Message } from 'node-nats-streaming';
import { Sprint } from '../../models/sprint';

export class SprintUpdatedListener extends Listener<SprintUpdatedEvent> {
    readonly subject = Subjects.SprintUpdated;
    queueGroupName = queueGroupName;

    async onMessage(data: SprintUpdatedEvent['data'], msg: Message) {
        const { id } = data;
        const existingSprint = await Sprint.findById(id).exec();
        if (!existingSprint) {
            const sprint = Sprint.build(data);
            await sprint.save();
        }

        await Sprint.findByIdAndUpdate(id, data).exec();

        msg.ack();
    }
}