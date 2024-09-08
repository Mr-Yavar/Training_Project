namespace Actio.Common.Commands;

public interface IAuthenticateCommand : ICommand {
    
    Guid UserId {get;set;}

} 