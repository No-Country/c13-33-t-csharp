namespace HomeFix.Interfaces;

public interface IUnitOfWork
{
    IMarcasRepository MarcasRepository { get; }
    
    ICategoriasRepository CategoriasRepository { get; }
    Task<bool> Complete();

 
}