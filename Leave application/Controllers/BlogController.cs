using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BlogApp.Dal.Repository;
using BlogApp.Dal.ViewModel;
using Microsoft.AspNetCore.Mvc;

namespace Blog_application.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class BlogController : Controller
    {
        private readonly IBlogRepository _blogRepository;
        public BlogController(IBlogRepository blogRepository)
        {
            _blogRepository = blogRepository;
        }

        #region BlogController
        [HttpGet]
        public async Task<IActionResult> GetBlogs()
        {
            var blogs = await _blogRepository.GetAll();
            return Ok(blogs);
        }
        [HttpPost]
        public async Task<IActionResult> AddBlog([FromBody] BlogDto blog)
        {
            var nblog = await _blogRepository.AddBlog(blog);
            return Ok(nblog);
        }
        #endregion
    }
}
