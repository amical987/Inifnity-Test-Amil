using System;
using System.Collections.Generic;
using System.Text;
using BlogApp.Dal.Domain;

namespace BlogApp.Dal.ViewModel
{
    public class UserBlogDto
    {
        public int UserID { get; set; }
        public int BlogID { get; set; }

        public UserBlogDto()
        {
        }

        public UserBlogDto(UserBlog userBlog)
        {
            UserID = userBlog.UserID;
            BlogID = userBlog.BlogID;
        }
    }
}
