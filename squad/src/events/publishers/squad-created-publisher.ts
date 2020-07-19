import { Publisher, Subjects, SquadCreatedEvent } from '@parthikrb/common';

export class SquadCreatedPublisher extends Publisher<SquadCreatedEvent> {
    readonly subject = Subjects.SquadCreated
}