namespace HomeFix.Interfaces;

public interface IUnitOfWork
{
    IMarcasRepository MarcasRepository { get; }
    Task<bool> Complete();

 
}