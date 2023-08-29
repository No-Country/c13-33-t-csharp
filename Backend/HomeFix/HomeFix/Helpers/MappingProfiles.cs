using AutoMapper;
using HomeFix.DTOs;
using HomeFix.Model;

namespace HomeFix.Helpers;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<Marca, MarcaDto>();
        CreateMap<CreateMarcaDto, Marca>().ForMember(x => x.Articulos, opt => opt.Ignore());

        CreateMap<Articulo, ArticuloDto>()
            .ForMember(x => x.Marca, opt => opt.MapFrom(a => a.Marca.Nombre))
            .ForMember(x => x.Categoria, opt => opt.MapFrom(a => a.Categoria.Nombre))
            .ForMember(x => x.Subcategoria, opt => opt.MapFrom(a => a.Categoria.CategoriaPadre.Nombre))
            .ForMember(x => x.UsuarioUltimaModificacion, opt => opt.MapFrom(a => a.UsuarioUltimaModificacion.UserName));

        CreateMap<CreateArticuloDto, Articulo>()
            .ForMember(x => x.MarcaId, opt => opt.MapFrom(a => a.MarcaId))
            .ForMember(x => x.CategoriaId, opt => opt.MapFrom(a =>a.CategoriaId))
            .ForMember(x => x.Precio, opt => opt.MapFrom(a => a.Costo))
            .AfterMap((dto, ent) => ent.Precio = dto.Costo * 1.2m);

        CreateMap<UpdateArticuloDto, Articulo>()
            .ForMember(x => x.MarcaId, opt => opt.MapFrom(a => a.MarcaId))
            .ForMember(x => x.CategoriaId, opt => opt.MapFrom(a =>a.CategoriaId))
            .ForMember(x => x.Precio, opt => opt.MapFrom(a => a.Costo))
            .AfterMap((dto, ent) =>
            {
                if (dto.Costo != null)
                {
                    ent.Precio = dto.Costo * 1.2m ?? ent.Precio;
                }
            });

        CreateMap<Categoria, CategoriaDto>()
            .ForMember(x => x.Categoria, opt => opt.MapFrom(a => a.CategoriaPadre.Nombre));
        // .ForMember(x => x.Marca, opt => opt.MapFrom(a => a.Marca.Nombre));
    }
}