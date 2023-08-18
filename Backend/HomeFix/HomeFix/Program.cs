using System.Text;
using HomeFix.Dbcontext;
using HomeFix.Model;
using HomeFix.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<HomeFixDbContext>(options => options.UseSqlServer(connectionString));
builder.Services.AddCors();
builder.Services.AddIdentityCore<Usuario>(opt =>
    {
        opt.User.RequireUniqueEmail = true;
    })
    .AddRoles<Rol>()
    .AddEntityFrameworkStores<HomeFixDbContext>();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(opt =>
{
    opt.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["TokenKey"]))
    };
});
builder.Services.AddAuthorization();
builder.Services.AddScoped<TokenService>();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

var scope = app.Services.CreateScope();
var context = scope.ServiceProvider.GetRequiredService<HomeFixDbContext>();
var userManager = scope.ServiceProvider.GetRequiredService<UserManager<Usuario>>();
var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
try
{
    await SeedData.Initialize(context, userManager);
}
catch (Exception e)
{
    logger.LogError(e, "Error Seeding data");
    throw;
}

app.Run();
