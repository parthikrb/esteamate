import { Publisher, SprintUpdatedEvent, Subjects } from '@parthikrb/common';

export class SprintUpdatedPublisher extends Publisher<SprintUpdatedEvent> {
    readonly subject = Subjects.SprintUpdated;
}