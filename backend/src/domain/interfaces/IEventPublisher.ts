export interface IEventPublisher {
  publish<T>(event: T): void;
}
