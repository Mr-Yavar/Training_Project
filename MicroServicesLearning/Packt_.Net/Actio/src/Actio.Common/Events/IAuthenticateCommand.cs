namespace Actio.Common.Events;

public interface IAuthenticateEvent : IEvent {
    
    Guid UserId {get;set;}

} 