﻿using System.ComponentModel.DataAnnotations;

namespace HomeFix.Model
{
    public class Categoria
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(50)]
        public string Nombre { get; set; }
        [MaxLength(500)]
        public string Icono { get; set; }
        public List<Subcategoria> Subcategorias { get; set; }
        public List<Articulo> Articulos { get; set; }
    }
}
