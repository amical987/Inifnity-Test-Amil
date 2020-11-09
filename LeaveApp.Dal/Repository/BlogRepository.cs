using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using BlogApp.Dal.Context;
using BlogApp.Dal.Domain;
using BlogApp.Dal.ViewModel;
using Microsoft.EntityFrameworkCore;

namespace BlogApp.Dal.Repository
{
    public class BlogRepository : IBlogRepository
    {
        private readonly BlogAppDBContext _context;
        public BlogRepository(BlogAppDBContext leaves)
        {
            _context = leaves;
        }

        public async Task<BlogViewModel> GetAll(CancellationToken cancellationToken = default)
        {
            const int maxTop = 10;
            var collection = await _context.Blogs.Take(maxTop).ToListAsync(cancellationToken);
            return new BlogViewModel(collection);
        }

        public async Task<BlogDto> AddBlog(BlogDto blog, CancellationToken cancellationToken = default)
        {
            var blogDomain = new Blog
            {
                Title = blog.Title,
                Summary = blog.Summary,
                Content = blog.Content,
                PublishedAt = blog.PublishedAt
            };

            await _context.Blogs.AddAsync(blogDomain, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);

            return new BlogDto(blogDomain);
        }
    }
}
