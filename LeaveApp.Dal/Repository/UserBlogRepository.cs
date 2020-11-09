using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using BlogApp.Dal.Context;
using BlogApp.Dal.Domain;
using Microsoft.EntityFrameworkCore;

namespace BlogApp.Dal.Repository
{
    public class UserBlogRepository : IUserBlogRepository
    {
        private readonly BlogAppDBContext _context;

        public UserBlogRepository(BlogAppDBContext context)
        {
            _context = context;
        }

        public async Task<IReadOnlyCollection<UserBlog>> GetBlogs(int Id, CancellationToken cancellationToken = default)
        {
            return await _context.UsersBlogs.Take(100).Where(x => x.UserID == Id).OrderBy(r => r.Blog.PublishedAt).ToListAsync(cancellationToken);
        }
    }
}

