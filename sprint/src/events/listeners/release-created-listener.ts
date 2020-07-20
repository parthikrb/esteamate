import { Listener, ReleaseCreatedEvent, Subjects } from '@parthikrb/common';
import { queueGroupName } from '../queue-group-name';
import { Message } from 'node-nats-streaming';
import { Release } from '../../models/release';

export class ReleaseCreatedListener extends Listener<ReleaseCreatedEvent> {
    readonly subject = Subjects.ReleaseCreated;

    queueGroupName = queueGroupName;

    async onMessage(data: ReleaseCreatedEvent['data'], msg: Message) {
        const release = Release.build(data);
        await release.save();

        msg.ack();
    }
}