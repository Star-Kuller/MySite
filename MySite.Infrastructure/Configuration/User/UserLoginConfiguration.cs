using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MySite.Domain.Entities.User;

namespace MySite.Infrastructure.Configuration.User
{
    public class UserLoginConfiguration : IEntityTypeConfiguration<UserLogin>
    {
        public void Configure(EntityTypeBuilder<UserLogin> builder)
        {
            builder.ToTable("user_logins");
            
            builder.HasOne(e => e.User)
                .WithMany(e => e.Logins)
                .HasForeignKey(ur => ur.UserId)
                .IsRequired();
        }
    }
}
