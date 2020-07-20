import { Listener, ReleaseUpdatedEvent, Subjects } from '@parthikrb/common';
import { queueGroupName } from '../queue-group-name';
import { Message } from 'node-nats-streaming';
import { Release } from '../../models/release';

export class ReleaseUpdatedListener extends Listener<ReleaseUpdatedEvent> {
    readonly subject = Subjects.ReleaseUpdated;
    queueGroupName = queueGroupName;

    async onMessage(data: ReleaseUpdatedEvent['data'], msg: Message) {
        const { id } = data;
        const existingRelease = await Release.findById(id).exec();
        if (!existingRelease) {
            const release = Release.build(data);
            await release.save();
        }

        await Release.findByIdAndUpdate(id, data).exec();

        msg.ack();
    }
}