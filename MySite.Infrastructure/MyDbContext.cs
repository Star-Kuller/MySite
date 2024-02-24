using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using MySite.Application.Interfaces;
using MySite.Domain.Entities.User;
using Microsoft.EntityFrameworkCore;
using MySite.Infrastructure.Extentions;

namespace MySite.Infrastructure;

public class MyDbContext : IdentityDbContext<
    User, Role, long,
    UserClaim, UserRole, UserLogin,
    RoleClaim, UserToken>, IMyDbContext
{
    public MyDbContext(DbContextOptions<MyDbContext> options) : base(options)
    {
    }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(MyDbContext).Assembly);
        
        modelBuilder.UseSerialColumns();
        modelBuilder.Seed();
    }
}