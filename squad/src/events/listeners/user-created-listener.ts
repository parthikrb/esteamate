import { Listener, UserCreatedEvent, Subjects } from '@parthikrb/common';
import { queueGroupName } from './queue-group-name';
import { Message } from 'node-nats-streaming';
import { User } from '../../models/user';

export class UserCreatedListener extends Listener<UserCreatedEvent> {
    readonly subject = Subjects.UserCreated;

    queueGroupName = queueGroupName;

    async onMessage(data: UserCreatedEvent['data'], msg: Message) {
        const user = await User.build(data);
        await user.save();
        console.log(`User Created Listener: ${JSON.stringify(user)}`);
        msg.ack();
    }

}