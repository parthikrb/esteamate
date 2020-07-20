import { Publisher, ReleaseCreatedEvent, Subjects } from '@parthikrb/common';

export class ReleaseCreatedPublisher extends Publisher<ReleaseCreatedEvent> {
    readonly subject = Subjects.ReleaseCreated;
}
