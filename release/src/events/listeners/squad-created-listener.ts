import { Listener, SquadCreatedEvent, Subjects } from '@parthikrb/common';
import { queueGroupName } from '../queue-group-name';
import { Message } from 'node-nats-streaming';
import { Squad } from '../../models/squad';


export class SquadCreatedListener extends Listener<SquadCreatedEvent> {
    readonly subject = Subjects.SquadCreated;

    queueGroupName = queueGroupName;

    async onMessage(data: SquadCreatedEvent['data'], msg: Message) {
        const squad = Squad.build(data);
        await squad.save();
        console.log(`Squad Created Listener - ${squad}`);
        msg.ack();
    }

}