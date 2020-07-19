import { Listener, UserUpdatedEvent, Subjects } from '@parthikrb/common';
import { queueGroupName } from './queue-group-name';
import { Message } from 'node-nats-streaming';



export class UserUpdatedListener extends Listener<UserUpdatedEvent> {

    readonly subject = Subjects.UserUpdated;

    queueGroupName = queueGroupName;

    async onMessage(data: UserUpdatedEvent['data'], msg: Message) {
        console.log(`User Updated Listener - ${JSON.stringify(data)}`);

        msg.ack();
    }
}