import { Publisher, Subjects, SquadUpdatedEvent } from '@parthikrb/common';

export class SquadUpdatedPublisher extends Publisher<SquadUpdatedEvent> {
    readonly subject = Subjects.SquadUpdated
}