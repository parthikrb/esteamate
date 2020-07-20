import { Listener, UserUpdatedEvent, Subjects } from '@parthikrb/common';
import { queueGroupName } from './queue-group-name';
import { Message } from 'node-nats-streaming';
import { User } from '../../models/user';



export class UserUpdatedListener extends Listener<UserUpdatedEvent> {

    readonly subject = Subjects.UserUpdated;

    queueGroupName = queueGroupName;

    async onMessage(data: UserUpdatedEvent['data'], msg: Message) {
        console.log(`User Updated Listener - ${JSON.stringify(data)}`);
        const { id } = data;

        const user = await User.findById(id).exec();

        if (!user) {
            const newUser = User.build(data);
            await newUser.save();
        }

        await User.findByIdAndUpdate(id, data);

        msg.ack();
    }
}