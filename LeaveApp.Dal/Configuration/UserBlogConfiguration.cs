using System.Collections.Generic;
using BlogApp.Dal.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BlogApp.Dal.Configuration
{
    public class UserBlogConfiguration : IEntityTypeConfiguration<UserBlog>
    {
        public void Configure(EntityTypeBuilder<UserBlog> builder)
        {

            builder.HasOne(p => p.User).WithMany(p => p.MyBlogs).HasForeignKey(p => p.UserID);

            builder.HasOne(p => p.Blog).WithMany(p => p.MyUsers).HasForeignKey(p => p.BlogID);

            builder.HasKey(p => new { p.UserID, p.BlogID });

            builder.HasData(new List<UserBlog>
            {
                new UserBlog
                {
                    UserID = 1,
                    BlogID = 1
                },
                new UserBlog
                {
                    UserID = 1,
                    BlogID = 2
                },
                new UserBlog
                {
                    UserID = 2,
                    BlogID = 2
                }
            });
        }
    }
}
