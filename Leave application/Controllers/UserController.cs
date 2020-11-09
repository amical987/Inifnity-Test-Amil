using System.Threading.Tasks;
using BlogApp.Dal.Repository;
using Microsoft.AspNetCore.Mvc;

namespace Blog_application.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly IUserRepository _userRepository;

        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        #region UserController
        [HttpGet]
        public async Task<IActionResult> GetFiveUsers()
        {
            var users = await _userRepository.GetTopFive();
            return Ok(users);
        }

        [HttpGet]
        public async Task<IActionResult> GetSearched(string name, string email)
        {
            var user = await _userRepository.GetbyNameEmail(name, email);
            return Ok(user);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _userRepository.GetById(id);
            return Ok(user);
        }
        #endregion
    }
}
