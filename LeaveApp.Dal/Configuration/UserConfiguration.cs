using System.Collections.Generic;
using BlogApp.Dal.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BlogApp.Dal.Configuration
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {

            builder.Property(p => p.UserID).IsRequired();

            builder.Property(p => p.Name).IsRequired();

            builder.Property(p => p.Age).IsRequired();

            builder.Property(p => p.Email).IsRequired();

            builder.Property(p => p.Blogs).IsRequired();

            builder.Property(p => p.ViewProfile).IsRequired();
    
            builder.HasData(
                new List<User>
                {
                    new User
                    {
                        UserID = 1,
                        Name = "Amil Calija",
                        Age = "18",
                        Email = "amilcalija@hotmail.com",
                        Blogs = 6,
                        ViewProfile = "www.eating.ba",
                    },
                    new User
                    {
                        UserID = 2,
                        Name = "Admir Mujkic",
                        Age = "25",
                        Email = "admirmujkic@hotmail.com",
                        Blogs = 5,
                        ViewProfile = "www.kids.ba",
                    },
                    new User
                    {
                        UserID = 3,
                        Name = "Semsudina Smajkic",
                        Age = "17",
                        Email = "semsudinasmajkic@hotmail.com",
                        Blogs = 4,
                        ViewProfile = "www.tuta.ba",
                    },
                    new User
                    {
                        UserID = 4,
                        Name = "Admir Mehanovic",
                        Age = "28",
                        Email = "admirmehanovic@hotmail.com",
                        Blogs = 3,
                        ViewProfile = "www.maldivi.ba",
                    },
                    new User
                    {
                        UserID = 5,
                        Name = "Avdo Hercegovac",
                        Age = "30",
                        Email = "avdohercegovac@hotmail.com",
                        Blogs = 2,
                        ViewProfile = "www.askeri.ba",
                    },
                    new User
                    {
                        UserID = 6,
                        Name = "Hadzi Buba",
                        Age = "45",
                        Email = "hadzibuba@hotmail.com",
                        Blogs = 1,
                        ViewProfile = "www.defterhefte.ba",
                    }
                });
        }
    }
}
