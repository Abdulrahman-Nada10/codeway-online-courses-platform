using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CourseMangment.MicroService.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddCourseLanguageAndFilteringFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Language",
                table: "Courses",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "CategoryIds",
                table: "CourseQueryParameters",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Language",
                table: "CourseQueryParameters",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "MinRating",
                table: "CourseQueryParameters",
                type: "float",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Language",
                table: "Courses");

            migrationBuilder.DropColumn(
                name: "CategoryIds",
                table: "CourseQueryParameters");

            migrationBuilder.DropColumn(
                name: "Language",
                table: "CourseQueryParameters");

            migrationBuilder.DropColumn(
                name: "MinRating",
                table: "CourseQueryParameters");
        }
    }
}
