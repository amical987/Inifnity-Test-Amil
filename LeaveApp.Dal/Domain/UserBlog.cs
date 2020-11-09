namespace BlogApp.Dal.Domain
{
    public class UserBlog
    {
        public int UserID { get; set; }
        public User User { get; set; }
        public int BlogID { get; set; }
        public Blog Blog { get; set; }
    }
}
