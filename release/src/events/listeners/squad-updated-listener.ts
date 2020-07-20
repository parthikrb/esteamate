import { Listener, SquadUpdatedEvent, Subjects } from "@parthikrb/common";
import { queueGroupName } from "../queue-group-name";
import { Message } from 'node-nats-streaming';
import { Squad } from "../../models/squad";


export class SquadUpdatedListener extends Listener<SquadUpdatedEvent> {
    readonly subject = Subjects.SquadUpdated;

    queueGroupName = queueGroupName;

    async onMessage(data: SquadUpdatedEvent['data'], msg: Message) {

        const { id } = data;

        const squad = await Squad.findById(id).exec();

        if (!squad) {
            const newSquad = Squad.build(data);
            await newSquad.save();
        }

        await Squad.findByIdAndUpdate(id, data).exec();
    }
}