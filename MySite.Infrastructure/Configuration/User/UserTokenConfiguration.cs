using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MySite.Domain.Entities.User;

namespace MySite.Infrastructure.Configuration.User
{
    public class UserTokenConfiguration : IEntityTypeConfiguration<UserToken>
    {
        public void Configure(EntityTypeBuilder<UserToken> builder)
        {
            builder.ToTable("user_tokens");
            
            builder.HasOne(e => e.User)
                .WithMany(e => e.Tokens)
                .HasForeignKey(ur => ur.UserId)
                .IsRequired();
        }
    }
}
