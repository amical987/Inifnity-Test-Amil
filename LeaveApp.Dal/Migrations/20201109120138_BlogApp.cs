using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BlogApp.Dal.Migrations
{
    public partial class BlogApp : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Blogs",
                columns: table => new
                {
                    BlogID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(maxLength: 64, nullable: false),
                    Summary = table.Column<string>(maxLength: 350, nullable: false),
                    Content = table.Column<string>(maxLength: 3500, nullable: false),
                    PublishedAt = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Blogs", x => x.BlogID);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    UserID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: false),
                    Age = table.Column<string>(nullable: false),
                    Email = table.Column<string>(nullable: false),
                    Blogs = table.Column<int>(nullable: false),
                    ViewProfile = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserID);
                });

            migrationBuilder.CreateTable(
                name: "UsersBlogs",
                columns: table => new
                {
                    UserID = table.Column<int>(nullable: false),
                    BlogID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UsersBlogs", x => new { x.UserID, x.BlogID });
                    table.ForeignKey(
                        name: "FK_UsersBlogs_Blogs_BlogID",
                        column: x => x.BlogID,
                        principalTable: "Blogs",
                        principalColumn: "BlogID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UsersBlogs_Users_UserID",
                        column: x => x.UserID,
                        principalTable: "Users",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Blogs",
                columns: new[] { "BlogID", "Content", "PublishedAt", "Summary", "Title" },
                values: new object[,]
                {
                    { 1, "", new DateTime(2020, 10, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "5 tips how to eat healthy", "How to get through the day healthy" },
                    { 2, "", new DateTime(2020, 10, 21, 0, 0, 0, 0, DateTimeKind.Unspecified), "5 tips that beating is not the way", "How to raise your child" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserID", "Age", "Blogs", "Email", "Name", "ViewProfile" },
                values: new object[,]
                {
                    { 1, "18", 6, "amilcalija@hotmail.com", "Amil Calija", "www.eating.ba" },
                    { 2, "25", 5, "admirmujkic@hotmail.com", "Admir Mujkic", "www.kids.ba" },
                    { 3, "17", 4, "semsudinasmajkic@hotmail.com", "Semsudina Smajkic", "www.tuta.ba" },
                    { 4, "28", 3, "admirmehanovic@hotmail.com", "Admir Mehanovic", "www.maldivi.ba" },
                    { 5, "30", 2, "avdohercegovac@hotmail.com", "Avdo Hercegovac", "www.askeri.ba" },
                    { 6, "45", 1, "hadzibuba@hotmail.com", "Hadzi Buba", "www.defterhefte.ba" }
                });

            migrationBuilder.InsertData(
                table: "UsersBlogs",
                columns: new[] { "UserID", "BlogID" },
                values: new object[] { 1, 1 });

            migrationBuilder.InsertData(
                table: "UsersBlogs",
                columns: new[] { "UserID", "BlogID" },
                values: new object[] { 1, 2 });

            migrationBuilder.InsertData(
                table: "UsersBlogs",
                columns: new[] { "UserID", "BlogID" },
                values: new object[] { 2, 2 });

            migrationBuilder.CreateIndex(
                name: "IX_UsersBlogs_BlogID",
                table: "UsersBlogs",
                column: "BlogID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UsersBlogs");

            migrationBuilder.DropTable(
                name: "Blogs");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
