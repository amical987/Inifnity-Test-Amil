using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using BlogApp.Dal.Domain;
using BlogApp.Dal.ViewModel;

namespace BlogApp.Dal.Repository
{
    public interface IBlogRepository
    {
        Task<BlogViewModel> GetAll(CancellationToken cancellationToken = default);
        Task<BlogDto> AddBlog(BlogDto blog, CancellationToken cancellationToken = default);
    }
}
