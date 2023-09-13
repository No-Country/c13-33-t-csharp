namespace HomeFix.Interfaces;

public interface IUnitOfWork
{
    IMarcasRepository MarcasRepository { get; }
    
    ICategoriasRepository CategoriasRepository { get; }
    
    ICuentaRepository CuentaRepository { get; }
    
    IArticulosRepository ArticulosRepository { get; }
    
    IUsuariosRepository UsuariosRepository { get; }
    Task<bool> Complete();

 
}