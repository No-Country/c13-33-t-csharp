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

        CreateMap<Articulo, ArticuloDto>().ForMember(x=> x.Marca, opt => opt.MapFrom(a=> a.Marca.Nombre));
        CreateMap<CreateArticuloDto, Articulo>()
            .ForMember(x => x.MarcaId, opt => opt.MapFrom(a => a.MarcaId))
            .ForMember(x => x.Precio, opt => opt.MapFrom(a => a.Costo ))
            .AfterMap((dto, ent) => ent.Precio = dto.Costo * 1.2m);
        // .ForMember(x => x.Marca, opt => opt.MapFrom(a => a.Marca.Nombre));
    }
}