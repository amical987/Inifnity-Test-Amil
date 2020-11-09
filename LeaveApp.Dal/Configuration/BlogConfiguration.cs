using System;
using System.Collections.Generic;
using BlogApp.Dal.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BlogApp.Dal.Configuration
{
    public class BlogConfiguration : IEntityTypeConfiguration<Blog>
    {
        public void Configure(EntityTypeBuilder<Blog> builder)
        {
            builder.Property(p => p.BlogID).IsRequired();

            builder.Property(p => p.Title).IsRequired();

            builder.Property(p => p.Summary).IsRequired();

            builder.Property(p => p.Content).IsRequired();

            builder.Property(p => p.PublishedAt).IsRequired();

            builder.HasData(
                new List<Blog>()
                {
                    new Blog
                    {
                        BlogID = 1,
                        Title = "How to get through the day healthy",
                        Summary = "5 tips how to eat healthy",
                        Content = "",
                        PublishedAt = new DateTime(2020, 10, 20)
                    },
                    new Blog
                    {
                        BlogID = 2,
                        Title = "How to raise your child",
                        Summary = "5 tips that beating is not the way",
                        Content = "",
                        PublishedAt = new DateTime(2020, 10, 21)
                    }
                }
                );
        }
    }
}
