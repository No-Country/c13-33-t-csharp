using System.Text;
using HomeFix.Data;
using HomeFix.Dbcontext;
using HomeFix.Extensions;
using HomeFix.Helpers;
using HomeFix.Interfaces;
using HomeFix.Model;
using HomeFix.Services;
using HomeFix.Services.FileStorage;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddApplicationService();
builder.Services.AddIdentityService(builder.Configuration);
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
// builder.Services.AddControllers().AddNewtonsoftJson(options=>
//     options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore);
string connString;
if (builder.Environment.IsDevelopment())
    connString = builder.Configuration.GetConnectionString("DefaultConnection");
else
{
    var connUrl = Environment.GetEnvironmentVariable("DATABASE_URL");
    
    connUrl = connUrl.Replace("postgres://", string.Empty);
    var pgUserPass = connUrl.Split("@")[0];
    var pgHostPortDb = connUrl.Split("@")[1];
    var pgHostPort = pgHostPortDb.Split("/")[0];
    var pgDbExtra = pgHostPortDb.Split("/")[1];
    var pgDb = pgDbExtra.Split("?")[0];
    var pgUser = pgUserPass.Split(":")[0];
    var pgPass = pgUserPass.Split(":")[1];
    var pgHost = pgHostPort.Split(":")[0];
    var pgPort = pgHostPort.Split(":")[1];//postgres://postgres:hyjq7MAfPGBr51v@homefix-db.flycast:5432
    var updatedHost = pgHost.Replace("flycast", "internal");

    connString = $"Server={updatedHost};Port={pgPort};User Id={pgUser};Password={pgPass};Database={pgDb};";
}
builder.Services.AddDbContext<HomeFixDbContext>(opt =>
{
    opt.UseNpgsql(connString);
});



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

app.UseCors(opt =>
{
    opt.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins("http://localhost:3000"); //TODO cambiarlo en el deploy
});

try
{
    await context.Database.MigrateAsync();
    await SeedData.Initialize(context, userManager);
}
catch (Exception e)
{
    logger.LogError(e, "Error Seeding data");
    throw;
}

app.Run();