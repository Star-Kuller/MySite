using Microsoft.EntityFrameworkCore;
using MySite.Infrastructure.Infrastructure;

namespace MySite.Infrastructure;

public class MyDbContextFactory : DesignTimeDbContextFactoryBase<MyDbContext>
{
    protected override MyDbContext CreateNewInstance(DbContextOptions<MyDbContext> options)
    {
        return new MyDbContext(options);
    }
}