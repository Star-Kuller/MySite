using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MySite.Domain.Entities.User;

namespace MySite.Infrastructure.Configuration.User
{
    public class RoleClaimConfiguration : IEntityTypeConfiguration<RoleClaim>
    {
        public void Configure(EntityTypeBuilder<RoleClaim> builder)
        {
            builder.ToTable("role_claims");
            builder.HasOne(e => e.Role)
                .WithMany(e => e.RoleClaims)
                .HasForeignKey(ur => ur.RoleId)
                .IsRequired();
        }
    }
}
