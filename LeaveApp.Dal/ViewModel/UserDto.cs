using System.Collections.Generic;
using BlogApp.Dal.Domain;

namespace BlogApp.Dal.ViewModel
{
    public class UserDto
    {
        public int UserID { get; set; }
        public string Name { get; set; }
        public string Age { get; set; }
        public string Email { get; set; }
        public int Blogs { get; set; }
        public string ViewProfile { get; set; }
        public UserDto()
        {
        }

        public UserDto(List<User> user)
        {
        }
        public UserDto(User user)
        {
            UserID = user.UserID;
            Name = user.Name;
            Age = user.Age;
            Email = user.Email;
            Blogs = user.Blogs;
            ViewProfile = user.ViewProfile;
        }

    }
}