using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using BlogApp.Dal.Domain;

namespace BlogApp.Dal.Domain
{
    public class User
    {
        public int UserID { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Age { get; set; }
        [Required]
        public string Email { get; set; }
        public int Blogs { get; set; }
        public string ViewProfile { get; set; }
        public ICollection<UserBlog> MyBlogs { get; set; }
    }
}
