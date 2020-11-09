using System.Collections.Generic;
using System.Linq;
using BlogApp.Dal.Domain;

namespace BlogApp.Dal.ViewModel
{
    public class UserViewModel
    {
        public IReadOnlyCollection<UserDto> Users { get; }
        public UserViewModel(IReadOnlyCollection<User> users)
        {
            Users = users.Select(user => new UserDto(user)).ToList();        
        }
    }
}
