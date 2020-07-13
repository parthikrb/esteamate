import { Publisher, Subjects, UserUpdatedEvent } from '@parthikrb/common';

export class UserUpdatedPublisher extends Publisher<UserUpdatedEvent> {
    readonly subject = Subjects.UserUpdated;
}