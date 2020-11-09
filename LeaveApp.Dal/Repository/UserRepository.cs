using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using BlogApp.Dal.ViewModel;
using BlogApp.Dal.Context;
using Microsoft.EntityFrameworkCore;

namespace BlogApp.Dal.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly BlogAppDBContext _context;

        public UserRepository(BlogAppDBContext users)
        {
            _context = users;
        }

        public async Task<UserViewModel> GetTopFive(CancellationToken cancellationToken = default)
        {
            const int maxTop = 5;
            var collection = await _context.Users.Take(maxTop).OrderBy(r => r.Name).ToListAsync(cancellationToken);
            return new UserViewModel(collection);
        }

        public async Task<UserViewModel> GetbyNameEmail(string name, string email, CancellationToken cancellationToken = default)
        {
            var collection = await _context.Users.Where(x => x.Name == name).Where(x => x.Email == email).ToListAsync(cancellationToken);
            return new UserViewModel(collection);
        }

        public async Task<UserDto> GetById(int Id, CancellationToken cancellationToken = default)
        {
            var employe = await _context.Users.Where(x => x.UserID == Id).Select(user => new UserDto(user)).FirstOrDefaultAsync(cancellationToken);
            return employe;
        }
    }
}
