import { Publisher, SprintCreatedEvent, Subjects } from '@parthikrb/common';

export class SprintCreatedPublisher extends Publisher<SprintCreatedEvent> {
    readonly subject = Subjects.SprintCreated;
}