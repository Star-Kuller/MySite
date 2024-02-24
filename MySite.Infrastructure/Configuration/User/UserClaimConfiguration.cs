using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MySite.Domain.Entities.User;

namespace MySite.Infrastructure.Configuration.User
{
    public class UserClaimConfiguration : IEntityTypeConfiguration<UserClaim>
    {
        public void Configure(EntityTypeBuilder<UserClaim> builder)
        {
            builder.ToTable("user_claims");
            
            builder.HasOne(e => e.User)
                .WithMany(e => e.Claims)
                .HasForeignKey(ur => ur.UserId)
                .IsRequired();
        }
    }
}
