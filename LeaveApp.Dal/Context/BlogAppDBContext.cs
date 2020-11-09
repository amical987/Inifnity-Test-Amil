using BlogApp.Dal.Domain;
using BlogApp.Dal.Configuration;
using Microsoft.EntityFrameworkCore;

namespace BlogApp.Dal.Context
{
    public class BlogAppDBContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<UserBlog> UsersBlogs { get; set; }
        public DbSet<Blog> Blogs { get; set; }

        public BlogAppDBContext(DbContextOptions<BlogAppDBContext> options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(UserConfiguration).Assembly);
            base.OnModelCreating(modelBuilder);
        }

    }
}
