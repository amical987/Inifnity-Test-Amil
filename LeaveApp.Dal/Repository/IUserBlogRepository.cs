using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using BlogApp.Dal.Domain;
using BlogApp.Dal.ViewModel;

namespace BlogApp.Dal.Repository
{
    public interface IUserBlogRepository
    {
        Task<IReadOnlyCollection<UserBlog>> GetBlogs(int Id, CancellationToken cancellationToken = default);
    }
}
