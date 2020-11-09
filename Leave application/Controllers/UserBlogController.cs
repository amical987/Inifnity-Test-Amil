using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BlogApp.Dal.Domain;
using BlogApp.Dal.Repository;
using BlogApp.Dal.ViewModel;
using Microsoft.AspNetCore.Mvc;

namespace Blog_application.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UserBlogController : Controller
    {
        private readonly IUserBlogRepository _rep;

        public UserBlogController(IUserBlogRepository rep)
        {
            _rep = rep;
        }

        [HttpGet("{id}")]
        public async Task<List<UserBlogDto>> GetUserBlogs(int userId)
        {
            var collection = await _rep.GetBlogs(userId);
            return new List<UserBlogDto>(collection.Select(user => new UserBlogDto(user)));
        }
    }
}
